import React, { useState, useRef } from 'react';
import '../sign_up/style.css';
import userIcon from '../../assets/images/user.png';
import { FaRegEye } from "react-icons/fa";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { IoMdClose } from "react-icons/io";
import ImageToBase64 from '../../helpers/ImageToBase64'
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
 
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPasssword] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: localStorage.getItem('profilePic') || ""
    });

    const navigate = useNavigate();

    const [open, setOpen] = useState(false); // Modal open/close state
    const fileInputRef = useRef(null); // Reference for file input

    const handleOpen = () => setOpen(true); // Open modal
    const handleClose = () => setOpen(false); // Close modal

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle profile picture upload
    const handleUploadPicture = async (e) => {
        const file = e.target.files[0]; // ilk yüklənən faylı almaq üçün istifadə olunur
        if (file) {
            const imagePic = await ImageToBase64(file);
            setData((prev) => ({
                ...prev,
                profilePic: imagePic,
            }));
            localStorage.setItem('profilePic', imagePic);
        }
    };

    // Handle profile picture deletion
    const handleDeleteProfile = () => {
        setData((prev) => ({
            ...prev,
            profilePic: "",
        }));
        localStorage.removeItem('profilePic');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(data.password === data.confirmPassword) {
            const dataResponse = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });
    
            const result = await dataResponse.json();   
            if(result.success){
                toast.success(result.message);
                navigate("/login")
            }
            if(result.error){
                toast.error(result.message)
            }
        } else {
            console.log("Please check password and confirm password");
        }
    };
    

    return (
        <div className='signUpWrapper'>
            <section id='signup'>
                <div className='container'>
                    <div className='titleBox'>
                        <h2>Sign Up</h2>
                    </div>
                    <div className='loginIconBox'>
                        <div onClick={handleOpen}>
                            <img src={data.profilePic || userIcon} alt="Profile" />
                        </div>
                        <Button>
                            <Modal
                                open={open} 
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style} className='relative'>
                                    <div className='modalContent'>
                                        <div onClick={handleClose} className='close_ absolute top-0 right-0 p-2'>
                                            <IoMdClose />
                                        </div>
                                        <div>
                                            <div className='spanBox cursor-pointer' onClick={() => fileInputRef.current.click()}>
                                                <span className='text-blue-800 px-5 py-2'>Upload profile</span>
                                            </div>
                                            <input
                                                type='file'
                                                ref={fileInputRef}
                                                className='hidden'
                                                onChange={handleUploadPicture}
                                            />
                                        </div>
                                        <div className='btnBox'>
                                            <button
                                                className='text-purple-800 px-5 py-3'
                                                onClick={handleDeleteProfile}
                                            >
                                                Delete profile
                                            </button>
                                        </div>
                                    </div>
                                </Box>
                            </Modal>
                        </Button>
                    </div>
                    <div className='formBox'>
                        <form onSubmit={handleSubmit}>
                            <div className='colWrapper'>
                                <div className='col col-1'>
                                    <div className='row'>
                                        <label htmlFor="name">Username:</label>
                                        <div className='input-box'>
                                            <input
                                                type="text"
                                                name='name'
                                                value={data.name}
                                                required
                                                placeholder='Enter your name...'
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <label htmlFor="email">Email:</label>
                                        <div className='input-box'>
                                            <input
                                                type="email"
                                                name='email'
                                                value={data.email}
                                                required
                                                placeholder='Enter your email...'
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='row'>
                                        <label htmlFor="password">Password:</label>
                                        <div
                                            className='input-box'
                                            onClick={() => setShowPassword((prev) => !prev)}
                                        >
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder='Enter your password...'
                                                onChange={handleOnChange}
                                                required
                                                name='password'
                                                value={data.password}
                                            />
                                            {showPassword ? <IoEyeOffOutline /> : <FaRegEye />}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <label htmlFor="confirmPassword">Confirm Password:</label>
                                        <div
                                            className='input-box'
                                            onClick={() => setShowConfirmPasssword((prev) => !prev)}
                                        >
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder='Confirm your password...'
                                                onChange={handleOnChange}
                                                required
                                                name='confirmPassword'
                                                value={data.confirmPassword}
                                            />
                                            {showConfirmPassword ? <IoEyeOffOutline /> : <FaRegEye />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='btnBox'>
                                <button type='submit'>Sign Up</button>
                            </div>
                        </form>
                        <div className='aboutAccount'>
                            <p>Already have an account? <Link to={'/login'}>Login</Link></p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SignUp;
