// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "../../interfaces/IDeco.sol";

contract MountainLine is IDeco {
    using Strings for uint256;

    function getMetadata(
        uint256 tokenId
    ) public view override returns (string memory) {
        return
            string.concat(
                '"name": "chainellation Mountains #',
                tokenId.toString(),
                '",',
                '"description": "A mountline Silhouette for your Two Moons Night Sky"'
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
                '<filter id="g"><feDropShadow dy="-5" stdDeviation="5" flood-color="#fff" flood-opacity=".1"/></filter>',
                buildMountains(
                    dna.groundSeed,
                    Color.HSL(dna.primaryHue, 100, 30)
                ),
                "</g>"
            );
    }

    function buildMountains(
        uint256 groundSeed,
        Color.HSL memory primary
    ) public pure returns (string memory) {
        Color.HSL memory background = primary;

        string memory mountains = "";
        uint16 baseS = 50;
        uint16 baseL = 20; //24;

        background.S = baseS;
        background.L = baseL;

        for (uint16 i = 1; i < 4; i++) {
            background.L = Color.subZero(baseL, (5 * (i + 1)));

            mountains = string.concat(
                mountains,
                getSingleMountain(
                    groundSeed,
                    i,
                    270 + Color.wiggleUp(groundSeed, i, (i * 50), 20),
                    background
                )
            );
        }
        background.L = 0;

        return mountains;
    }

    function getSingleMountain(
        uint256 groundSeed,
        uint16 nonce,
        uint16 height,
        Color.HSL memory background
    ) public pure returns (string memory) {
        uint16[] memory xCoords = getXCoordsArray(groundSeed, nonce);

        uint16[] memory yCoords = getYCoords2(
            groundSeed,
            nonce,
            height,
            xCoords
        );

        uint16 distance = (uint16)(512 / xCoords[xCoords.length - 1]) + 1;

        string memory land = string.concat(
            '<path  d="M ',
            Color.toString((xCoords[0]) * distance),
            ", ",
            Color.toString(yCoords[0])
        );

        for (uint16 i = 1; i < xCoords.length; i++) {
            land = string.concat(
                land,
                " C ",
                Color.toString(
                    (xCoords[i - 1] * distance) +
                        (((xCoords[i] * distance) -
                            (xCoords[i - 1] * distance)) / 2)
                ),
                ", ",
                Color.toString(yCoords[i] - (distance / 2)),
                " ",
                Color.toString(
                    (xCoords[i - 1] * distance) +
                        (((xCoords[i] * distance) -
                            (xCoords[i - 1] * distance)) / 2)
                ),
                ", ",
                Color.toString(yCoords[i] - (distance / 2)),
                " ",
                Color.toString((xCoords[i] + 0) * distance),
                ", ",
                Color.toString(yCoords[i]),
                " "
            );
        }

        land = string.concat(
            land,
            " L 512, ",
            Color.wiggleString(
                groundSeed,
                nonce,
                yCoords[yCoords.length - 1],
                10
            )
        );

        land = string.concat(
            land,
            ' L 512, 512 L 0 512 z" fill="',
            Color.HSLtoString(background),
            '" filter="url(#g)"/>'
        );

        return land;
    }

    function getXCoordsArray(
        uint256 groundSeed,
        uint16 nonce
    ) public pure returns (uint16[] memory) {
        uint16 valleyCount = (uint16)(
            (Color.psuedorandom(groundSeed, nonce) % 20) + 18
        );

        uint16[] memory valleys = new uint16[](valleyCount);
        valleys[0] = 0;

        for (uint16 i = 1; i < valleyCount; i++) {
            valleys[i] =
                Color.wiggleUp(groundSeed, nonce * i, valleys[i - 1] + 1, 5) +
                1;
        }

        return (valleys);
    }

    function getYCoords2(
        uint256 groundSeed,
        uint256 nonce,
        uint16 height,
        uint16[] memory inputArray
    ) public pure returns (uint16[] memory) {
        uint16[] memory outputArray = new uint16[](inputArray.length);

        uint16 midpoint = Color.wiggle(
            groundSeed,
            nonce,
            (uint16)(inputArray.length / 2),
            2
        );

        uint8 groupSize = 0;

        uint16 currentNum = (uint16)(height);

        bool add = true;

        outputArray[0] = height;
        for (uint16 i = 1; i < inputArray.length; i++) {
            if (i == midpoint) {
                outputArray[i] = currentNum + 5;
            } else {
                if (i < midpoint) {
                    add = true;
                } else if (i > midpoint) {
                    add = false;
                }

                if (
                    i == 0 ||
                    (inputArray[i] - inputArray[i - 1] < 2) ||
                    groupSize < 4
                ) {
                    outputArray[i] =
                        Color.wiggle(groundSeed, nonce * i, currentNum, 5) +
                        3;
                    groupSize++;
                } else {
                    if (add) {
                        currentNum = currentNum + 10;
                    } else {
                        currentNum = currentNum - 10;
                    }

                    outputArray[i] =
                        Color.wiggle(groundSeed, nonce * i, currentNum, 7) +
                        8;
                    groupSize = 0;
                }
            }
        }
        return outputArray;
    }
}
