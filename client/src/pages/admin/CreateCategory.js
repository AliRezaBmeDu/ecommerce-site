import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd'
import { useAsyncError } from 'react-router-dom'

const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState("")
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, {name})
            if(data.success){
                toast.success(`${data.name} is created`);
                getAllCategory();
            } else {
                toast.error(data.message)
            }
        } catch (error){
            console.log(error)
            toast.error('Something went wrong in input form')
        }
    }

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

    const handleUpdate = async(e) => {
        e.preventDefault();
        try{
            const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,{name: updatedName})
            if (data.success) {
                toast.success(`${updatedName} is updated`)
                setSelected(null)
                setUpdatedName("")
                setVisible(false)
                getAllCategory();
            } else {
                toast.message(data.message)
            }

        } catch(error) {
            console.log(error)
            toast.error('something went wrong in editing category')
        }
    }
  return (
    <Layout title={'Admin- Create Category'}>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h1>Manage Category</h1>
                    <div className='p-3 w-50'>
                        <CategoryForm 
                            handleSubmit={handleSubmit} 
                            value={name} 
                            setValue={setName}
                        />
                    </div>
                    <div className='w-75'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories?.map((c) => (
                                    <React.Fragment>
                                        <tr>
                                            <td key={c._id}>{c.name}</td>
                                            <td>
                                                <button 
                                                    className='btn btn-primary ms-2' 
                                                    onClick={()=>{
                                                        setVisible(true);
                                                        setUpdatedName(c.name);
                                                        setSelected(c)
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button className='btn btn-danger ms-2'>Delete</button>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Modal 
                        onCancel={()=> setVisible(false)} 
                        footer={null} 
                        open={visible}
                    >
                        <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                    </Modal>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateCategory