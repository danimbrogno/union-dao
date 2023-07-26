// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

/**
 * \
 * Authors: Timo Neumann <timo@fyde.fi>, Rohan Sundar <rohan@fyde.fi>
 * EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
 * /*****************************************************************************
 */
import "./AppHarness.sol";
import "../src/facets/UnionFacet.sol";
import "../src/libraries/LibUnion.sol";
import "forge-std/console.sol";

// test proper deployment of diamond
contract TestUnionFacet is AppHarness {
    // TEST CASES
    address payable[] users;

    function setUp() public override {
        users = createUsers(2);
        super.setUp();
    }

    function testCreateUnion() public {
        UnionFacet sut = UnionFacet(address(_diamond));
        uint256 unionId = sut.createUnion("My Union");
        uint256 unionId2 = sut.createUnion("My Second Union");
        bytes32 name = sut.getUnionName(unionId);
        bool isMember = sut.isMember(unionId, address(this));
        bool isAdmin = sut.isAdmin(unionId, address(this));

        assertEq(isMember, true);
        assertEq(isAdmin, true);
        assertEq(unionId, 0);
        assertEq(name, "My Union");
        assertEq(unionId2, 1);
    }

    function testAddMember() public {
        UnionFacet sut = UnionFacet(address(_diamond));

        uint256 unionId = sut.createUnion("My Union");
        sut.addMember(unionId, users[0]);
        bool isMember = sut.isMember(unionId, users[0]);
        bool isNotMember = sut.isMember(unionId, users[1]);
        assertEq(isMember, true);
        assertEq(isNotMember, false);
    }

    function testAddAdmin() public {
        UnionFacet sut = UnionFacet(address(_diamond));

        uint256 unionId = sut.createUnion("My Union");
        sut.addAdmin(unionId, users[0]);
        bool isAdmin = sut.isAdmin(unionId, users[0]);
        bool isNotAdmin = sut.isAdmin(unionId, users[1]);
        assertEq(isAdmin, true);
        assertEq(isNotAdmin, false);
    }
}
