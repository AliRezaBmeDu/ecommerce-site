import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


const Products = () => {
  const [products, setProducts] = useState([])
  const reactApi = 'http://localhost:8080';
  //get all products
  const getAllProducts = async () => {
    try {
      const {data} = await axios.get(`${reactApi}/api/v1/product/get-product`)
      setProducts(data.products)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong while fetching the products")
    }
  }

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, [])

  return (
    <Layout>
        <div className='col-md-3'>
            <AdminMenu />
        </div>
        <div className='col-md-9'>
            <h1 className='text-center'>All Products List</h1>
            <div className='d-flex'>
              {products?.map(p => (
                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                  <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                    <img
                      src={`${reactApi}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
        </div>
    </Layout>
  )
}

export default Products