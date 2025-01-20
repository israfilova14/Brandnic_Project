import React, { useEffect, useState } from 'react';
import '../view_product_by_category_and_filter/style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../../helpers/ProductCategory';
import SummaryApi from '../../common';
import VerticalProductCartModel from '../vertical_product_cart_model';
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

const ViewProductByCategoryAndFilter = () => {
    const [data, setData] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListInArray = urlSearch.getAll("category");
    const urlCategoryListObject = {};

    urlCategoryListInArray.forEach((element) => {
        urlCategoryListObject[element] = true;
    });

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);
    const [sortBy, setSortBy] = useState("");

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                category: filterCategoryList,
            }),
        });
        const dataResponse = await response.json();
        setLoading(false);
        setData(dataResponse?.data || []);
    };

    const handleSelectCategory = (e) => {
        const { name, value, checked } = e.target;
        setSelectCategory((prev) => {
            return {
                ...prev,
                [value]: checked,
            };
        });
    };

    useEffect(() => {
        fetchData();
        const handleResize = () => {
            if (window.innerWidth < 540) {
                setIsSmallScreen(true);
            } else {
                setIsSmallScreen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [filterCategoryList]);

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).map((categoryKeyName) => {
            if (selectCategory[categoryKeyName]) {
                return categoryKeyName;
            }
            return null;
        }).filter((element) => element);
        setFilterCategoryList(arrayOfCategory);

        // Correct URL query formatting
        const urlFormat = arrayOfCategory.map((el, index) => {
            return `category=${el}`;
        });
        navigate("/product-category?" + urlFormat.join("&&"));
    }, [selectCategory]);

    const handleOnChangeSortByPrice = (e) => {
        const { value } = e.target;
        setSortBy(value);
        let sortedData = [...data];
        if (value === "asc") {
            sortedData.sort((a, b) => a?.sellingPrice - b?.sellingPrice);
        }
        if (value === "dsc") {
            sortedData.sort((a, b) => b?.sellingPrice - a?.sellingPrice);
        }
        setData(sortedData);
    };

    const handleOnChangeSortByTitle = (e) => {
        const { value } = e.target;
        setSortBy(value);

        let sortedData = [...data];
        if (value === "nameAsc") {
            sortedData.sort((a, b) => a?.productName.localeCompare(b?.productName));
        }
        if (value === "nameDsc") {
            sortedData.sort((a, b) => b?.productName.localeCompare(a?.productName));
        }
        setData(sortedData);
    };

    return (
        <div className="productCategoryPageWrapper">
            <div className="container">
                {/* left side */}
                <div className="sidebarWrapper">
                    <div className="titleBox">
                        <h3>Sort by</h3>
                    </div>
                    <div className="formBox">
                        <form>
                            <div className="row">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    checked={sortBy === "asc"}
                                    value={"asc"}
                                    onChange={handleOnChangeSortByPrice}
                                />
                                <label>{!isSmallScreen ? "Price - Low to High" : <FaArrowUp />}</label>
                            </div>
                            <div className="row">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    checked={sortBy === "dsc"}
                                    value={"dsc"}
                                    onChange={handleOnChangeSortByPrice}
                                />
                                <label>{!isSmallScreen ? "Price - High to Low" : <FaArrowDown />}</label>
                            </div>
                            <div className="row">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    checked={sortBy === "nameAsc"}
                                    value={"nameAsc"}
                                    onChange={handleOnChangeSortByTitle}
                                />
                                <label>{!isSmallScreen ? "Alphabetical Order - A to Z" : "A to Z"}</label>
                            </div>
                            <div className="row">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    checked={sortBy === "nameDsc"}
                                    value={"nameDsc"}
                                    onChange={handleOnChangeSortByTitle}
                                />
                                <label>{!isSmallScreen ? "Alphabetical Order - Z to A" : "Z to A"}</label>
                            </div>
                        </form>
                    </div>
                    <div className="titleBox">
                        <h3>Category</h3>
                    </div>
                    <div className="formBox">
                        <form>
                            {productCategory.map((categoryName, index) => {
                                return (
                                    <div className="row" key={index}>
                                        <input
                                            type="checkbox"
                                            name={"category"}
                                            checked={selectCategory[categoryName?.value]}
                                            id={categoryName.value}
                                            value={categoryName?.value}
                                            onChange={handleSelectCategory}
                                        />
                                        <label htmlFor={categoryName.value}>{categoryName?.label}</label>
                                    </div>
                                );
                            })}
                        </form>
                    </div>
                </div>
                {/* right side */}
                <div className="displayProductBox">
                    {!loading && (
                        <div className="searchResultBox">
                            <p className="searchResult">Search Results: {data?.length}</p>
                        </div>
                    )}
                    <div>
                        <VerticalProductCartModel loading={loading} data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProductByCategoryAndFilter;
