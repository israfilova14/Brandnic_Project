import React, { useEffect, useState } from 'react';
import '../all_users/style.css';
import SummaryApi from '../../../../common';
import { toast } from 'react-toastify';
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ChangeUserDetails from '../change_user_details';

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: ""
  });
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allUsers.url, {
        method: SummaryApi.allUsers.method,
        credentials: 'include'
      });
      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        // Assuming the user data is in dataResponse.data
        setAllUsers(dataResponse.data || []); // Fallback to an empty array if data is undefined
      } else if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Error fetching users.");
      console.error("Fetch error: ", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();

    // Function to check if screen height is below 670px
    const handleResize = () => {
      if (window.innerWidth <= 670) {
        setIsSmallScreen(true); // If height is less than or equal to 670px, set to true
      } else {
        setIsSmallScreen(false); // Otherwise, set to false
      }
    };

    // Add event listener for resizing window
    window.addEventListener('resize', handleResize);

    // Call once initially to check the screen height
    handleResize();

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(SummaryApi.deleteUser.url, {
        method: SummaryApi.deleteUser.method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: userId }),
        credentials: 'include'
      });

      const dataResponse = await response.json();
      if (dataResponse.success) {
        toast.success("User deleted successfully");
        setAllUsers(allUsers.filter(user => user._id !== userId));
      } else if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (err) {
      toast.error("Error deleting user.");
      console.error('Delete user', err);
    }
  };

  return (
    <div className='tableWrapper'>
      <div className='titleBox'>
        <h2>User <span>Management.</span></h2>
      </div>
      {
        !isSmallScreen ? // Only show table if screen height is greater than 670px
          (
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  Array.isArray(allUsers) && allUsers.length > 0 ? (
                    allUsers.map((element, index) => (
                      <tr key={element.id}>
                        <td>{index + 1}</td>
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        <td>{element.role}</td>
                        <td>{new Date(element.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className='actionsBox'>
                            <FaPen
                              className='edit_'
                              onClick={() => {
                                setUpdateUserDetails(element);
                                setOpenUpdateUser(true);
                              }}
                            />
                            <MdDelete
                              onClick={() => handleDeleteUser(element._id)}
                              className='delete_'
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No users found.</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          )
          :
          (
            <div>
              <div className='usersBox'>
              {
                  Array.isArray(allUsers) && allUsers.length > 0 ? (
                    allUsers.map((element, index) => (
                      <div key={element.id} className='userBox'>
                        <div>{index + 1}</div>
                        <div>{element.name}</div>
                        <div>{element.email}</div>
                        <div>{element.role}</div>
                        <div>{new Date(element.createdAt).toLocaleDateString()}</div>
                        <div>
                          <div className='actionsBox'>
                            <FaPen
                              className='edit_'
                              onClick={() => {
                                setUpdateUserDetails(element);
                                setOpenUpdateUser(true);
                              }}
                            />
                            <MdDelete
                              onClick={() => handleDeleteUser(element._id)}
                              className='delete_'
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      <div colSpan="6">No users found.</div>
                    </div>
                  )
                }
              </div>
            </div> // Optionally display a message
          )
      }

      {
        openUpdateUser && (
          <ChangeUserDetails
            openUpdateUser={openUpdateUser}
            setOpenUpdateUser={setOpenUpdateUser}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            callFunc={fetchAllUsers}
          />
        )
      }
    </div>
  );
}

export default AllUsers;
