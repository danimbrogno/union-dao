// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ZKTree, IVerifier} from "zk-merkle-tree/ZKTree.sol";
import {IHasher} from "zk-merkle-tree/MerkleTreeWithHistory.sol";

// TODO: secure only callable by diamond
contract ProposalZKTree is ZKTree {
    constructor(uint32 _levels, IHasher _hasher, IVerifier _verifier) ZKTree(_levels, _hasher, _verifier) {}

    function commit(bytes32 _commitment) public {
        _commit(_commitment);
    }

    function nullify(
        bytes32 _nullifier,
        bytes32 _root,
        uint256[2] memory _proof_a,
        uint256[2][2] memory _proof_b,
        uint256[2] memory _proof_c
    ) public {
        _nullify(_nullifier, _root, _proof_a, _proof_b, _proof_c);
    }
}
