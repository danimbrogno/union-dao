// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibUnion} from "../libraries/LibUnion.sol";
import {Counters} from "openzeppelin/utils/Counters.sol";
import {IUnionFacet} from "../interfaces/IUnionFacet.sol";

contract UnionFacet is IUnionFacet {
    function createUnion(bytes32 name) external returns (uint256) {
        return LibUnion.createUnion(name);
    }
}
