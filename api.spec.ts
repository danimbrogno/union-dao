const user = {
  id: '0x',
  metadata: {
    name: 'John Doe',
    jobTitle: 'Software Engineer',
  },
  roles: [
    {
      isMember: true,
      isAdmin: false,
      membershipCard: {
        address: '0x',
        tokenId: 5,
        image: {
          data: '',
          mimeType: '',
        },
      },
      union: {
        id: '0x',
        metadata: {
          name: 'Union',
          description: 'Union description',
          logo: {
            data: '',
            mimeType: '',
          },
        },
      },
    },
  ],
};

const union = {
  id: '0x',
  metadata: {
    name: 'Union',
    description: 'Union description',
    logo: {
      data: '',
      mimeType: '',
    },
  },
  proposals: {
    id: '0x',
    metadata: {
      title: 'Proposal title',
    },
    seconded: false,
  },
  users: [
    {
      isMember: true,
      isAdmin: false,
      user: {
        id: '',
        metadata: {
          name: '',
        },
      },
    },
  ],
  pendingUsers: [
    {
      user: {
        id: '',
        metadata: {
          name: '',
        },
      },
    },
  ],
};

const proposal = {
  id: '0x',
  title: 'Proposal title',
  seconded: false,
  createdBlock: 1234,
  endsOnBlock: 5678,
  quorumPercent: 0.5,
  numOptions: 2,
  metadata: {
    description: '',
    options: [
      {
        id: '',
        description: 'In Favor',
        votes: 5,
      },
      {
        id: '',
        description: 'Against',
        votes: 20,
      },
    ],
  },
};
