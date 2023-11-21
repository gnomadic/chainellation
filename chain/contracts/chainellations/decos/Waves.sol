// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "../../interfaces/IDeco.sol";

contract Waves is IDeco {
    using Strings for uint256;

    function getMetadata(
        uint256 tokenId
    ) public view override returns (string memory) {
        return
            string.concat(
                '"name": "chainellation Waves #',
                tokenId.toString(),
                '",',
                '"description": "A Wave Silhouette for your Two Moons Night Sky"'
            );
    }

    function getDeco(
        uint256 tokenId,
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) public pure override returns (string memory) {
        return
            string.concat(
                '<g id="silhouette">',
                '<filter id="light"><feDiffuseLighting result="diffOut" in="SourceGraphic" diffuseConstant="1" lighting-color="white"><feDistantLight azimuth="45" elevation="90"/>',
                '</feDiffuseLighting><feComposite in="SourceGraphic" in2="diffOut" out="l" operator="arithmetic" k1="2" k2="1" k3="0" k4="0"/></filter>',
                getWavyLine(tokenId, Color.HSL(dna.primaryHue, 100, 30)),
                "</g>"
            );
    }

    function getWavyLine(
        uint256 tokenId,
        Color.HSL memory background
    ) public pure returns (string memory) {
        string memory mountains = "";

        Color.HSL memory bg = Color.flipColor(background);

        mountains = string.concat(
            mountains,
            '<g filter="url(#light)" stroke="black" stroke-width="1">'
        );
        uint16 height = Color.wiggle(tokenId, 3415, 280, 10);

        uint16 baseS = 25;
        uint16 baseL = 50;

        uint16 steps;

        for (uint16 i = 0; i < 6; i++) {
            height = Color.wiggleUp(tokenId, i, height, 10) + 30;
            steps = (uint16)(Color.psuedorandom(tokenId, i) % 4) + 3;

            bg.S = Color.subZero(baseS, (1 * (i + 1)));
            bg.L = Color.subZero(baseL, (3 + (i * 4)));

            mountains = string.concat(
                mountains,
                getWave(tokenId, bg, i, height, steps)
            );
        }
        mountains = string.concat(mountains, "</g>");
        return mountains;
    }

    function getWave(
        uint256 tokenId,
        Color.HSL memory bg,
        uint16 nonce,
        uint16 height,
        uint16 steps
    ) public pure returns (string memory) {
        uint16 distance = (Color.wiggle(tokenId, nonce, 512 / steps, 10));

        string memory wave = string.concat(
            '<path d="M 0 ',
            Color.toString(height),
            "Q ",
            Color.toString(distance / 2),
            " ",
            Color.toString(Color.wiggle(tokenId, nonce, height, 75)),
            " ",
            Color.toString(distance),
            " ",
            Color.toString(height)
        );
        for (uint16 i = 0; i < steps; i++) {
            wave = string.concat(
                wave,
                " T ",
                Color.toString(distance * (i + 2)),
                " ",
                Color.toString(height)
            );
        }

        wave = string.concat(wave, " T 512", " ", Color.toString(height));

        wave = string.concat(
            wave,
            ' L 512 512 L 0 512 z" fill="',
            Color.HSLtoString(bg),
            '"/>'
        );
        return wave;
    }
}
