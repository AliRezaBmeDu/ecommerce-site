import React from 'react'
import Layout from '../components/layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [cart ,setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
  return (
    <Layout>
        <div className='container'>
            <div className='row'>
                <div className="col-md-12">
                    <h1 className="text-center bg-light p-2 mb-1">
                    {!auth?.user
                        ? "Hello Guest"
                        : `Hello  ${auth?.token && auth?.user?.name}`}
                    <p className="text-center">
                        {cart?.length
                        ? `You Have ${cart.length} items in your cart ${
                            auth?.token ? "" : "please login to checkout !"
                            }`
                        : " Your Cart Is Empty"}
                    </p>
                    </h1>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CartPage