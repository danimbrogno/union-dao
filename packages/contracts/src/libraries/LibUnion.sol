// SPDX-License-Identifier: MIT
/**
 * \
 * Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
 * EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
 * /*****************************************************************************
 */
pragma solidity ^0.8.0;

import {CountersUpgradeable} from "openzeppelin-upgradeable/utils/CountersUpgradeable.sol";
import {ISemaphoreVoting} from "semaphore/interfaces/ISemaphoreVoting.sol";

// Remember to add the loupe functions from DiamondLoupeFacet to the diamond.
// The loupe functions are required by the EIP2535 Diamonds standard

library LibUnion {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    struct UnionData {
        bytes32 name;
        mapping(address => bool) admins;
        mapping(address => bool) members;
        mapping(address => uint256) pendingApplications;
        mapping(uint256 => uint256) identities;
        mapping(address => uint256) identityIndexMap;
        mapping(uint256 => Proposal) proposals;
        CountersUpgradeable.Counter proposalIndex;
        CountersUpgradeable.Counter identityIndex;
        address voting;
    }

    bytes32 constant _DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.UnionDao.LibUnion");

    struct UnionStorage {
        mapping(uint256 => UnionData) unions;
        CountersUpgradeable.Counter index;
        address verifier;
    }

    struct Proposal {
        // ProposalZKTree tree;
        ProposalConfig config;
    }

    struct ProposalConfig {
        address owner;
        mapping(uint256 => bool) validators;
        mapping(uint256 => bool) uniqueHashes;
        uint16 numOptions;
        mapping(uint256 => uint256) optionCounter;
    }

    function unionStorage() internal pure returns (UnionStorage storage ds) {
        bytes32 position = _DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function getVoting(uint256 _union) public view returns (ISemaphoreVoting) {
        return ISemaphoreVoting(unionStorage().unions[_union].voting);
    }
}
