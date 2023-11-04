import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import {Select} from 'antd';

const {option} = Select

const CreateProduct = () => {
  const [categories, setCategories] = useState([])
  const [photo, setPhoto] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [shipping, setShipping] = useState("")
  const [category, setCategory] = useState("")
  
  

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
  return (
    <Layout title={'Admin- Create Product'}>
    <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h1>Create Product</h1>
                    <div className='m-1'>
                      <Select 
                        className='form-select mb-3'
                        onChange={(value)=>{setCategory(value)}}
                        bordered={false} 
                        placeholder='Select a category' 
                        size='large' 
                        showSearch
                      >
                        {categories?.map((c) => {
                          <Option key={c._id} value={c.name}>
                            {c.name}
                          </Option>
                        })}
                      </Select>
                      <div className="mb-3">
                        <label className="btn btn-primary btn-outline-secondary col-md-12">
                          { photo ? photo.name : "Upload Photo" }
                          <input 
                            type='file' 
                            name="photo" 
                            accept="images/*"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            hidden
                          />
                        </label>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateProduct