import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PagenotFound from './pages/PagenotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPasssword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Users from './pages/admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/UpdateProduct';


function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/orders' element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<Orders />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPasssword />} />
        <Route path='/login' element={<Login />} />
        <Route path= '/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/policy' element={<Policy/>} />
        <Route path='/*' element={<PagenotFound/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
