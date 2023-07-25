// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibUnion} from "../libraries/LibUnion.sol";

interface IUnionFacet {
    function createUnion(bytes32 name) external returns (uint256);
    function getUnionName(uint256 index) external returns (bytes32);
}
