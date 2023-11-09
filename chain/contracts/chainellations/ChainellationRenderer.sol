// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "../Color.sol";
// import "./Constellations.sol";
import "../interfaces/IDecorations.sol";
import "../interfaces/IChainellationRenderer.sol";

// import "hardhat/console.sol";

contract ChainellationRenderer is IChainellationRenderer {
    function generateSVG(
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime,
        uint8 cloudDays,
        address decorator
    ) public view returns (string memory) {
        Color.HSL memory primary = Color.HSL(dna.primaryHue, 100, 30);
        Color.HSL memory secondary = Color.HSL(dna.secondaryHue, 100, 30);
        // console.log("Colors are %s and %s ", primary.H, secondary.H);
        string memory svg = string.concat(
            '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><clipPath id="box"><path d="M0 0h512v512H0z"/></clipPath><defs>',
            getGradients(dna.starSeed, primary, secondary, cloudDays),
            getFilters(dna.funkSeed),
            '</defs><svg viewBox="0 0 512 512" clip-path="url(#box)">',
            getBackgrounds(daytime),
            // '<path d="M 0, 340 h 512" stroke="white" opacity="0.4"/>',
            // '<path d="M 0, 170 h 512" stroke="white" opacity="0.4"/>',
            // '<path d="M 170, 0 v 512" stroke="white" opacity="0.4"/>',
            // '<path d="M 340, 0 v 512" stroke="white" opacity="0.4"/>',
            // '<path d="M250 80 h 180 v 180 h -180 v-180" stroke="white" fill="none"/>',

            // buildStars(dna.starSeed, dna.constellationSeed, gazes, daytime),
            getStars(dna.starSeed, gazes, daytime),
            getDecos(decorator, dna, gazes, daytime),
            // getFocus(decorator, dna, gazes, daytime),
            // getSkyMath(decorator, dna, gazes, daytime),
            // getDecorationOne(decorator, dna, gazes, daytime),
            // getSilhouette(decorator, dna, gazes, daytime),
            "</svg>",
            "</svg>"
        );
        return svg;
    }

    function getGradients(
        uint256 seed,
        Color.HSL memory primary,
        Color.HSL memory secondary,
        uint8 cloudDays
    ) public pure returns (string memory) {
        string memory rotation = Color.toString(
            (uint16)(Color.psuedorandom(seed, 123) % 45)
        );
        string memory sky = string.concat(
            '<linearGradient id="skyGradient" gradientTransform="rotate(',
            rotation,
            ')">'
        );

        sky = string.concat(
            sky,
            '<stop offset="0%"',
            ' stop-color="',
            Color.HSLtoString(primary),
            '"/>'
        );

        sky = string.concat(
            sky,
            '<stop offset="100%"',
            ' stop-color="',
            Color.HSLtoString(secondary),
            '"/>'
        );

        sky = string.concat(
            sky,
            '</linearGradient><linearGradient id="cloudGradient" gradientTransform="rotate(',
            rotation,
            ')"><stop stop-opacity=".',
            Color.toString(cloudDays == 0 ? 1 : cloudDays),
            '" offset="15%"/><stop stop-opacity=".5" offset="30%"/>',
            '<stop stop-opacity=".',
            Color.toString(cloudDays == 0 ? 1 : cloudDays),
            '" offset="50%"/></linearGradient>'
        );

        Color.HSL memory bright = Color.rotateColor(primary, 240);
        bright.L = 90;
        sky = string.concat(
            sky,
            '<linearGradient id="dayGradient" gradientTransform="rotate(13)">',
            '<stop offset="0%" stop-color="',
            Color.HSLtoString(Color.rotateColor(primary, 180)),
            '"/>',
            '<stop offset="100%" stop-color="',
            Color.HSLtoString(Color.rotateColor(secondary, 180)),
            '"/>',
            "</linearGradient>"
        );

        return sky;
    }

    function getBackgrounds(bool day) public pure returns (string memory) {
        string memory bg = "";

        bg = string.concat(
            '<rect width="100%" height="100%" filter="url(#stars)" opacity="',
            Color.toString(day ? 0 : 1),
            '"/>',
            '<path fill="url(#dayGradient)" d="M0 0h512v512H0z" opacity="',
            Color.toString(day ? 1 : 0),
            '"  filter="url(#light)"/>',
            '<path fill="url(#skyGradient)"  d="M0 0h512v512H0z" opacity=".',
            Color.toString(day ? 0 : 7),
            '"/>',
            '<path fill="url(#cloudGradient)" filter="url(#clouds)" d="M0 0h565v512H0z"/>'
        );

        return bg;
    }

    function getFilters(uint256 seed) public pure returns (string memory) {
        string memory filters = "";
        filters = string.concat(
            filters,
            '<filter id="stars"><feTurbulence baseFrequency=".35" seed="',
            Color.toString((uint16)(Color.psuedorandom(seed, 123) % 10000)),
            '"/>',
            '<feColorMatrix values="0 0 0 9 -4 0 0 0 9 -4 0 0 0 9 -4 0 0 0 0 1"/></filter>'
        );
        filters = string.concat(
            filters,
            '<filter id="clouds" x="-50%" y="-50%" height="200%" width="200%"><feGaussianBlur in="sky" stdDeviation="20" result="skyblur"/>',
            '<feTurbulence type="fractalNoise" baseFrequency=".01" numOctaves="5" result="skynoise" seed="',
            Color.toString((uint16)(Color.psuedorandom(seed, 123) % 10000)),
            '"/>',
            '<feColorMatrix values="1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 3 -1 -1 0 0"/>',
            '<feComposite operator="in" in2="SourceGraphic"/></filter>'
        );

        filters = string.concat(
            filters,
            '<filter id="light"><feSpecularLighting result="specOut" specularExponent="100" lighting-color="white">',
            '<fePointLight x="10" y="70" z="300"/></feSpecularLighting>',
            '<feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/></filter>'
        );

        return filters;
    }

    function getStars(
        uint256 starSeed,
        uint256 gazes,
        bool daytime
    ) public pure returns (string memory) {
        if (daytime) {
            return "";
        }
        uint8 count;

        if (gazes > 30) {
            count = 30;
        } else {
            count = (uint8)(gazes);
        }

        string memory stars = '<g fill="white">';
        string memory x = "";
        string memory y = "";
        uint8 seed = 0;
        for (uint8 i = 0; i < count; i++) {
            x = Color.toString(
                (uint16)(Color.psuedorandom(starSeed, i) % 462) + 25
            );

            y = Color.toString(
                (uint16)(Color.psuedorandom(starSeed, i) % 255) + 25
            );
            seed = (uint8)(Color.psuedorandom(starSeed, i) % 3);
            if (seed == 0) {
                stars = string.concat(
                    stars,
                    '<circle r="1" cx="',
                    x,
                    '" cy="',
                    y,
                    '" fill="white"  opacity="1">',
                    '<animate attributeName="r" values="0;3;1" dur="1s"/></circle>'
                );
            } else if (seed == 1) {
                stars = string.concat(
                    stars,
                    '<path d="M ',
                    x,
                    ",",
                    y,
                    'c 7,0 7,0 7,-7 c 0,7 0,7 7,7 c -7,0 -7,0 -7,7 c 0,-7 0,-7 -7,-7">',
                    '<animateTransform attributeName="transform" type="scale" from="0 0" to="1 1" begin="0s" dur="0.5s" repeatCount="1"/></path>'
                );
            } else if (seed == 2) {
                stars = string.concat(
                    stars,
                    '<circle r="3" cx="',
                    x,
                    '" cy="',
                    y,
                    '" opacity="0.3"><animate attributeName="r" values="0;5;3" dur="1s"/></circle>',
                    '<circle r="1" cx="',
                    x,
                    '" cy="',
                    y,
                    '"><animate attributeName="r" values="0;3;1" dur="1s"/></circle>'
                );
            }
        }
        return string.concat(stars, "</g>");
    }

    function psuedorandom(
        uint256 tokenId,
        uint256 nonce
    ) public pure returns (uint256) {
        return Color.psuedorandom(tokenId, nonce);
    }

    function subZero(uint16 first, uint16 second) public pure returns (uint16) {
        return Color.subZero(first, second);
    }

    function getDecos(
        address decorator,
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) private view returns (string memory) {
        return
            string.concat(
                getFocus(decorator, dna, gazes, daytime),
                getSkyMath(decorator, dna, gazes, daytime),
                getDecorationOne(decorator, dna, gazes, daytime),
                getSilhouette(decorator, dna, gazes, daytime)
            );
    }

    function getFocus(
        address decorator,
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) private view returns (string memory) {
        if (decorator == address(0)) return "";
        IDecorations deco = IDecorations(decorator);
        return deco.getDecorationOne(dna, gazes, daytime);
    }

    function getSilhouette(
        address decorator,
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) private view returns (string memory) {
        if (decorator == address(0)) return "";
        IDecorations deco = IDecorations(decorator);
        return deco.getSilhouette(dna, gazes, daytime);
    }

    function getSkyMath(
        address decorator,
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) private view returns (string memory) {
        if (decorator == address(0)) return "";
        IDecorations deco = IDecorations(decorator);
        return deco.getSkyMath(dna, gazes, daytime);
    }

    function getDecorationOne(
        address decorator,
        Color.DNA memory dna,
        uint256 gazes,
        bool daytime
    ) private view returns (string memory) {
        if (decorator == address(0)) return "";
        IDecorations deco = IDecorations(decorator);
        return deco.getDecorationOne(dna, gazes, daytime);
    }
}
