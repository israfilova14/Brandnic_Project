import React, { useContext, useState } from 'react';
import '../login/Login.css';
import userIcon from '../../assets/images/user.png';
import { FaRegEye } from "react-icons/fa";
import { IoEyeOffOutline } from "react-icons/io5";
import {Link, useNavigate} from 'react-router-dom';
import SummaryApi from '../../common';
import {toast} from 'react-toastify';
import Context from '../../context';

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate();
  const {fetchUserDetails, fetchUserAddToCart} = useContext(Context);
  
  const handleOnChange = (e) => {
      const {name, value} = e.target;

      setData((prev) => {
        return{
            ...prev,
            [name] : value,
        }
      })
  }

  const handleSubmit = async(e) => {
      e.preventDefault();
      const dataResponse = await fetch(SummaryApi.signIn.url, {
        method : SummaryApi.signIn.method,
        credentials : "include",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })

      const dataApi = await dataResponse.json();
      if(dataApi.success){
          toast.success(dataApi.message);
          navigate("/");
          fetchUserDetails()
          fetchUserAddToCart()
      }
      if(dataApi.error){
        toast.error(dataApi.message)
      }
  }

  return (
    <div className='loginWrapper'>
         <section id='login'>
             <div className='container'>
                <div className='titleBox'>
                    <h2>Login</h2>
                </div>
                <div className='loginIconBox'>
                    <img src={userIcon} alt="login image" />
                </div>
             <div className='formBox'>
                 <form action="" onSubmit={handleSubmit}>
                    <div className='row'>
                        <label htmlFor="">Email:</label>
                        <div className='input-box'>
                             <input 
                                  type="email" 
                                  name='email'
                                  value={data.email}
                                  placeholder='Enter your email...'
                                  onChange={handleOnChange}
                              />
                        </div>
                    </div>
                    <div className='row'>
                        <label htmlFor="">Password:</label>
                        <div 
                             className='input-box'
                             onClick={() => setShowPassword((prev) => !prev)}
                        >
                             <input 
                                   type={showPassword ? "text" : "password"} 
                                   placeholder='Enter your password...'
                                   onChange={handleOnChange}
                                   name='password'
                                   value={data.password}
                             />
                             {
                                showPassword 
                                ? 
                                (
                                    <IoEyeOffOutline/>
                                ) 
                                : 
                                (
                                    <FaRegEye/>
                                )
                             }
                        </div>
                        <div className='link-box'>
                            <Link to={'/forgot-password'}>
                               <p>Forgot password ?</p>
                            </Link>
                        </div>
                    </div>
                    <div className='row'>
                        <button>Login</button>
                    </div>
                 </form>
                 <div className='aboutAccount'>
                    <p>Don't have an account ? <Link to={'/sign-up'}>Sign Up</Link></p>
                 </div>
                 </div>
             </div>
         </section>
    </div>
  )
}

export default Login