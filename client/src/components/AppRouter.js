import React from 'react';
import {Route, Routes} from "react-router-dom";
import {publicRoutes} from "../route";
import Home from "../pages/Home";
import Path from "./Path";

const AppRouter = () => {
    return (
        <Routes>
                {publicRoutes.map(({path, element}) => <Route key={path} path={path} element={element} />)}
                <Route path='*' element={<Home/>} />
        </Routes>
    );
};

export default AppRouter;