// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

/**
 * \
 * Authors: Timo Neumann <timo@fyde.fi>, Rohan Sundar <rohan@fyde.fi>
 * EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
 * /*****************************************************************************
 */
import "./AppHarness.sol";
import {UnionFacet} from "../src/facets/UnionFacet.sol";
import "../src/libraries/LibUnion.sol";
import "forge-std/console.sol";

// test proper deployment of diamond
contract TestUnionFacet is AppHarness {
    // TEST CASES
    address payable[] users;

    event AdminAdded(bytes32 indexed index, address indexed admin);

    function setUp() public override {
        users = createUsers(2);
        super.setUp();
    }

    function testCreateUnion() public {
        UnionFacet sut = UnionFacet(address(_diamond));
        uint256 unionId = sut.createUnion("My Union", "", 0);

        uint256 unionId2 = sut.createUnion("My Second Union", "", 0);
        string memory metadata = sut.getUnionMetadata(unionId);
        bool isMember = sut.isMember(unionId, address(this));
        bool isAdmin = sut.isAdmin(unionId, address(this));

        assertEq(isMember, true);
        assertEq(isAdmin, true);
        assertEq(unionId, 0);
        assertEq(metadata, "My Union");
        assertEq(unionId2, 1);
    }

    function testAddMember() public {
        UnionFacet sut = UnionFacet(address(_diamond));

        uint256 unionId = sut.createUnion("My Union", "", 0);
        sut.addMember(unionId, users[0], 1);
        bool isMember = sut.isMember(unionId, users[0]);
        bool isNotMember = sut.isMember(unionId, users[1]);
        assertEq(isMember, true);
        assertEq(isNotMember, false);
    }

    function testAddAdmin() public {
        UnionFacet sut = UnionFacet(address(_diamond));

        uint256 unionId = sut.createUnion("My Union", "", 0);
        sut.addAdmin(unionId, users[0], 1);
        bool isAdmin = sut.isAdmin(unionId, users[0]);
        bool isNotAdmin = sut.isAdmin(unionId, users[1]);
        assertEq(isAdmin, true);
        assertEq(isNotAdmin, false);
    }

    function testSubmitApplication() public {
        UnionFacet sut = UnionFacet(address(_diamond));
        vm.prank(users[0]);
        uint256 unionId = sut.createUnion("", "", 0);
        vm.prank(users[1]);
        sut.submitApplication(unionId, 1, "");
        console.log(users[0]);
        vm.prank(users[0]);
        sut.approveApplication(unionId, users[1], true);
        bool isAdmin0 = sut.isAdmin(unionId, users[0]);
        bool isMember0 = sut.isMember(unionId, users[0]);
        bool isAdmin1 = sut.isAdmin(unionId, users[1]);
        bool isMember1 = sut.isMember(unionId, users[1]);
        assertEq(isAdmin0, true, "user 0 is admin");
        assertEq(isMember0, true, "user 0 is member");
        assertEq(isAdmin1, true, "user 1 is admin");
        assertEq(isMember1, true, "user 1 is member");
    }
}
