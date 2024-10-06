import React, { useEffect } from 'react';
import '../admin_panel/AdminPanel.css';
import adminLogo from '../../assets/images/user.png';
import { useSelector } from 'react-redux';
import {Link, Outlet, useNavigate} from 'react-router-dom'
import ROLE from '../../common/role';

const AdminPanel = () => {
   const user = useSelector(state => state?.user?.user);
   const navigate = useNavigate();

   useEffect(() => {
        if(user?.role !== ROLE.ADMIN){
            navigate("/")
        }
   }, [user])
   return (
       <div className='adminPanelWrapper'>
           <aside>
               <div className='adminLogoWrapper'>
                   <img src={adminLogo} alt="Admin Logo" />
               </div>
               <div className='titlesBox'>
                    <p className='admin-title'>{user?.name}</p>
                    <p className='role'>{user?.role}</p>
               </div>
               <div className='navigationBox'>
                  <nav>
                     <Link to={"all-users"}>All Users</Link>
                     <Link to={'all-products'}>All Products</Link>
                  </nav>
               </div>
           </aside>
           <main>
               <Outlet/>
           </main>
       </div>
   );
};

export default AdminPanel;
