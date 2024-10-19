
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
    addToCartProduct: {
        url: `${backendDomen}/api/addtocart`,
        method: "post"
    },
    addToCartProductCount : {
        url: `${backendDomen}/api/counAddToCartProduct`,
        method: "get"
    },
    addToCartProductView : {
        url: `${backendDomen}/api/view-card-product`,
        method: "get"
    },
    updateCartProduct : {
         url: `${backendDomen}/api/update-cart-product`,
         method: "post"
    },
    deleteCartProduct : {
        url: `${backendDomen}/api/delete-card-product`,
        method: "post"
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
    }
}

export default SummaryApi