//SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import {SemaphoreGroups} from "semaphore/base/SemaphoreGroups.sol";
// TODO: maybe not needed

contract Groups is SemaphoreGroups {
    // TODO: secure these functions limiting access to the diamond
    constructor() {}

    function createGroup(uint256 groupId, uint256 merkleTreeDepth) external virtual {
        super._createGroup(groupId, merkleTreeDepth);
    }

    function addMember(uint256 groupId, uint256 identityCommitment) external virtual {
        super._addMember(groupId, identityCommitment);
    }

    function updateMember(
        uint256 groupId,
        uint256 identityCommitment,
        uint256 newIdentityCommitment,
        uint256[] calldata proofSiblings,
        uint8[] calldata proofPathIndices
    ) external virtual {
        super._updateMember(groupId, identityCommitment, newIdentityCommitment, proofSiblings, proofPathIndices);
    }

    function removeMember(
        uint256 groupId,
        uint256 identityCommitment,
        uint256[] calldata proofSiblings,
        uint8[] calldata proofPathIndices
    ) external virtual {
        super._removeMember(groupId, identityCommitment, proofSiblings, proofPathIndices);
    }
}
