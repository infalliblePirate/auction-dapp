// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./Auction.sol";

contract AuctionFactory {
    address public immutable implementationContract;

    mapping(address => address[]) public allClones;

    event AuctionCreated(address clone, address beneficiary, uint biddingTime);

    constructor(address _implementation) {
        implementationContract = _implementation;
    }

    function createAuction(
        uint _biddingTime,
        address _beneficiary
    ) external returns (address) {
        address clone = Clones.clone(implementationContract);
        allClones[msg.sender].push(clone);

        Auction(clone).initialize(_biddingTime, _beneficiary, msg.sender);
        emit AuctionCreated(clone, _beneficiary, _biddingTime);

        return clone;
    }

    function getAuctions(
        address _owner
    ) external view returns (address[] memory) {
        return allClones[_owner];
    }
}
