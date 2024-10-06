import React, { useEffect, useState } from 'react';
import '../all_products/AllProducts.css';
import UploadProduct from '../upload_product/UploadProduct';
import SummaryApi from '../../common';
import AdminProductCart from '../admin_product_card/AdminProductCart';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const productsPerPage = 12; // 12 products per page

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url, {
      method: "get",
      credentials: 'include'
    });
    const dataResponse = await response.json();
    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  // Get the current products for the selected page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProduct.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total number of pages
  const totalPages = Math.ceil(allProduct.length / productsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='allProductsWrapper'>
      <div className='headerWrapper'>
        <h2>All Products</h2>
        <button onClick={() => setOpenUploadProduct(true)}>
          Upload Products
        </button>
      </div>
      
      <div className='adminProductsWrapper' style={{ overflow: 'hidden' }}>
        {currentProducts.map((product, index) => (
          <AdminProductCart data={product} key={index + "allProduct"} fetchData={fetchAllProduct}/>
        ))}
      </div>

      <div className='paginationWrapper'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`paginationButton ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
      )}
    </div>
  );
}

export default AllProducts;
