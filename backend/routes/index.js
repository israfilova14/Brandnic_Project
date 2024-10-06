const express = require('express');
//USERS
const userSignUpController = require('../controller/user/userSignUp');
const userSignInController = require('../controller/user/userSignIn');
const userDetailController = require('../controller/user/userDetail');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');

// PRODUCTS
const uploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');

const authToken = require('../middleware/authToken');
const getCategoryProduct = require('../controller/product/getCategoryProduct');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCartController');
const countAddToCartProduct = require('../controller/user/countAddToCartProduct');
const addToCartViewProduct = require('../controller/user/addToCartViewProduct');
const updateAddToCartProductController = require('../controller/user/updateAddToCartProduct');
const deleteAddToCartProductController = require('../controller/user/deleteAddToCartProduct');
const searchProductController = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');
const router = express.Router();

// users 
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken ,userDetailController);
router.get("/userLogout", userLogout);

//admin panel
router.get("/all-users", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

// product
router.post("/upload-product", authToken, uploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProductController);
router.post("/filter-product", filterProductController)

// user add to cart
router.post("/addtocart", authToken, addToCartController);
router.get("/counAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-card-product",authToken, addToCartViewProduct);
router.post("/update-cart-product" ,authToken, updateAddToCartProductController);
router.post("/delete-card-product",authToken, deleteAddToCartProductController)
module.exports = router