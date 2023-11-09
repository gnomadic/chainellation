// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "../chainellations/Chainellation.sol";

contract Mockellation is Chainellation {
    uint256 public time;

    constructor(address renderer) Chainellation(renderer) {
        time = block.timestamp;
    }

    function systemTime() public view override returns (uint256) {
        return time;
    }

    function setSystemTime(uint256 _time) public {
        time = _time;
    }
}
