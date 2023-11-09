// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "../../interfaces/IDeco.sol";

contract SkyCircle is IDeco {
    using Strings for uint256;

    function getMetadata(
        uint256 tokenId
    ) public view override returns (string memory) {
        return
            string.concat(
                '"name": "Two Moons Sky Math #',
                tokenId.toString(),
                '",',
                '"description": "A mathematical anomaly for your Two Moons Night Sky"'
            );
    }

    function getDeco(
        uint256 tokenId,
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) public pure override returns (string memory) {
        return string.concat("<g>", getCircles(gazes), "</g>");
    }

    function getCircles(uint256 gazes) public pure returns (string memory) {
        string memory math = string.concat(
            '<g id="skymath" opacity="1" fill="none" stroke="white" stroke-width="1">',
            '<circle r="80" cx="340" cy="170" stroke-dasharray="0 1 0" opacity="0.8" />',
            '<circle r="85" cx="340" cy="170" stroke-dasharray="1 0 1" opacity="0.8" />',
            '<circle r="90" cx="340" cy="170" stroke-dasharray="0 1 0" opacity="0.8" />'
        );

        // This is where we set how many stargazes are required to add a circle
        uint8 unlocked = (uint8)(gazes / 6);

        uint8 active = unlocked >= 5 ? 5 : unlocked;
        for (uint16 i = 0; i < active; i++) {
            math = string.concat(
                math,
                '<path d = "M',
                Color.toString(330 + (5 * i)),
                ' 0 v 80" opacity="0.5" />',
                '<path d = "M',
                Color.toString(330 + (5 * i)),
                ' 260 v 280" opacity="0.5" />'
            );
        }

        math = string.concat(math, "</g>");

        return math;
    }
}
