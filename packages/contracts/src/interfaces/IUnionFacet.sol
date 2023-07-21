// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibUnion} from "../libraries/LibUnion.sol";

interface IUnionFacet {
    function createUnion(bytes32 name) external returns (LibUnion.UnionData memory);
}
