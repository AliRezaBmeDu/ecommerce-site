import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'

const CreateCategory = () => {
    const [categories, setCategories] = useState([])

    //get all cat
    const getAllCategory = async () => {
        try {
            const {data} =  await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            console.log(`data:${data}`)
            if (data.success) {
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
  return (
    <Layout title={'Admin- Create Category'}>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h1>Manage Category</h1>
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {categories.map(c => (
                                        <td key={c._id}>{c.name}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateCategory