import { Outlet } from 'react-router-dom';
import './App.css';
 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useCallback, useState } from 'react';
import SummaryApi from './common';
import Context from './context'; // Ensure this is properly created elsewhere
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/slices/userSlice';
import Header from './components/layout/header';
import Footer from './components/layout/footer';

function App() {

  const dispatch = useDispatch();
  const [basketProductCount, setBasketProductCount] = useState(0);
  const [favoriteProductCount, setFavoriteProductCount] = useState(0);

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

  const fetchUserBasketProductCount = async () => {
    const { method, url } = SummaryApi.addToBasketProductCount;
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
        setBasketProductCount(dataApi.data.count); // Set the state with the actual count
      } else {
        console.error("Count is undefined in the response data");
      }
    } catch (error) {
      console.error("Error fetching cart product count:", error);
      console.error('Error Stack:', error.stack); // Log stack trace
    }
  }
  
  const fetchUserFavoriteProductCount = async() => {
     const {method, url} = SummaryApi.favoriteProductCount;
     console.log(`Fetching favorite product count from ${url} with method ${method}`);

     try{
       const response = await fetch(url, {
         method,
         credentials: 'include'
       })
       if(!response.ok){
        throw new Error(`Failed to fetch favorite product count: ${response.status} ${response.statusText}`);
       }

       const dataApi = await response.json();
       console.log("dataApi", dataApi);

       if(dataApi?.data?.count !== undefined){
          console.log(dataApi.data.count);
          setFavoriteProductCount(dataApi.data.count);
       }
       else{
          console.error("Count is undefined in the response data")
       }
     }catch(err){
         console.error("Error fetching favorite product count", err);
         console.error("Error Stack:", err.stack);
     }
  }

  useEffect(() => {
    fetchUserDetails();
    fetchUserBasketProductCount(); 
    fetchUserFavoriteProductCount();
  }, [fetchUserDetails]);

  return (
    <div className='App'>
    <Context.Provider value={{
      fetchUserDetails,
      basketProductCount,  // Current user add to cart product count
      fetchUserBasketProductCount,
      favoriteProductCount,
      fetchUserFavoriteProductCount
    }}>
      <ToastContainer />
      <Header/>
      <main>
        <Outlet />
      </main>
      <Footer/>
    </Context.Provider>
    </div>
  );
}

export default App;
