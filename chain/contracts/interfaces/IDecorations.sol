// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IDeco.sol";

interface IDecorations {
    function getFocus(
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) external view returns (string memory);

    function getSilhouette(
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) external view returns (string memory);

    function getSkyMath(
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) external view returns (string memory);

    function getDecorationOne(
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) external view returns (string memory);
}
