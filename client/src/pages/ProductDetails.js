import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
  const reactApi = process.env.REACT_APP_API
  const params = useParams();
  const [product, setProduct] = useState({})

  // get products
  const getProduct = async () => {
    try {
      const {data} = await axios.get(`${reactApi}/api/v1/product/get-product/${params.slug}`)
      setProduct(data?.product)
    } catch (error) {
      console.log(error)

    }
  }

  //initialp details
  useEffect(() => {
    if (params?.slug) getProduct()
  }, [params?.slug])
  return (
    <Layout>
        <h1>Product Details</h1>
        <div className='row container'>
          <div className='col-md-5'>image</div>
          <div className='col-md-5'>details</div>
        </div>
        <div className='row'>Similar Products</div>
    </Layout>
  )
}

export default ProductDetails