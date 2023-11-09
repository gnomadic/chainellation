// // SPDX-License-Identifier: MIT
// pragma solidity 0.8.18;

// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/utils/Base64.sol";
// import "../../interfaces/IDeco.sol";

// contract UFO is ERC721Burnable, IDeco, Ownable {
//     using Strings for uint256;
//     using Counters for Counters.Counter;

//     Counters.Counter private _tokenIds;

//     uint256 public maxSupply = 500;
//     uint256 public mintCost = 5 * 10 ** 16;

//     constructor() ERC721("chainellation UFO", "UFO") {}

//     function mint() public payable {
//         if (msg.value < mintCost) revert Cost();

//         _tokenIds.increment();
//         if (_tokenIds.current() >= maxSupply) revert MaxSupplyReached();
//         uint256 newItemId = _tokenIds.current();
//         _safeMint(msg.sender, newItemId);
//     }

//     function tokenURI(
//         uint256 tokenId
//     ) public view virtual override returns (string memory) {
//         bytes memory dataURI = abi.encodePacked(
//             "{",
//             '"name": "chainellation UFO #',
//             tokenId.toString(),
//             '",',
//             '"description": "chainellation UFO",',
//             '"image": "',
//             generateCharacter(tokenId),
//             '"',
//             "}"
//         );
//         return
//             string(
//                 abi.encodePacked(
//                     "data:application/json;base64,",
//                     Base64.encode(dataURI)
//                 )
//             );
//     }

//     function generateCharacter(
//         uint256 tokenId
//     ) public view returns (string memory) {
//         Color.DNA memory dna = Color.genDNA(
//             tokenId,
//             Color.defaultColors(tokenId)
//         );
//         bytes memory svg = abi.encodePacked(
//             packageAsSVG(tokenId, dna, 0, true)
//         );

//         return
//             string(
//                 abi.encodePacked(
//                     "data:image/svg+xml;base64,",
//                     Base64.encode(svg)
//                 )
//             );
//     }

//     function packageAsSVG(
//         uint256 tokenId,
//         Color.DNA memory dna,
//         uint256 gazes,
//         bool daytime
//     ) public view returns (string memory) {
//         return
//             string.concat(
//                 "<svg>",
//                 getDeco(tokenId, dna, gazes, daytime),
//                 "</svg>"
//             );
//     }

//     function getDeco(
//         uint256 tokenId,
//         Color.DNA memory dna,
//         uint256 gazes,
//         bool daytime
//     ) public pure override returns (string memory) {
//         return
//             string.concat(
//                 '<g id="deco">',
//                 '<circle cx="128" cy="128" r="20" fill="#C0C0C0"/>',
//                 "</g>"
//             );
//     }

//     error Cost();
//     error MaxSupplyReached();

//     function setMaxSupply(uint256 _maxSupply) public onlyOwner {
//         maxSupply = _maxSupply;
//     }

//     function setMintCost(uint256 _newMintCost) public onlyOwner {
//         mintCost = _newMintCost;
//     }

//     function currentSupply() public view returns (uint256) {
//         return _tokenIds.current();
//     }

//     function ownerOf(
//         uint256 tokenId
//     ) public view override(ERC721, IDeco) returns (address owner) {
//         return super.ownerOf(tokenId);
//     }

//     function safeTransferFrom(
//         address from,
//         address to,
//         uint256 tokenId
//     ) public override(ERC721, IDeco) {
//         return super.safeTransferFrom(from, to, tokenId);
//     }

//     function getApproved(
//         uint256 tokenId
//     ) public view override(ERC721, IDeco) returns (address operator) {
//         return super.getApproved(tokenId);
//     }

//     function burn(uint256 tokenId) public override(ERC721Burnable, IDeco) {
//         super.burn(tokenId);
//     }

//     function balanceOf(
//         address owner
//     ) public view override(ERC721, IDeco) returns (uint256) {
//         return super.balanceOf(owner);
//     }
// }
