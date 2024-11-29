
const backendDomen = "http://localhost:8008"

const SummaryApi = {
    signUp : {
        url: `${backendDomen}/api/signup`,
        method : "post",
    },
    signIn : {
        url: `${backendDomen}/api/signin`,
        method : "post"
    },
    current_user: {
         url: `${backendDomen}/api/user-details`,
         method : "get"
    },
    logout_user : {
        url: `${backendDomen}/api/userLogout`,
        method: "get"
    },
    allUsers: {
        url : `${backendDomen}/api/all-users`,
        method : "get"
    },
    updateUser: {
        url : `${backendDomen}/api/update-user`,
        method : "post"
    },
    uploadProduct: {
        url: `${backendDomen}/api/upload-product`,
        method: "post"
    },
    allProduct:{
        url: `${backendDomen}/api/get-product`,
        method: "get"
    },
    updateProduct: {
        url: `${backendDomen}/api/update-product`,
        method: "post"
    },
    categoryProduct: {
        url: `${backendDomen}/api/get-categoryProduct`,
        method: "get"
    },
    categoryWiseProduct: {
        url: `${backendDomen}/api/category-product`,
        method: "post"
    },
    productDetails: {
        url: `${backendDomen}/api/product-details`,
        method: "post"
    },
    addToBasketProduct: {
        url: `${backendDomen}/api/add-to-basket`,
        method: "post"
    },
    addToBasketProductCount : {
        url: `${backendDomen}/api/count-basket-product`,
        method: "get"
    },
    addToBasketProductView : {
        url: `${backendDomen}/api/view-basket-product`,
        method: "get"
    },
    updateBasketProduct : {
         url: `${backendDomen}/api/update-basket-product`,
         method: "post"
    },
    deleteBasketProduct : {
        url: `${backendDomen}/api/delete-basket-product`,
        method: "post"
    },
    addToFavoriteProduct: {
        url: `${backendDomen}/api/add-to-favorite`,
        method: "post"
    },
    addToFavoriteProductView: {
        url: `${backendDomen}/api/view-favorite-product`,
        method: "get"
    },
    deleteFavoriteProduct: {
        url: `${backendDomen}/api/delete-favorite-product`,
        method: "post"
    },
    favoriteProductCount: {
        url: `${backendDomen}/api/count-favorite-product`,
        method: "get"
    },
    searchProduct : {
        url: `${backendDomen}/api/search`,
        method: "get"
    },
    filterProduct : {
        url: `${backendDomen}/api/filter-product`,
        method: "post"
    },
    deleteUser: {
        url: `${backendDomen}/api/delete-user`,
        method: "post"
    },
    deleteProduct: {
        url: `${backendDomen}/api/delete-product`,
        method: "post"
    },
    payment: {
        url: `${backendDomen}/api/checkout`,
        method: "post"
    },
    getOrder: {
       url: `${backendDomen}/api/order-list`,
       method: "get"
    }
}

export default SummaryApi