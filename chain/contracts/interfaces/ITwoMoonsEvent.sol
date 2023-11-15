// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

interface ITwoMoonsEvent {
    function onStargaze(uint256 tokenId, uint256 gazes) external;
}
