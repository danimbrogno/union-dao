// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

/**
 * \
 * Authors: Timo Neumann <timo@fyde.fi>, Rohan Sundar <rohan@fyde.fi>
 * EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
 * /*****************************************************************************
 */
import "./AppHarness.sol";
import "../src/interfaces/IUnionFacet.sol";
import "../src/libraries/LibUnion.sol";

// test proper deployment of diamond
contract TestUnionFacet is AppHarness {
    // TEST CASES

    function testCreateUnion() public {
        IUnionFacet sut = IUnionFacet(address(_diamond));

        LibUnion.UnionData memory res = sut.createUnion("My Union");

        assertEq(res.name, "My Union");
    }
}
