import React from 'react'
import logo from '../assets/rocky.jpeg'
import blank_image from '../assets/blank_image.jpg'
import styled from '@emotion/styled';

const UnionProfile = () => {
  const UnionProfile = styled.div`
  border: solid
  `

return (
  <UnionProfile>
    <h2>Union Profile</h2>
    <img src={logo} css={{width: '55px', height: '55px'}}  alt="Union Logo" />
    <br /> 
    <img src={blank_image} css={{align: 'left',width: '35px', height: '35px'}}  alt="blank" />

  </UnionProfile>
)};

// Members Component
const Members = () => (
  <div>
    <h2>Members</h2>
    {/* Replace this with actual list of members */}
    <button>Add</button>
  </div>
);

// Proposals Component
const Proposals = () => (
  <div>
    <h2>Proposals</h2>
    {/* Replace this with actual proposal form or data */}
    <img src="proposal_form_url" alt="Proposal Form" />
  </div>
);

// Status Component
const Status = () => (
  <div>
    <p>Active</p>
    <p>Vote</p>
    <p>Voted</p>
    <p>Concluded</p>
    <p>Pass</p>
    <p>Failed</p>
  </div>
);

// Main App Component
const AdminDash = () => (
  <div>
    <UnionProfile />
    <Members />
    <Proposals />
    <Status />
  </div>
);

export default AdminDash;

