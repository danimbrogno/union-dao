// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "zk-merkle-tree/ZKTree.sol";
import {LibUnion} from "../libraries/LibUnion.sol";
import {ProposalZKTree} from "../helpers/ProposalZKTree.sol";
import {CountersUpgradeable} from "openzeppelin-upgradeable/utils/CountersUpgradeable.sol";

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
        uint256 _index = ds.unions[_union].proposalIndex.current();
        ds.unions[_union].proposalIndex.increment();

        LibUnion.Proposal storage nextProposal = getProposal(_union, _index);

        nextProposal.tree = new ProposalZKTree(_levels, IHasher(ds.hasher), IVerifier(ds.verifier));
        // nextProposal.owner = "";
        nextProposal.config.numOptions = _numOptions;

        for (uint256 i = 0; i <= nextProposal.config.numOptions; i++) {
            nextProposal.config.optionCounter[i] = 0;
        }

        emit ProposalCreated(bytes32(_union), bytes32(_index), _numOptions, _metadata);

        return _index;
    }

    function registerValidator(uint256 _union, uint256 _index, address _validator) external {
        LibUnion.Proposal storage theProposal = getProposal(_union, _index);
        // require(msg.sender == config[_index].owner, "Only owner can add validator!");
        theProposal.config.validators[_validator] = true;
    }

    function registerCommitment(uint256 _union, uint256 _index, uint256 _uniqueHash, uint256 _commitment) external {
        // require(config[_index].validators[msg.sender], "Only validator can commit!");
        // require(!config[_index].uniqueHashes[_uniqueHash], "This unique hash is already used!");
        LibUnion.Proposal storage theProposal = getProposal(_union, _index);
        theProposal.tree.commit(bytes32(_commitment));
        theProposal.config.uniqueHashes[_uniqueHash] = true;
    }

    function vote(
        uint256 _union,
        uint256 _index,
        uint256 _option,
        uint256 _nullifier,
        uint256 _root,
        uint256[2] memory _proof_a,
        uint256[2][2] memory _proof_b,
        uint256[2] memory _proof_c
    ) external {
        LibUnion.Proposal storage theProposal = getProposal(_union, _index);
        require(_option <= theProposal.config.numOptions, "Invalid option!");
        theProposal.tree.nullify(bytes32(_nullifier), bytes32(_root), _proof_a, _proof_b, _proof_c);
        theProposal.config.optionCounter[_option] = theProposal.config.optionCounter[_option] + 1;
    }

    function getOptionCounter(uint256 _union, uint256 _index, uint256 _option) external view returns (uint256) {
        LibUnion.Proposal storage theProposal = getProposal(_union, _index);
        return theProposal.config.optionCounter[_option];
    }
}
