import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/auth';
import axios from 'axios';

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])

  //get products
  const getAllProducts = async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`)
      setProducts(data.products)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong while fetching the products")
    }
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  return (
    <Layout title={'Best offers'}>
        <h1>Homepage</h1>
        <div className='row mt-3'>
          <div className='col-md-3'>
            <h6 className='text-center'>Filter By Category</h6>
          </div>
          <div className='col-md-9'>
            <h1 className='text-center'>All Products</h1>
            <div className='d-flex flex-wrap'>
              <h1>products</h1>
              {products?.map(p => (
                  <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default HomePage