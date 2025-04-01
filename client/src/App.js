import React, {useContext, useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Path from "./components/Path";
import {Context} from "./index";
import './App.css'
function App() {
    const { userStore } = useContext(Context);

    useEffect(() => {
        userStore.checkAuth(); // Проверка авторизации
    }, [userStore]);

    if (userStore.isLoading) {
        return <div>Загрузка...</div>; // Показать индикатор загрузки
    }

    return (
        <BrowserRouter>
            <Header />
            <Path />
            <AppRouter />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
