import React from 'react'
import Layout from '../components/layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const reactApi = process.env.REACT_APP_API
    const [cart ,setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    
    //detele item
  const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };
  return (
    <Layout>
        <div className='cart-page'>
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
            <div className="container ">
                <div className="row ">
                    <div className="col-md-7  p-0 m-0">
                    {cart?.map((p) => (
                        <div className="row card flex-row" key={p._id}>
                            <div className="col-md-4">
                                <img
                                    src={`${reactApi}/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                    width="100%"
                                    height={"130px"}
                                />
                            </div>
                            <div className="col-md-4">
                                <p>{p.name}</p>
                                <p>{p.description.substring(0, 30)}</p>
                                <p>Price : {p.price}</p>
                            </div>
                            <div className="col-md-4 cart-remove-btn">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => removeCartItem(p._id)}
                                >
                                Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
       </div>
    </Layout>
  )
}

export default CartPage