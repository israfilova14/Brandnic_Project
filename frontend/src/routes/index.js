import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import ForgotPassword from "../pages/forgot_password/ForgotPassword";
import SignUp from "../pages/sign_up/SignUp";
import AdminPanel from "../pages/admin_panel/AdminPanel";
import AllUsers from "../pages/all_users/AllUsers";
import AllProducts from "../pages/all_products/AllProducts";
import ProductCategoryPage from "../pages/product_category_page/ProductCategoryPage";
import ProductDetail from "../pages/product_detail/ProductDetail";
import Cart from "../pages/cart/Cart";
import SearchProduct from "../pages/search_product/SearchProduct";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword/>
            },
            {
                path: "/sign-up",
                element: <SignUp/>
            },
            {
                path: "/product-category",
                element: <ProductCategoryPage/>
            },
            {
                path: "/product/:id",
                element: <ProductDetail/>
            },
            {
                path: "cart",
                element: <Cart/>
            },
            {
                path: "search",
                element: <SearchProduct/>
            },
            {
                path: "admin-panel",
                element: <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element: <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/> 
                    }
                ]
            },
            
        ]
    }
])
export default router