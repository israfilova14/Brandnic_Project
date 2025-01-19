import React, { useContext, useState } from 'react';
import '../header/style.css';
import logo from '../../../assets/images/logo.png';
import { GoSearch } from "react-icons/go";
import { FaRegUser } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../../../common';
import { toast } from 'react-toastify';
import { logout } from '../../../store/slices/userSlice';
import ROLE from '../../../common/role';
import Context from '../../../context';
import { GrFavorite } from "react-icons/gr";

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery);

  console.log("user header", user);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();
    console.log("header data", data);

    if (data.success) {
      toast.success(data.message);
      dispatch(logout());
      navigate("/")
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  console.log("header add to cart count", context);

  const handleSearch = (e) => {
    const { value } = e.target;   // Destructure value from the event
    setSearch(value);             // Set the search state
    if (value) {
      navigate(`/search?q=${value}`);  // Navigate to search page with query
    } else {
      navigate("/search");  // Navigate to general search page
    }
  };

  return (
    <div className='headerWrapper'>
      <header>
        <div className='container'>
          <div className='logoWrapper'>
            <Link to={'/'}>
              <img src={logo} />
              <h2>Brandnic<span>.</span></h2>
            </Link>
          </div>
          <div className='searchBoxWrapper'>
            <div className='searchBox'>
              <input
                type='text'
                placeholder='Search product here...'
                value={search}
                onChange={handleSearch}  // Handle search input
              />
              <GoSearch />
            </div>
          </div>
          <div className='iconsBox '>
            <div className='group'>
              {user && (
                <div>
                  {user?.profilePic ? (
                    <img src={user?.profilePic} className='profilePicture' />
                  ) : (
                    <div className='box user-box'>
                      <FaRegUser onClick={() => setMenuDisplay(!menuDisplay)} />
                    </div>
                  )}
                </div>
              )}
              {menuDisplay && (
                <div className='pop_up'>
                  <nav>
                    {user?.role === ROLE.ADMIN && (
                      <Link to={'/admin-panel/all-products'}>Admin Panel</Link>
                    )}
                    <Link to={'/order'}>Order</Link>
                  </nav>
                </div>
              )}
            </div>
            {
               (
                 (user) && (
                  <Link to={"/favorite"} className='favorite-box box'>
                     <GrFavorite/>
                  </Link>
                 )
               )
            }
            {
              (
                user) && (
                  <Link to={"/basket"} className='basket-box box'>
                    <BsCart2 />
                    <span>{context?.basketProductCount}</span>
                  </Link>
               )
            }
            <div className='buttons-box'>
              {
                user 
                ? 
                  (
                    <button onClick={handleLogout} className='logoutBtn'>Logout</button>
                  ) 
                : 
                  (
                      <Link to={'/login'}>
                        <button className='loginBtn'>Login</button>
                      </Link>
                  )
              }
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;