import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../route";
import Home from "../pages/Home";
import Path from "./Path";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = () => {
    const {userStore} = useContext(Context)
    console.log(userStore.isAuth)
    return (
        <Routes>
                {publicRoutes.map(({path, element}) => <Route key={path} path={path} element={element} />)}
                {userStore.isAuth && authRoutes.map(({path, element}) => <Route key={path} path={path} element={element} />)}
                <Route path='*' element={<Home/>} />
        </Routes>
    );
};

export default observer(AppRouter);