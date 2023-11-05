import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import axios from 'axios';
import {Checkbox} from 'antd';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([])

  //get all cat
  const getAllCategory = async () => {
    try {
        const {data} =  await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
        console.log(`data:${data}`)
        if (data?.success) {
            setCategories(data.category);
        }
    } catch(error) {
        console.log(error)
        toast.error('something went wrong in getting category')
    }
};
useEffect(() => {
    getAllCategory();
}, [])

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

  //filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked]
    if(value) {
      all.push(id)
    } else {
      all.filter((c) => c!== id);
    }
    setChecked(all);
  }
  useEffect(() => {
    getAllProducts();
  }, [])

  return (
    <Layout title={'Best offers'}>
        <h1>Homepage</h1>
        <div className='row mt-3'>
          <div className='col-md-2'>
            <h4 className='text-center'>Filter By Category</h4>
            <div className='d-flex'>
              {categories?.map((c) => (
                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                  {c.name}
                </Checkbox>
              ))}
            </div>
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
                      <button className='btn btn-primary ms-1'>More Details</button>
                      <button className='btn btn-secondary ms-1'>Add to cart</button>
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