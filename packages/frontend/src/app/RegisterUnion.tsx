import styled from '@emotion/styled';

const RegisterUnion = () => {
  const [unionName, setUnionName] = useState('');
  const [description, setDescription] = useState('');
  const [admins, setAdmins] = useState([]);
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [tempAdmin, setTempAdmin] = useState('');

  const [members, setMembers] = useState([]);
  const [showMemberInput, setShowMemberInput] = useState(false);
  const [tempMember, setTempMember] = useState('');

  const [thumbnail, setThumbnail] = useState(null);
  const handleAdminConfirm = () => {
    setAdmins(prevAdmins => [...prevAdmins, tempAdmin]);
    setTempAdmin('');
    setShowAdminInput(false);
  };

  const handleMemberConfirm = () => {
    setMembers(prevMembers => [...prevMembers, tempMember]);
    setTempMember('');
    setShowMemberInput(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Trigger API post request with the form data
    // For example: axios.post('/api/endpoint', { unionName, description, admins, members, thumbnail });
  };


  return (
      <>
      <p> Set Up Your Union </p>

      {/* upload logo image-link */}

      <form onSubmit={handleSubmit}>
      <label>
      Union Name:
      <input type="text" value={unionName} onChange={e => setUnionName(e.target.value)} />
      </label>

      <label>
      Description:
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
      </label>

      <div>
      Admins:
      {admins.map(admin => <p key={admin}>{admin}</p>)}
      <button onClick={() => setShowAdminInput(true)}>Add Admin</button>
      {showAdminInput && (
          <div>
          <input type="text" value={tempAdmin} onChange={e => setTempAdmin(e.target.value)} />
          <button onClick={handleAdminConfirm}>Confirm</button>
          <button onClick={() => setShowAdminInput(false)}>Cancel</button>
          </div>
          )}
      </div>

        <div>
        Members:
        {members.map(member => <p key={member}>{member}</p>)}
      <button onClick={() => setShowMemberInput(true)}>Add Member</button>
      {showMemberInput && (
          <div>
          <input type="text" value={tempMember} onChange={e => setTempMember(e.target.value)} />
          <button onClick={handleMemberConfirm}>Confirm</button>
          <button onClick={() => setShowMemberInput(false)}>Cancel</button>
          </div>
          )}
      </div>

        <button type="submit">Submit</button>
        </form>
        </> 
        );

}
export default RegisterUnion 
