import React, { useState } from 'react';
import '../change_userRole/ChangeUserRole.css';
import Role from '../../common/role';
import { IoCloseOutline } from "react-icons/io5";
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import { FaPencil } from "react-icons/fa6";
const ChangeUserRole = ({
  name,
  email,
  role,
  callFunc,
  userId,
  setOpenUpdateRole
}) => {
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [userRole, setUserRole] = useState(role);
  const [loading, setLoading] = useState(false); // Loading state

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  }

  const updateUserRole = async () => {
    setLoading(true); // Start loading
    try {
      const fetchResponse = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          name: userName,
          email: userEmail,
          role: userRole
        })
      });

      const responseData = await fetchResponse.json();

      if (responseData.success) {
        toast.success(responseData.message);
        callFunc(); // Call refresh function after success
      } else {
        toast.error(responseData.message || 'Failed to update user role');
      }
    } catch (error) {
      toast.error('An error occurred while updating the user role');
    } finally {
      setLoading(false); // Stop loading
    }
  }

  return (
    <div className='userRoleBox'>
      <div className='userRoleModal'>
        <div className='close_ ' onClick={() => setOpenUpdateRole(false)}>
          <IoCloseOutline />
        </div>
        <h2>Change User Role</h2>
        <div className='update_name row'>
              <p>Name: </p>
              <input
                type='text'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <FaPencil/>
        </div>
        <div className='update_email row'>
              <p>Email: </p>
              <input
                type='email'
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <FaPencil/>
        </div>
        <div className='col'>
          <p>Role:</p>
          <select value={userRole} onChange={handleOnChangeSelect}>
            {Object.values(Role).map((element) => (
              <option value={element} key={element} className='option'>
                {element}
              </option>
            ))}
          </select>
        </div>
        <button onClick={updateUserRole} disabled={loading}>
          {loading ? 'Updating...' : 'Change Role'}
        </button>
      </div>
    </div>
  );
}

export default ChangeUserRole;
