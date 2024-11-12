import React, { useEffect, useRef, useState } from 'react';
import '../banner_product/style.css';
import Slider from "react-slick";

const BannerProduct = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        initialState: 0
    };

    const sliderRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % 4);  // Assuming you have 4 slides
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [loading]);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(currentSlide);  // Imperatively move the slider
        }
    }, [currentSlide]);

    return (
        <div className='bannerProductWrapper'>
            {
                loading ? (
                    <div className='container'>
                        <Slider ref={sliderRef} {...settings}>
                            <div className='banner1 background'></div>
                            <div className='banner2 background'></div>
                            <div className='banner3 background'></div>
                            <div className='banner4 background'></div>
                            <div className='banner5 background'></div>
                        </Slider>
                    </div>
                ) : (
                    <div className='loadingBox'></div>
                )
            }
        </div>
    );
}

export default BannerProduct;
