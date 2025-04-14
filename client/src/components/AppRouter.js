import React, {useContext, useEffect} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import {adminRoutes, authRoutes, publicRoutes} from "../route";
import Home from "../pages/Home";
import Path from "./Path";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = () => {
    const {userStore} = useContext(Context)
    const location = useLocation()
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [location.pathname])

    if (userStore.isLoading) {
        return (
            <div className="max-w-2xl mx-auto p-4 md:p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-10 bg-gray-200 rounded-xl"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <Routes>
                {publicRoutes.map(({path, element}) => <Route key={path} path={path} element={element} />)}
                {userStore.isAuth && authRoutes.map(({path, element}) => <Route key={path} path={path} element={element} />)}
                <Route path='*' element={<Home/>} />
        </Routes>
    );
};

export default observer(AppRouter);