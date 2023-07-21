// SPDX-License-Identifier: MIT
/**
 * \
 * Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
 * EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
 * /*****************************************************************************
 */
pragma solidity ^0.8.0;

import {Counters} from "openzeppelin/utils/Counters.sol";

// Remember to add the loupe functions from DiamondLoupeFacet to the diamond.
// The loupe functions are required by the EIP2535 Diamonds standard

library LibUnion {
    using Counters for Counters.Counter;

    struct UnionData {
        bytes32 name;
    }

    bytes32 constant _DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.UnionDao.LibUnion");

    struct UnionStorage {
        mapping(uint256 => UnionData) unions;
    }

    function unionStorage() internal pure returns (UnionStorage storage ds) {
        bytes32 position = _DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function createUnion(uint256 index, bytes32 name) public returns (UnionData memory) {
        UnionStorage storage ds = unionStorage();
        ds.unions[index] = UnionData(name);
        return ds.unions[index];
    }
}
