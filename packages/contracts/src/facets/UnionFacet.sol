// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibUnion} from "../libraries/LibUnion.sol";
import {Counters} from "openzeppelin/utils/Counters.sol";
import {IUnionFacet} from "../interfaces/IUnionFacet.sol";
import {CountersUpgradeable} from "openzeppelin-upgradeable/utils/CountersUpgradeable.sol";

contract UnionFacet is IUnionFacet {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    event UnionCreated(uint256 indexed index, bytes32 indexed name);

    function createUnion(bytes32 name) external returns (uint256) {
        LibUnion.UnionStorage storage ds = LibUnion.unionStorage();
        uint256 _index = ds.index.current();
        ds.unions[_index].name = name;
        ds.unions[_index].admins[msg.sender] = true;
        ds.unions[_index].members[msg.sender] = true;
        ds.index.increment();
        emit UnionCreated(_index, name);
        return _index;
    }

    function isMember(uint256 _index, address _address) public view returns (bool) {
        return LibUnion.unionStorage().unions[_index].members[_address];
    }

    function isAdmin(uint256 _index, address _address) public view returns (bool) {
        return LibUnion.unionStorage().unions[_index].admins[_address];
    }

    function addAdmin(uint256 _index, address _address) external {
        LibUnion.unionStorage().unions[_index].admins[_address] = true;
    }

    function removeAdmin(uint256 _index, address _address) external {
        LibUnion.unionStorage().unions[_index].admins[_address] = true;
    }

    function addMember(uint256 _index, address _address) external {
        LibUnion.unionStorage().unions[_index].members[_address] = true;
    }

    function removeMember(uint256 _index, address _address) external {
        LibUnion.unionStorage().unions[_index].members[_address] = true;
    }

    function getUnionName(uint256 _index) external view returns (bytes32) {
        return LibUnion.unionStorage().unions[_index].name;
    }
}
