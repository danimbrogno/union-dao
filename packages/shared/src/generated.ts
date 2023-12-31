// Generated by @wagmi/cli@1.3.0 on 8/22/2023 at 6:59:41 PM

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ProposalFacet
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const proposalFacetABI = [
  { type: 'error', inputs: [], name: 'ProposalFacet__NotAuthorized' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'union',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'index',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'numOptions',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
      {
        name: 'metadataCID',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'ProposalCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'union',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'index',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'option',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'numVotes',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'VoteCast',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_union', internalType: 'uint256', type: 'uint256' }],
    name: 'getNumIdentities',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_union', internalType: 'uint256', type: 'uint256' },
      { name: '_index', internalType: 'uint256', type: 'uint256' },
      { name: '_option', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getOptionCounter',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_union', internalType: 'uint256', type: 'uint256' },
      { name: '_numOptions', internalType: 'uint16', type: 'uint16' },
      { name: '_metadata', internalType: 'string', type: 'string' },
    ],
    name: 'initializeProposal',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_union', internalType: 'uint256', type: 'uint256' },
      { name: '_index', internalType: 'uint256', type: 'uint256' },
      { name: '_vote', internalType: 'uint256', type: 'uint256' },
      { name: '_nullifier', internalType: 'uint256', type: 'uint256' },
      { name: '_proof', internalType: 'uint256[8]', type: 'uint256[8]' },
    ],
    name: 'vote',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SemaphoreVoting
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const semaphoreVotingABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      {
        name: '_verifier',
        internalType: 'contract ISemaphoreVerifier',
        type: 'address',
      },
    ],
  },
  {
    type: 'error',
    inputs: [],
    name: 'Semaphore__CallerIsNotThePollCoordinator',
  },
  { type: 'error', inputs: [], name: 'Semaphore__GroupAlreadyExists' },
  { type: 'error', inputs: [], name: 'Semaphore__GroupDoesNotExist' },
  {
    type: 'error',
    inputs: [],
    name: 'Semaphore__MerkleTreeDepthIsNotSupported',
  },
  { type: 'error', inputs: [], name: 'Semaphore__PollHasAlreadyBeenStarted' },
  { type: 'error', inputs: [], name: 'Semaphore__PollIsNotOngoing' },
  {
    type: 'error',
    inputs: [],
    name: 'Semaphore__YouAreUsingTheSameNillifierTwice',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'groupId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'merkleTreeDepth',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'zeroValue',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'GroupCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'groupId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'identityCommitment',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'merkleTreeRoot',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MemberAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'groupId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'identityCommitment',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'merkleTreeRoot',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MemberRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'groupId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'identityCommitment',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newIdentityCommitment',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'merkleTreeRoot',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MemberUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pollId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'coordinator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'PollCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pollId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'coordinator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'decryptionKey',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PollEnded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pollId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'coordinator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'encryptionKey',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PollStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pollId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'vote',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'VoteAdded',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'pollId', internalType: 'uint256', type: 'uint256' },
      { name: 'identityCommitment', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addVoter',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'vote', internalType: 'uint256', type: 'uint256' },
      { name: 'nullifierHash', internalType: 'uint256', type: 'uint256' },
      { name: 'pollId', internalType: 'uint256', type: 'uint256' },
      { name: 'proof', internalType: 'uint256[8]', type: 'uint256[8]' },
    ],
    name: 'castVote',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'pollId', internalType: 'uint256', type: 'uint256' },
      { name: 'coordinator', internalType: 'address', type: 'address' },
      { name: 'merkleTreeDepth', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createPoll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'pollId', internalType: 'uint256', type: 'uint256' },
      { name: 'decryptionKey', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'endPoll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'groupId', internalType: 'uint256', type: 'uint256' }],
    name: 'getMerkleTreeDepth',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'groupId', internalType: 'uint256', type: 'uint256' }],
    name: 'getMerkleTreeRoot',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'groupId', internalType: 'uint256', type: 'uint256' }],
    name: 'getNumberOfMerkleTreeLeaves',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'pollId', internalType: 'uint256', type: 'uint256' },
      { name: 'encryptionKey', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'startPoll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'verifier',
    outputs: [
      {
        name: '',
        internalType: 'contract ISemaphoreVerifier',
        type: 'address',
      },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UnionFacet
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const unionFacetABI = [
  { type: 'error', inputs: [], name: 'UnionFacet__NotAuthorized' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'index',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'admin',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'AdminAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'index',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'admin',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'AdminRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'index',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'member',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ApplicationApproved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'index',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'member',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ApplicationSubmitted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'index',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'member',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'MemberAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'index',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'member',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'MemberRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'index',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'metadataCID',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'voting',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'UnionCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'member',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'metadataCID',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'UserMetadataUpdated',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_index', internalType: 'uint256', type: 'uint256' },
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_identity', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addAdmin',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_index', internalType: 'uint256', type: 'uint256' },
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_identity', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addMember',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_index', internalType: 'uint256', type: 'uint256' },
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_isAdmin', internalType: 'bool', type: 'bool' },
    ],
    name: 'approveApplication',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_unionMetadataCID', internalType: 'string', type: 'string' },
      { name: '_ownerMetadataCID', internalType: 'string', type: 'string' },
      { name: '_identity', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createUnion',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_index', internalType: 'uint256', type: 'uint256' }],
    name: 'getUnionMetadata',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_index', internalType: 'uint256', type: 'uint256' },
      { name: '_address', internalType: 'address', type: 'address' },
    ],
    name: 'isAdmin',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_index', internalType: 'uint256', type: 'uint256' },
      { name: '_address', internalType: 'address', type: 'address' },
    ],
    name: 'isMember',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_index', internalType: 'uint256', type: 'uint256' },
      { name: '_identity', internalType: 'uint256', type: 'uint256' },
      { name: '_metadataCID', internalType: 'string', type: 'string' },
    ],
    name: 'submitApplication',
    outputs: [],
  },
] as const
