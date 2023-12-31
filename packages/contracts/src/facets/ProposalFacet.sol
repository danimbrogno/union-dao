// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {LibUnion} from "../libraries/LibUnion.sol";
import {CountersUpgradeable} from "openzeppelin-upgradeable/utils/CountersUpgradeable.sol";
import {ISemaphoreVoting} from "semaphore/interfaces/ISemaphoreVoting.sol";
import "forge-std/console.sol";

contract ProposalFacet {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    error ProposalFacet__NotAuthorized();

    event ProposalCreated(
        bytes32 indexed union, bytes32 indexed index, address indexed owner, uint16 numOptions, string metadataCID
    );
    event VoteCast(bytes32 indexed union, bytes32 indexed index, uint256 option, uint256 numVotes);

    function getProposal(uint256 _union, uint256 _index) internal view returns (LibUnion.Proposal storage) {
        LibUnion.UnionStorage storage ds = LibUnion.unionStorage();
        return ds.unions[_union].proposals[_index];
    }

    function initializeProposal(uint256 _union, uint16 _numOptions, string calldata _metadata)
        external
        returns (uint256)
    {
        LibUnion.UnionStorage storage ds = LibUnion.unionStorage();

        if (!LibUnion.isAdmin(_union, msg.sender) && !LibUnion.isMember(_union, msg.sender)) {
            revert ProposalFacet__NotAuthorized();
        }

        uint32 _levels = 20; // Must be 20 for default verified
        ISemaphoreVoting _voting = LibUnion.getVoting(_union);

        uint256 _index = ds.unions[_union].proposalIndex.current();

        _voting.createPoll(_index, address(this), _levels);

        ds.unions[_union].proposalIndex.increment();

        LibUnion.Proposal storage nextProposal = getProposal(_union, _index);

        nextProposal.config.owner = msg.sender;
        nextProposal.config.numOptions = _numOptions;

        for (uint256 i = 0; i <= nextProposal.config.numOptions; i++) {
            nextProposal.config.optionCounter[i] = 0;
        }

        // Add Voters
        for (uint256 j = 1; j <= ds.unions[_union].identityIndex.current(); j++) {
            _voting.addVoter(_index, ds.unions[_union].identities[j]);
        }
        _voting.startPoll(_index, 0);

        emit ProposalCreated(bytes32(_union), bytes32(_index), msg.sender, _numOptions, _metadata);

        return _index;
    }

    function vote(uint256 _union, uint256 _index, uint256 _vote, uint256 _nullifier, uint256[8] calldata _proof)
        external
    {
        LibUnion.Proposal storage theProposal = getProposal(_union, _index);
        require(_vote <= theProposal.config.numOptions, "Invalid option!");
        ISemaphoreVoting _voting = LibUnion.getVoting(_union);
        _voting.castVote(_vote, _nullifier, _index, _proof);
        theProposal.config.optionCounter[_vote] = theProposal.config.optionCounter[_vote] + 1;

        emit VoteCast(bytes32(_union), bytes32(_index), _vote, theProposal.config.optionCounter[_vote]);
    }

    function getOptionCounter(uint256 _union, uint256 _index, uint256 _option) external view returns (uint256) {
        LibUnion.Proposal storage theProposal = getProposal(_union, _index);
        return theProposal.config.optionCounter[_option];
    }

    function getNumIdentities(uint256 _union) external view returns (uint256) {
        LibUnion.UnionStorage storage ds = LibUnion.unionStorage();
        return ds.unions[_union].identityIndex.current();
    }
}
