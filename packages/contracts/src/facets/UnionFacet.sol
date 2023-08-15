// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibUnion} from "../libraries/LibUnion.sol";
import {Counters} from "openzeppelin/utils/Counters.sol";
import {IUnionFacet} from "../interfaces/IUnionFacet.sol";
import {CountersUpgradeable} from "openzeppelin-upgradeable/utils/CountersUpgradeable.sol";

contract UnionFacet is IUnionFacet {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    event UnionCreated(bytes32 indexed index, bytes32 indexed name, string logo, string description);
    event MemberAdded(bytes32 indexed index, address indexed member);
    event MemberRemoved(bytes32 indexed index, address indexed member);
    event AdminAdded(bytes32 indexed index, address indexed admin);
    event AdminRemoved(bytes32 indexed index, address indexed admin);

    function createUnion(bytes32 name, string calldata logo, string calldata description) external returns (uint256) {
        LibUnion.UnionStorage storage ds = LibUnion.unionStorage();
        uint256 _index = ds.index.current();
        ds.unions[_index].name = name;
        ds.unions[_index].admins[msg.sender] = true;
        ds.unions[_index].members[msg.sender] = true;
        ds.index.increment();
        emit MemberAdded(bytes32(_index), msg.sender);
        emit AdminAdded(bytes32(_index), msg.sender);
        emit UnionCreated(bytes32(_index), name, logo, description);
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
        emit AdminAdded(bytes32(_index), msg.sender);
    }

    function removeAdmin(uint256 _index, address _address) external {
        LibUnion.unionStorage().unions[_index].admins[_address] = true;
        emit AdminRemoved(bytes32(_index), msg.sender);
    }

    function addMember(uint256 _index, address _address) external {
        LibUnion.unionStorage().unions[_index].members[_address] = true;
        emit MemberAdded(bytes32(_index), msg.sender);
    }

    function removeMember(uint256 _index, address _address) external {
        LibUnion.unionStorage().unions[_index].members[_address] = true;
        emit MemberRemoved(bytes32(_index), msg.sender);
    }

    function getUnionName(uint256 _index) external view returns (bytes32) {
        return LibUnion.unionStorage().unions[_index].name;
    }
}
