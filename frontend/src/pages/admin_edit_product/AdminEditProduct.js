import React, { useState } from 'react';
import "../admin_edit_product/AdminEditProduct.css";
import { IoCloseOutline } from "react-icons/io5";
import productCategory from '../../helpers/ProductCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadImage from '../../helpers/UploadImage';
import DisplayImage from '../display_image/DisplayImage';
import { MdDeleteOutline } from "react-icons/md";
import SummaryApi from '../../common';
import { toast } from "react-toastify";

const AdminEditProduct = ({
  onClose,
  productData,
  fetchData
}) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await UploadImage(file);
    console.log('upload image', uploadImageCloudinary.url);

    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url]
    }));
  };

  const handleDeleteProductImage = (index) => {
    console.log("image index", index);
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: newProductImage
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Manual validation to ensure an image is uploaded
    if (!data.productImage.length) {
      toast.error("Please upload at least one product image.");
      return;  // Stop form submission
    }

    console.log("data", data);
    const dataResponse = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data)
    });
    const responseData = await dataResponse.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData()
    } else if (responseData.error) {
      toast.error(responseData?.error);
    }
  };

  return (
    <div className='uploadProductWrapper'>
      <div className='uploadBox'>
        <div className='uploadBoxHeader'>
          <h2>Edit Product</h2>
          <IoCloseOutline onClick={onClose} />
        </div>
        <div className='formWrapper'>
          <form onSubmit={handleSubmit} noValidate> {/* noValidate added */}
            <div className='row'>
              <label htmlFor='productName'>Product Name:</label>
              <input
                type='text'
                id='productName'
                placeholder='Enter product name...'
                name='productName'
                value={data.productName}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className='row'>
              <label htmlFor='brandName'>Brand Name:</label>
              <input
                type='text'
                id='brandName'
                placeholder='Enter brand name...'
                name='brandName'
                value={data.brandName}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className='row'>
              <label htmlFor='category'>Category:</label>
              <select
                name='category'
                value={data?.category}
                onChange={handleOnChange}
                required
              >
                <option value={""}>Select Category</option>
                {productCategory.map((element, index) => (
                  <option
                    value={element.value}
                    key={element.value + index}
                  >
                    {element.label}
                  </option>
                ))}
              </select>
            </div>
            <div className='row'>
              <label className='productImage'>Product Image:</label>
              <label className='uploadImageInput'>
                <div className='uploadContent'>
                  <div className='cloud_box'>
                    <FaCloudUploadAlt />
                    <p>Upload Product Image</p>
                    <input
                      type='file'
                      id='uploadImageInput'
                      name='productImage'  // name attribute added
                      onChange={handleUploadProduct}
                    />
                  </div>
                </div>
              </label>
              <div>
                {data?.productImage[0] ? (
                  <div className='imgWrapper'>
                    {data.productImage.map((element, index) => (
                      <div className='dataImgBox' key={index}>
                        <img
                          src={element}
                          alt='product image'
                          onClick={() => {
                            setOpenFullScreenImage(true);
                            setFullScreenImage(element);
                          }}
                        />
                        <MdDeleteOutline
                          className='delIcon'
                          onClick={() => handleDeleteProductImage(index)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className='message'>*Please upload product image</p>
                )}
              </div>
            </div>
            <div className='row'>
              <label>Prcie:</label>
              <input
                type='number'
                id='price'
                placeholder='Enter product price...'
                name='price'
                value={data.price}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className='row'>
              <label htmlFor='sellingPrice'>Selling Price:</label>
              <input
                type='number'
                id='sellingPrice'
                placeholder='Enter selling price...'
                name='sellingPrice'
                value={data.sellingPrice}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className='row'>
              <label htmlFor='productDescription'>Description:</label>
              <textarea
                placeholder='Enter product description...'
                onChange={handleOnChange}
                name='description'
                value={data.description}
              />
            </div>
            <button type='submit' className='uploadBtn'>Update Product</button>
          </form>
        </div>
        {/* Display Image Full Screen */}
        {openFullScreenImage && (
          <DisplayImage
            onClose={() => setOpenFullScreenImage(false)}
            imgUrl={fullScreenImage}
          />
        )}
      </div>
    </div>
  );
}

export default AdminEditProduct;
