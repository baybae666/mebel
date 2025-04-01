import {
    ABOUTROUTER, CARTROUTER,
    CATALOGROUTER,
    CONTACTROUTER,
    HOMEROUTER,
    LOGINROUTER,
    PRODUCTROUTER,
    REGISTERROUTER
} from "./utils/consts";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";

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