// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibUnion} from "../libraries/LibUnion.sol";

interface IUnionFacet {
    function createUnion(bytes32 name, string calldata image, string calldata description, uint256 identity)
        external
        returns (uint256);
    function getUnionName(uint256 index) external returns (bytes32);
    function submitApplication(uint256 _index, uint256 _identity, string calldata _metadataCID) external;
    function approveApplication(uint256 _index, address _address, bool _isAdmin) external;
}
