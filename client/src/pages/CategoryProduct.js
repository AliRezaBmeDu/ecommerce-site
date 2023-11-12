import React from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const CategoryProduct = () => {
    const reactApi = process.env.REACT_APP_API
    const [ products, setProducts ] = useState([])
    const [ category, setCategory ] = useState([])
    const params = useParams()

    const getProductsByCat = async () => {
        try {
            const {data} = await axios.get(`${reactApi}/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch(error) {
            console.log(error)
        }
    }
  return (
    <Layout>
        <div className='container'>
        </div>
    </Layout>
  )
}

export default CategoryProduct