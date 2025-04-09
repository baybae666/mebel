import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FacadeStore from "./Store/FacadeStore";
import UserStore from "./Store/UserStore";
import CartStore from "./Store/CartStore";
import OrderStore from "./Store/OrderStore";
import OrderDetailsStore from "./Store/OrderDetailsStore";

const root = ReactDOM.createRoot(document.getElementById('root'));

export const Context = createContext();

root.render(
  <Context.Provider value={{
      facadeStore: new FacadeStore(),
      userStore: new UserStore(),
      cartStore: new CartStore(),
      orderStore: new OrderStore(),
      orderDetailStore: new OrderDetailsStore(),
  }}>
    <App />
  </Context.Provider>
);


reportWebVitals();
