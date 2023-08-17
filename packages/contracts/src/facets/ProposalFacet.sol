// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {LibUnion} from "../libraries/LibUnion.sol";
import {CountersUpgradeable} from "openzeppelin-upgradeable/utils/CountersUpgradeable.sol";
import {ISemaphoreVoting} from "semaphore/interfaces/ISemaphoreVoting.sol";

contract ProposalFacet {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    event ProposalCreated(bytes32 indexed union, bytes32 indexed index, uint16 numOptions, string metadataCID);

    function getProposal(uint256 _union, uint256 _index) internal view returns (LibUnion.Proposal storage) {
        LibUnion.UnionStorage storage ds = LibUnion.unionStorage();
        return ds.unions[_union].proposals[_index];
    }

    function initializeProposal(uint256 _union, uint16 _numOptions, string calldata _metadata)
        external
        returns (uint256)
    {
        uint32 _levels = 20; // Must be 20 for default verified
        LibUnion.UnionStorage storage ds = LibUnion.unionStorage();
        ISemaphoreVoting _voting = LibUnion.getVoting(_union);

        uint256 _index = ds.unions[_union].proposalIndex.current();

        _voting.createPoll(_index, msg.sender, _levels);

        ds.unions[_union].proposalIndex.increment();

        LibUnion.Proposal storage nextProposal = getProposal(_union, _index);

        // nextProposal.owner = "";
        nextProposal.config.numOptions = _numOptions;

        for (uint256 i = 0; i <= nextProposal.config.numOptions; i++) {
            nextProposal.config.optionCounter[i] = 0;
        }

        emit ProposalCreated(bytes32(_union), bytes32(_index), _numOptions, _metadata);

        return _index;
    }

    function registerValidator(uint256 _union, uint256 _index, uint256 _commitment) external {
        LibUnion.Proposal storage theProposal = getProposal(_union, _index);
        // require(msg.sender == config[_index].owner, "Only owner can add validator!");
        theProposal.config.validators[_commitment] = true;
        ISemaphoreVoting _voting = LibUnion.getVoting(_union);
        _voting.addVoter(_index, _commitment);
    }

    function vote(uint256 _union, uint256 _index, uint256 _vote, uint256 _nullifier, uint256[8] calldata _proof)
        external
    {
        LibUnion.Proposal storage theProposal = getProposal(_union, _index);
        require(_vote <= theProposal.config.numOptions, "Invalid option!");
        ISemaphoreVoting _voting = LibUnion.getVoting(_union);
        _voting.castVote(_vote, _nullifier, _index, _proof);
        theProposal.config.optionCounter[_vote] = theProposal.config.optionCounter[_vote] + 1;
    }

    function getOptionCounter(uint256 _union, uint256 _index, uint256 _option) external view returns (uint256) {
        LibUnion.Proposal storage theProposal = getProposal(_union, _index);
        return theProposal.config.optionCounter[_option];
    }
}
