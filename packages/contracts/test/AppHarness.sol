// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

/**
 * \
 * Authors: Timo Neumann <timo@fyde.fi>, Rohan Sundar <rohan@fyde.fi>
 * EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
 * Abstract Contracts for the shared setup of the tests
 * /*****************************************************************************
 */

import "../src/interfaces/IDiamondCut.sol";
import "../src/facets/DiamondCutFacet.sol";
import "../src/facets/DiamondLoupeFacet.sol";
import "../src/facets/OwnershipFacet.sol";
import "../src/facets/UnionFacet.sol";
import {DiamondInit} from "../src/upgradeInitializers/DiamondInit.sol";
import {ProposalFacet} from "../src/facets/ProposalFacet.sol";
import "../src/Diamond.sol";
import "forge-std/test.sol";
import {Vm} from "forge-std/Vm.sol";
import {AppDeployer} from "../script/AppDeployer.s.sol";

abstract contract AppHarness is AppDeployer, Test {
    function setUp() public virtual {
        run();
    }

    bytes32 internal nextUser = keccak256(abi.encodePacked("user address"));

    function getNextUserAddress() internal returns (address payable) {
        //bytes32 to address conversion
        address payable user = payable(address(uint160(uint256(nextUser))));
        nextUser = keccak256(abi.encodePacked(nextUser));
        return user;
    }

    //create users with 100 ether balance
    function createUsers(uint256 userNum) public returns (address payable[] memory) {
        address payable[] memory users = new address payable[](userNum);
        for (uint256 i = 0; i < userNum; i++) {
            address payable user = getNextUserAddress();
            vm.deal(user, 100 ether);
            users[i] = user;
        }
        return users;
    }
}
