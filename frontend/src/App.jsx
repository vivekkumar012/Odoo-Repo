import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ScrollToTop from './ScrollToTop.jsx'

import HomePage from "../src/pages/HomePage.jsx"
import LoginPage from "../src/pages/LoginPage"
import RegisterPage from "../src/pages/RegisterPage"
import NotFoundPage from "../src/pages/404Page"
import toast, { Toaster } from 'react-hot-toast';
// import ProductsPage from "@/pages/ProductsPage"
// import ProductDetailsPage from "@/pages/ProductDetailsPage"
// import CartPage from "@/pages/CartPage"
// import OrdersPage from "@/pages/OrdersPage"
// import OrderDetailsPage from "@/pages/OrderDetailsPage"
// import AccountPage from "@/pages/AccountPage"
import api from './api'
import cartReducer, { initialCartState } from './reducers/cartReducer.js'
import useReducerWithLocalStorage from './hooks/useReducerWithLocalStorage'
import UserLayout from './layouts/UserLayout'
import Listings from './pages/Listings.jsx'

export const UserContext = createContext()
export const CartContext = createContext()

export default function App() {
  const [user, setUser] = useState(null)
  const [cart, cartDispatch] = useReducerWithLocalStorage(cartReducer, initialCartState, "cart")
  
  useEffect(() => {
    (async () => {
      const resp = await api.fetchUserDetails()
      console.log(resp)
      if (resp.status == "ok") {
        setUser(resp.user)
      }
    })()
  }, [])

  useEffect(() => {
    if (!user) return
    (async () => {
      const resp = await api.getUserCart()
      console.log(resp)
      if (resp.products) {
        cartDispatch({type: "SET_PRODUCTS", payload: resp.products})
      }
    })()
  }, [user])

  return (
    <BrowserRouter>      
      <CartContext.Provider value={{cart, cartDispatch}}>
      <UserContext.Provider value={{user, setUser}}>
        <ScrollToTop />
        
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            {/* <Route path="cart" element={<CartPage />} /> */}
            

            <Route path="login" element={user ? <Navigate replace to="/" /> : <LoginPage />} />
            <Route path="register" element={user ? <Navigate replace to="/" /> : <RegisterPage />} />
            <Route path="account" element={user ? <AccountPage /> : <Navigate replace to="/login" />} />

            {/* <Route path="products">
              <Route index element={<ProductsPage />} />
              <Route path=":id" element={<ProductDetailsPage />} />
            </Route> */}
            
            <Route path="orders">
              <Route index element={user ? <OrdersPage /> : <Navigate replace to="/login" />} />
              <Route path=":id" element={user ? <OrderDetailsPage /> : <Navigate replace to="/login" />} />
            </Route>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/listings' element={<Listings />} />
          </Route>
            
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

      </UserContext.Provider>
      </CartContext.Provider>
      <Toaster />
    </BrowserRouter>
    
  );
}