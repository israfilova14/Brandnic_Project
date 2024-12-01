const express = require('express');
const router = express.Router();

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
const searchProductController = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');
const removeUserController = require('../controller/user/removeUser');
const removeProductController = require('../controller/product/removeProduct');
const addToBasketController = require('../controller/user/user_basket/addToBasketController');
const countBasketProductCart = require('../controller/user/user_basket/countBasketProductCart');
const addToBasketViewProduct = require('../controller/user/user_basket/addToBasketViewProduct');
const updateBasketProductCart = require('../controller/user/user_basket/updateBasketProductCart');
const deleteBasketProductCart = require('../controller/user/user_basket/deleteBasketProductCart');
const addToFavoriteController = require('../controller/user/user_favorite/addToFavoriteController');
const addToFavoriteViewProduct = require('../controller/user/user_favorite/addToFavoriteViewProduct');
const deleteFavoriteProductCart = require('../controller/user/user_favorite/deleteFavoriteProductCart');
const countFavoriteProduct = require('../controller/user/user_favorite/countFavoriteProductCart');
const paymentController = require('../controller/order/paymentController');
const webhooks = require('../controller/order/webhook');
const orderController = require('../controller/order/orderController');
const allOrdersController = require('../controller/order/allOrdersController');

// users 
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken ,userDetailController);
router.get("/userLogout", userLogout);
router.post("/delete-user", authToken, removeUserController);

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
router.post("/filter-product", filterProductController);
router.post("/delete-product", authToken, removeProductController);

// user add to basket
router.post("/add-to-basket", authToken, addToBasketController);
router.get("/count-basket-product", authToken, countBasketProductCart);
router.get("/view-basket-product",authToken, addToBasketViewProduct);
router.post("/update-basket-product" ,authToken, updateBasketProductCart);
router.post("/delete-basket-product",authToken, deleteBasketProductCart);

// user add to favorite
router.post("/add-to-favorite", authToken, addToFavoriteController);
router.get("/view-favorite-product", authToken, addToFavoriteViewProduct);
router.post("/delete-favorite-product", authToken, deleteFavoriteProductCart);
router.get("/count-favorite-product", authToken, countFavoriteProduct);

// payment and order
router.post("/checkout", authToken, paymentController);
router.post("/webhook", webhooks); // api/webhook
router.get("/order-list", authToken, orderController);
router.get("/all-orders", authToken, allOrdersController);
module.exports = router