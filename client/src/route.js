import {
    ABOUTROUTER, CARTROUTER,
    CATALOGROUTER,
    CONTACTROUTER,
    HOMEROUTER,
    LOGINROUTER, ORDERCONFIRMROUTER, ORDERLISTROUTER,
    PRODUCTROUTER, PROFILEROUTER,
    REGISTERROUTER
} from "./utils/consts";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import OrderConfirm from "./pages/OrderConfirm";
import OrderList from "./components/order/OrderList";
import Profile from "./pages/Profile";

export const publicRoutes = [
    {
        path: HOMEROUTER,
        element: <Home/>
    },
    {
        path: CATALOGROUTER,
        element: <Catalog/>
    },
    {
        path: PRODUCTROUTER + '/:FacadeID',
        element: <Product/>
    },
    {
        path: ABOUTROUTER,
        element: <About/>
    },
    {
        path: CONTACTROUTER,
        element: <Contact />
    },
    {
        path: LOGINROUTER,
        element: <Auth />
    },
    {
        path: REGISTERROUTER,
        element: <Auth />
    },
    {
        path: CARTROUTER,
        element: <Cart />
    }
]

export const authRoutes = [
    {
        path: ORDERCONFIRMROUTER,
        element: <OrderConfirm />
    },
    {
        path: PROFILEROUTER + '/:section/:id',
        element: <Profile />
    },
    {
        path: PROFILEROUTER + '/:section',
        element: <Profile />
    },
    {
        path: PROFILEROUTER + '/:section',
        element: <Profile />
    }
]

