// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "../Color.sol";

interface IChainellationRenderer {
    function generateSVG(
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime,
        uint8 cloudDays,
        address decorator
    ) external view returns (string memory);

    function subZero(
        uint16 first,
        uint16 second
    ) external pure returns (uint16);

    function psuedorandom(
        uint256 tokenId,
        uint256 nonce
    ) external pure returns (uint256);
}
