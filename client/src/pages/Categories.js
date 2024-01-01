import React from 'react'
import Layout from '../components/layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories = useCategory();
    // console.log('categories at page: ', categories);
  return (
    <Layout title={"All Categories"}>
        <div className='container'>
            <h1>Categories</h1>
            <div className='row'>
                {categories.map((c) => {
                    {console.log('name: ', c.name)}
                    return (
                        <div className='col-md-6 mt-5 mb-3 gx-3 gy-3'>
                            <Link to={`/category/${c.slug}`} className='btn btn-primary'>{c.name}</Link>
                        </div>
                    )
                })}
            </div>
        </div>
    </Layout>
  )
}

export default Categories