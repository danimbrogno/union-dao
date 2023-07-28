import React from 'react';

// Header Component
const Header = () => (
  <header>
    <h1>Union Name</h1>
    <h2>Union Logo</h2>
  </header>
);

// Description Component
const Description = () => (
  <div>
    <label>Description</label>
    <textarea />
  </div>
);

// Admins Component
const Admins = () => (
  <div>
    <h2>Admins</h2>
    <p>List of Admins</p>
    <button>Add</button>
  </div>
);

// Members Component
const Members = () => (
  <div>
    <h2>Members</h2>
    <p>List of members</p>
    <button>Add</button>
  </div>
);

// Main App Component
const AdminOnboard = () => (
  <div>
    <Header />
    <Description />
    <Admins />
    <Members />
  </div>
);

export default AdminOnboard;

