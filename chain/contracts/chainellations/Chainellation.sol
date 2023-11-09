// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IChainellationRenderer.sol";
import "../Color.sol";

contract Chainellation is ERC721, ERC721Enumerable, Ownable {
    using Strings for uint256;

    uint256 public currentSupply;
    uint256 public maxSupply = 15000;
    // uint256 public mintCost = 75 * 10 ** 15; // ETH
    // uint256 public mintCost = 20 * 10 ** 18; // POLYGON
    uint256 public mintCost = 0;
    uint256 public customizeCost = 0; // 5 * 10 ** 15;

    mapping(uint256 => Color.DNA) public dnas;

    mapping(uint256 => uint32) public timeZoneOffset;
    mapping(uint256 => uint16) public gazes;
    mapping(uint256 => uint256) public lastGaze;
    mapping(uint256 => uint32) public colors;

    address private _decorator;
    IChainellationRenderer private _chainellationRenderer;

    constructor(address renderer) ERC721("chainellation", "STARS") {
        _chainellationRenderer = IChainellationRenderer(renderer);
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        if (tokenId > currentSupply) revert NotMinted();

        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "chainellation #',
            tokenId.toString(),
            '",',
            '"description": "chainellation",',
            '"image": "',
            generateCharacter(tokenId),
            '"',
            "}"
        );
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }

    function contractURI() public view returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "Two Moons Night Skies",',
            '"description": "Your window into the Night Sky.  Stargaze to reveal your secret constellation, and customize your view with replacable parts of the image."',
            '"external_url": "https://www.twomoons.app/"',
            '"image": "',
            generateCharacter(0),
            '"',
            "}"
        );
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }

    function mint(uint32 timezoneOffset) public payable {
        if (msg.value < mintCost) revert Cost();

        _mint(timezoneOffset, 0, msg.sender);
    }

    function mintCustom(
        uint32 timezoneOffset,
        uint16 firstH,
        uint16 secondH
    ) public payable {
        if (msg.value < (mintCost + customizeCost)) revert Cost();
        _mint(
            timezoneOffset,
            (uint32(firstH) << 16) | uint32(secondH),
            msg.sender
        );
    }

    function mintBatch(uint32 timezoneOffset, uint8 count) public payable {
        for (uint8 i = 0; i < count; i++) {
            mint(timezoneOffset);
        }
    }

    function freeMint(uint32 timezoneOffset) public onlyOwner {
        _mint(timezoneOffset, 0, msg.sender);
    }

    // if the timezone offset is negative, we're gonna pretend like it's a day in the future
    // this doesn't matter because the timezone offset is only used to determine the time of day
    // and not the actual day.
    function _mint(
        uint32 timezoneOffset,
        uint32 colorData,
        address _to
    ) private {
        if (currentSupply >= maxSupply) revert MaxSupplyReached();
        currentSupply++;
        timeZoneOffset[currentSupply] = timezoneOffset;

        if (colorData == 0) {
            uint16 primary = uint16((currentSupply % 16) * 10);
            uint16 secondary = Color
                .rotateColor(Color.HSL(primary, 0, 0), 60)
                .H;
            colorData = (uint32(primary) << 16) | uint32(secondary);
        }

        colors[currentSupply] = colorData;
        _safeMint(_to, currentSupply);
    }

    function generateCharacter(
        uint256 tokenId
    ) public view returns (string memory) {
        bytes memory svg = abi.encodePacked(
            generateSVG(tokenId, gazes[tokenId], 1, !isNight(tokenId))
        );

        return
            string(
                abi.encodePacked(
                    "data:image/svg+xml;base64,",
                    Base64.encode(svg)
                )
            );
    }

    function getColors(uint256 tokenId) public view returns (uint32) {
        if (colors[tokenId] == 0) {
            uint16 primary = uint16((tokenId % 16) * 10);
            uint16 secondary = Color
                .rotateColor(Color.HSL(primary, 0, 0), 60)
                .H;
            return (uint32(primary) << 16) | uint32(secondary);
        } else {
            return colors[tokenId];
        }
    }

    function generateSVG(
        uint256 tokenId,
        uint256 gazed,
        uint8 cloudsAt,
        bool sunUp
    ) public view returns (string memory) {
        return
            _chainellationRenderer.generateSVG(
                Color.genDNA(tokenId, getColors(tokenId)),
                gazed,
                sunUp,
                cloudsAt,
                _decorator
            );
    }

    function starGaze(uint256 tokenId) public {
        if (ownerOf(tokenId) != msg.sender) revert NotTheOwner();
        if (!isNight(tokenId)) revert NotNight();
        if (systemTimeOffsetWithUser(tokenId) - lastGaze[tokenId] < 14 hours)
            revert NotEnoughTimePassed();
        gazes[tokenId] = gazes[tokenId] + 1;
        lastGaze[tokenId] = systemTimeOffsetWithUser(tokenId);
    }

    function gazeBatch(uint256[] calldata tokenIds) public {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            starGaze(tokenIds[i]);
        }
    }

    function reset(uint256 tokenId) public {
        if (ownerOf(tokenId) != msg.sender) revert NotTheOwner();
        gazes[tokenId] = 0;
    }

    function setMaxSupply(uint256 _maxSupply) public onlyOwner {
        maxSupply = _maxSupply;
    }

    function setMintCost(uint256 _newMintCost) public onlyOwner {
        mintCost = _newMintCost;
    }

    function setCustomizeCost(uint256 _newCost) public onlyOwner {
        customizeCost = _newCost;
    }

    function setDecorator(address decorator) public onlyOwner {
        _decorator = decorator;
    }

    function setRenderer(address renderer) public onlyOwner {
        _chainellationRenderer = IChainellationRenderer(renderer);
    }

    function systemTimeOffsetWithUser(
        uint256 tokenId
    ) public view returns (uint256) {
        return systemTime() + (timeZoneOffset[tokenId]);
    }

    function systemTime() public view virtual returns (uint256) {
        return block.timestamp;
    }

    function isNight(uint256 tokenId) public view returns (bool) {
        uint8 hour = (uint8)(
            (systemTimeOffsetWithUser(tokenId) / 60 / 60) % 24
        );
        return hour < 6 || hour > 18;
    }

    function withdraw() external onlyOwner {
        payable(address(_msgSender())).transfer(address(this).balance);
    }

    function withdrawToken(
        address _tokenContract,
        uint256 _amount
    ) external onlyOwner {
        IERC20(_tokenContract).transfer(msg.sender, _amount);
    }

    error NotTheOwner();
    error NotEnoughTimePassed();
    error MaxSupplyReached();
    error NotNight();
    error Cost();
    error TooCloudy();
    error NotMinted();

    //------------------------------------------------------ Solidity Overrides
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

interface IERC20 {
    function transfer(address _to, uint256 _amount) external returns (bool);
}
