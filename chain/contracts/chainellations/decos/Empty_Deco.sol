// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "../../interfaces/IDeco.sol";

contract Empty_Deco is IDeco {
    function getMetadata(
        uint256 tokenId
    ) public view override returns (string memory) {
        return
            string.concat(
                '"name": "Two Moons Empty Decoration", ',
                '"description": "Two Moons Empty Decoration"'
            );
    }

    function getDeco(
        uint256 tokenId,
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) public pure override returns (string memory) {
        return string.concat('<g id="deco">', "</g>");
    }
}
