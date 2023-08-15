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
import "../src/facets/ProposalFacet.sol";
import "../src/libraries/LibUnion.sol";

// test proper deployment of diamond
contract TestProposalFacet is AppHarness {
    // TEST CASES

    function testCreateProposal() public {
        IUnionFacet sut1 = IUnionFacet(address(_diamond));
        ProposalFacet sut2 = ProposalFacet(address(_diamond));

        uint256 unionId = sut1.createUnion("My Union", "", "");
        uint256 proposalId = sut2.initializeProposal(unionId, 2);
        assertEq(proposalId, 0);
    }
}
