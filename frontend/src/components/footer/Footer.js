import React from 'react'
import '../footer/Footer.css'
import { IoLogoFacebook } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { RxLinkedinLogo } from "react-icons/rx";
import { FaReddit } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className='footerWrapper'>
        <div className="container">
                <div className="titleBox">
                    <h2>Brandnic<span>.</span></h2>
                </div>
                <div className="linksBox">
                    <nav>
                        <ul>
                            <li>Home</li>
                            <li>List Layout</li>
                            <li>Half Map Layout</li>
                            <li>Grid Layout</li>
                            <li>Blog</li>
                            <li>Contact</li>
                        </ul>
                    </nav>
                </div>
                <div className="iconsBox">
                     <IoLogoFacebook/>
                     <FaInstagram/>
                     <FaTwitter/>
                     <RxLinkedinLogo/>
                     <FaReddit/>
                </div>
                <div className="aboutRight">
                    <FaRegCopyright/>
                    <p>Copyright. All rights reserved</p>
                </div>
            </div>
    </div>
  )
}

export default Footer