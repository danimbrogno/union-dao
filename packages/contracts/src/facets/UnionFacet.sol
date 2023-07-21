// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibUnion} from "../libraries/LibUnion.sol";
import {Counters} from "openzeppelin/utils/Counters.sol";
import {IUnionFacet} from "../interfaces/IUnionFacet.sol";

contract UnionFacet is IUnionFacet {
    using Counters for Counters.Counter;

    Counters.Counter private _index;

    function createUnion(bytes32 name) external returns (LibUnion.UnionData memory) {
        _index.increment();
        return LibUnion.createUnion(_index.current(), name);
    }
}
