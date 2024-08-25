// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Coinflip {
    address public owner;
    uint256 public flipCost;

    event FlipResult(address indexed user, bool win, uint256 amount);

    constructor() {
        owner = msg.sender;
        flipCost = 0.01 ether; // Example cost, adjust as needed
    }

    function flip(bool _side) public payable {
        require(msg.value == flipCost, "Incorrect amount sent");

        bool result = (block.timestamp % 2 == 0); // Simple pseudo-random flip
        if (result == _side) {
            payable(msg.sender).transfer(msg.value * 2);
            emit FlipResult(msg.sender, true, msg.value * 2);
        } else {
            emit FlipResult(msg.sender, false, 0);
        }
    }

    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}