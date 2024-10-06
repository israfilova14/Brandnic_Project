import React, { useEffect, useState } from 'react'
import '../all_users/AllUsers.css'
import SummaryApi from '../../common';
import {toast} from 'react-toastify';
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import ChangeUserRole from '../change_userRole/ChangeUserRole';
import "../admin_panel/AdminPanel.css"
const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name : "",
    role : "",
    _id: ""
  })
  const fetchAllUsers = async() => {
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
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className='tableWrapper'>
      <div className='titleBox'>
          <h2>User <span>Management.</span></h2>
      </div>
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
                        <PiPencilSimpleLineLight
                        className='edit_'
                           onClick={() => {
                            setUpdateUserDetails(element)
                            setOpenUpdateRole(true)
                          }
                          }
                        />
                        <MdDeleteOutline className='delete_'/>
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
      {
        openUpdateRole && (
          <ChangeUserRole 
              openUpdateRole={openUpdateRole} 
              setOpenUpdateRole={setOpenUpdateRole}
              name={updateUserDetails.name}
              email={updateUserDetails.email}
              role={updateUserDetails.role}
              userId={updateUserDetails._id}
              callFunc={fetchAllUsers}
          />
        )
      }
    </div>
  )
}

export default AllUsers;
