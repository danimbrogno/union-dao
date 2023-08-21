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

    // function testCreateProposal() public {
    //     IUnionFacet sut1 = IUnionFacet(address(_diamond));
    //     ProposalFacet sut2 = ProposalFacet(address(_diamond));

    //     uint256 unionId = sut1.createUnion("My Union", "", "", 0);
    //     uint256 proposalId = sut2.initializeProposal(unionId, 2, "");
    //     assertEq(proposalId, 0);
    // }


    function testCastVote() public {
        IUnionFacet sut1 = IUnionFacet(address(_diamond));
        ProposalFacet sut2 = ProposalFacet(address(_diamond));
        string memory semaphoreData = vm.readFile('./test/helpers/identity.json');

        uint256 identity = vm.parseJsonUint(semaphoreData, ".commitment");
        uint256 nullifier = vm.parseJsonUint(semaphoreData, ".nullifierHash");
        uint256 signal = vm.parseJsonUint(semaphoreData, ".signal");
        
        uint256[8] memory proof = [
            vm.parseJsonUint(semaphoreData, ".proof[0]"),
            vm.parseJsonUint(semaphoreData, ".proof[1]"),
            vm.parseJsonUint(semaphoreData, ".proof[2]"),
            vm.parseJsonUint(semaphoreData, ".proof[3]"),
            vm.parseJsonUint(semaphoreData, ".proof[4]"),
            vm.parseJsonUint(semaphoreData, ".proof[5]"),
            vm.parseJsonUint(semaphoreData, ".proof[6]"),
            vm.parseJsonUint(semaphoreData, ".proof[7]")
        ];

        uint256 unionId = sut1.createUnion("My Union", "", "", identity);
        assertEq(unionId, 0);
        uint256 proposalId = sut2.initializeProposal(unionId, 2, "");
        assertEq(proposalId, 0);

        // TODO: Get this working
        // sut2.vote(unionId, proposalId, signal, nullifier, proof);
        
    }
}
