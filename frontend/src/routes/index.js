import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import ForgotPassword from "../pages/forgot_password";
import SignUp from "../pages/sign_up";
import ProductCategoryPage from "../pages/view_product_by_category_and_filter";
import ProductDetail from "../pages/product_detail";
import SearchProduct from "../pages/search_product";
import Basket from "../pages/user_collections/basket";
import Favorite from "../pages/user_collections/favorite";
import SignIn from "../pages/sign_in";
import AdminPanel from "../pages/admin/admin_panel";
import AllProducts from "../pages/admin/admin_products/all_products";
import AllUsers from '../pages/admin/admin_users/all_users';
import PaymentSuccess from "../pages/payment_success";
import PaymentCancel from "../pages/payment_cancel";
import Order from "../pages/order";

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
                element: <SignIn/>
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
                path: "/basket",
                element: <Basket/>
            },
            {
                path: "/favorite",
                element: <Favorite/>
            },
            {
                path: "/success",
                element: <PaymentSuccess/>
            },
            {
                path: "/cancel",
                element: <PaymentCancel/>
            },
            {
                path: "search",
                element: <SearchProduct/>
            },
            {
                path: "order",
                element: <Order/>
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