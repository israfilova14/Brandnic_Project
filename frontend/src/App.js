import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useCallback, useState } from 'react';
import SummaryApi from './common';
import Context from './context'; // Ensure this is properly created elsewhere
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/slices/userSlice';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  // Function to fetch user details
  const fetchUserDetails = useCallback(async () => {
    const { method, url } = SummaryApi.current_user;
    console.log(`Fetching user details from ${url} with method ${method}`);

    try {
      const response = await fetch(url, {
        method,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user details: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success) {
        dispatch(setUserDetails(data.data));
      }
      console.log('User data:', data);
    } catch (error) {
      console.error('Error fetching user details:', error);
      console.error('Error Stack:', error.stack); // Log stack trace
    }
  }, [dispatch]);

  const fetchUserAddToCart = async () => {
    const { method, url } = SummaryApi.addToCartProductCount;
    console.log(`Fetching cart product count from ${url} with method ${method}`);

    try {
      const response = await fetch(url, {
        method,
        credentials: 'include',
      });

      // Ensure the response is OK
      if (!response.ok) {
        throw new Error(`Failed to fetch cart product count: ${response.status} ${response.statusText}`);
      }

      const dataApi = await response.json(); // Await here to get the actual data
      console.log("dataApi", dataApi);
      
      // Check if dataApi is structured correctly
      if (dataApi?.data?.count !== undefined) {
        console.log(dataApi?.data?.count);
        setCartProductCount(dataApi.data.count); // Set the state with the actual count
      } else {
        console.error("Count is undefined in the response data");
      }
    } catch (error) {
      console.error("Error fetching cart product count:", error);
      console.error('Error Stack:', error.stack); // Log stack trace
    }
  }

  useEffect(() => {
    // Fetch user details on mount
    fetchUserDetails();
    // Fetch addToCart
    fetchUserAddToCart();
  }, [fetchUserDetails]);

  return (
    <div className='App'>
    <Context.Provider value={{
      fetchUserDetails,
      cartProductCount,  // Current user add to cart product count
      fetchUserAddToCart 
    }}>
      <ToastContainer />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Context.Provider>
    </div>
  );
}

export default App;
