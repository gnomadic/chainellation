// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
import "@openzeppelin/contracts/utils/Strings.sol";

library Color {
    using Strings for uint256;

    struct DNA {
        uint256 tokenId;
        uint16 primaryHue;
        uint16 secondaryHue;
        uint8 constellation;
        uint8 cloudsAt;
        uint256 starSeed;
        uint256 funkSeed;
        uint256 circleSeed;
        uint256 groundSeed;
        // uint256 constellationSeed;
    }

    struct HSL {
        uint16 H;
        uint16 S;
        uint16 L;
    }

    struct Point {
        uint16 x;
        uint16 y;
    }

    struct Circle {
        uint16 x;
        uint16 y;
        uint16 r;
        uint8 count;
        uint16 stroke;
        bool active;
    }

    function HSLtoString(HSL memory color) public pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "hsl(",
                    ((uint256)(color.H)).toString(),
                    ",",
                    ((uint256)(color.S)).toString(),
                    "%,",
                    ((uint256)(color.L)).toString(),
                    "%)"
                )
            );
    }

    function toString(uint16 num) public pure returns (string memory) {
        return ((uint256)(num)).toString();
    }

    function psuedorandom(
        uint256 tokenId,
        uint256 nonce
    ) public pure returns (uint256) {
        return uint(keccak256(abi.encodePacked(tokenId, nonce)));
    }

    function wiggle(
        uint256 tokenId,
        uint256 nonce,
        uint16 base,
        uint16 offset
    ) public pure returns (uint16) {
        uint16 wiggleAmount = (uint16)(psuedorandom(tokenId, nonce) % offset);
        if ((uint8)(psuedorandom(tokenId, nonce) % 2) == 0) {
            return base + wiggleAmount;
        } else {
            return subZero(base, wiggleAmount);
        }
    }

    function wiggleString(
        uint256 tokenId,
        uint256 nonce,
        uint16 base,
        uint16 offset
    ) public pure returns (string memory) {
        return toString(wiggle(tokenId, nonce, base, offset));
    }

    function wiggleUp(
        uint256 tokenId,
        uint256 nonce,
        uint16 base,
        uint16 offset
    ) public pure returns (uint16) {
        uint16 wiggleAmount = (uint16)(psuedorandom(tokenId, nonce) % offset);
        return base + wiggleAmount;
    }

    function subZero(uint16 first, uint16 second) public pure returns (uint16) {
        if (first > second) {
            return first - second;
        } else {
            return 0;
        }
    }

    function flipColor(
        Color.HSL memory color
    ) public pure returns (Color.HSL memory) {
        uint16 newH = color.H + 180 > 360 ? color.H - 180 : color.H + 180;
        return Color.HSL(newH, color.S, color.L);
    }

    // TODO this isn't actually the rotate function because it zeros out
    function rotateColor(
        Color.HSL memory color,
        uint16 amount
    ) public pure returns (Color.HSL memory) {
        uint16 hue = (color.H + amount) % 360;
        return Color.HSL(hue, color.S, color.L);
    }

    function genDNA(
        uint256 tokenId,
        uint32 colors,
        uint8 clouds,
        uint8 constellation
    ) public pure returns (DNA memory) {
        DNA memory dna;
        dna.tokenId = tokenId;
        dna.primaryHue = uint16(colors >> 16);
        dna.secondaryHue = uint16(colors);
        dna.starSeed = psuedorandom(tokenId, 123);
        dna.funkSeed = psuedorandom(tokenId, 234);
        dna.circleSeed = psuedorandom(tokenId, 345);
        dna.groundSeed = psuedorandom(tokenId, 456);
        dna.constellation = constellation;
        dna.cloudsAt = clouds;

        return dna;
    }

    function defaultColors(uint256 tokenId) public pure returns (uint32) {
        uint16 primary = uint16((tokenId % 16) * 10);
        uint16 secondary = rotateColor(HSL(primary, 0, 0), 60).H;
        return (uint32(primary) << 16) | uint32(secondary);
    }
}
