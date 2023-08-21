// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibUnion} from "../libraries/LibUnion.sol";
import {Counters} from "openzeppelin/utils/Counters.sol";
import {IUnionFacet} from "../interfaces/IUnionFacet.sol";
import {CountersUpgradeable} from "openzeppelin-upgradeable/utils/CountersUpgradeable.sol";
import {SemaphoreVoting} from "semaphore/extensions/SemaphoreVoting.sol";
import {SemaphoreGroups} from "semaphore/base/SemaphoreGroups.sol";
import {ISemaphoreVerifier} from "semaphore/interfaces/ISemaphoreVerifier.sol";
import "forge-std/console.sol";

contract UnionFacet is IUnionFacet {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    error UnionFacet__NotAuthorized();

    modifier onlyAdmin(uint256 _index, address _user) {
        LibUnion.UnionStorage storage ds = LibUnion.unionStorage();
        if (this.isAdmin(_index, _user) == false) {
            revert UnionFacet__NotAuthorized();
        }
        _;
    }

    event UnionCreated(bytes32 indexed index, bytes32 indexed name, string logo, string description, address voting);
    event MemberAdded(bytes32 indexed index, address indexed member);
    event MemberRemoved(bytes32 indexed index, address indexed member);
    event AdminAdded(bytes32 indexed index, address indexed admin);
    event AdminRemoved(bytes32 indexed index, address indexed admin);
    event ApplicationSubmitted(bytes32 indexed index, address indexed member);
    event ApplicationApproved(bytes32 indexed index, address indexed member);
    event UserMetadataUpdated(address indexed member, string metadataCID);

    function createUnion(bytes32 _name, string calldata _logo, string calldata _description, uint256 _identity)
        external
        override
        returns (uint256)
    {
        LibUnion.UnionStorage storage ds = LibUnion.unionStorage();
        uint256 _index = ds.index.current();
        ds.unions[_index].name = _name;
        ds.unions[_index].voting = address(new SemaphoreVoting(ISemaphoreVerifier(ds.verifier)));
        console.log("the message sender is", msg.sender);
        console.log("the diamond contract is", address(this));
        this.addAdmin(_index, msg.sender, _identity);
        this.addMember(_index, msg.sender, _identity);
        ds.index.increment();
        emit UnionCreated(bytes32(_index), _name, _logo, _description, ds.unions[_index].voting);
        return _index;
    }

    function addIdentity(uint256 _index, uint256 _identity) internal {
        LibUnion.UnionStorage storage ds = LibUnion.unionStorage();
        if (ds.unions[_index].identityIndexMap[msg.sender] != 0) {
            // Already added
            return;
        }
        ds.unions[_index].identityIndex.increment();
        uint256 _identityIndex = ds.unions[_index].identityIndex.current();
        ds.unions[_index].identityIndexMap[msg.sender] = _identityIndex;
        ds.unions[_index].identities[_identityIndex] = _identity;
    }

    function submitApplication(uint256 _index, uint256 _identity, string calldata _metadataCID) external {
        LibUnion.UnionStorage storage ds = LibUnion.unionStorage();
        if (ds.unions[_index].pendingApplications[msg.sender] == 0) {
            ds.unions[_index].pendingApplications[msg.sender] = _identity;
            emit ApplicationSubmitted(bytes32(_index), msg.sender);
            emit UserMetadataUpdated(msg.sender, _metadataCID);
        }
    }

    function approveApplication(uint256 _index, address _address, bool _isAdmin)
        external
        onlyAdmin(_index, msg.sender)
    {
        LibUnion.UnionStorage storage ds = LibUnion.unionStorage();
        uint256 _identity = ds.unions[_index].pendingApplications[_address];
        this.addMember(_index, _address, _identity);

        if (_isAdmin) {
            this.addAdmin(_index, _address, _identity);
        }
        emit ApplicationApproved(bytes32(_index), _address);
    }

    function isMember(uint256 _index, address _address) public view returns (bool) {
        return LibUnion.unionStorage().unions[_index].members[_address];
    }

    function isAdmin(uint256 _index, address _address) public view returns (bool) {
        return LibUnion.unionStorage().unions[_index].admins[_address];
    }

    function addAdmin(uint256 _index, address _address, uint256 _identity) public {
        LibUnion.unionStorage().unions[_index].admins[_address] = true;
        addIdentity(_index, _identity);
        emit AdminAdded(bytes32(_index), _address);
    }

    // function removeAdmin(uint256 _index, address _address) external {
    //     LibUnion.unionStorage().unions[_index].admins[_address] = true;
    //     emit AdminRemoved(bytes32(_index), _address);
    // }

    function addMember(uint256 _index, address _address, uint256 _identity) public {
        LibUnion.unionStorage().unions[_index].members[_address] = true;
        addIdentity(_index, _identity);
        emit MemberAdded(bytes32(_index), _address);
    }

    // function removeMember(uint256 _index, address _address) external {
    //     LibUnion.unionStorage().unions[_index].members[_address] = true;
    //     emit MemberRemoved(bytes32(_index), _address);
    // }

    function getUnionName(uint256 _index) external view override returns (bytes32) {
        return LibUnion.unionStorage().unions[_index].name;
    }
}
