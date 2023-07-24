// SPDX-License-Identifier: MIT
/**
 * \
 * Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
 * EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
 * /*****************************************************************************
 */
pragma solidity ^0.8.0;

import {CountersUpgradeable} from "openzeppelin-upgradeable/utils/CountersUpgradeable.sol";
import {ProposalZKTree} from "../helpers/ProposalZKTree.sol";

// Remember to add the loupe functions from DiamondLoupeFacet to the diamond.
// The loupe functions are required by the EIP2535 Diamonds standard

library LibUnion {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    struct UnionData {
        bytes32 name;
        mapping(uint256 => Proposal) proposals;
        CountersUpgradeable.Counter proposalIndex;
    }

    bytes32 constant _DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.UnionDao.LibUnion");

    struct UnionStorage {
        mapping(uint256 => UnionData) unions;
        CountersUpgradeable.Counter index;
    }

    struct Proposal {
        ProposalZKTree tree;
        ProposalConfig config;
    }

    struct ProposalConfig {
        address owner;
        mapping(address => bool) validators;
        mapping(uint256 => bool) uniqueHashes;
        uint256 numOptions;
        mapping(uint256 => uint256) optionCounter;
    }

    function unionStorage() internal pure returns (UnionStorage storage ds) {
        bytes32 position = _DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function createUnion(bytes32 name) external returns (uint256) {
        UnionStorage storage ds = unionStorage();
        uint256 _index = ds.index.current();
        ds.unions[_index].name = name;
        ds.index.increment();
        return _index;
    }
}
