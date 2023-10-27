import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout'
import {toast} from 'react-toastify';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] =useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const navigate = useNavigate("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, 
            {name, email, password, phone, address});
            if(res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
           console.log(error)
           toast.error('Something went wrong') 
        }
    }

  return (
    <Layout title={'Register Now'}>
        <div className='register'>
            <h1>Register Now</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control" 
                        id="name" 
                        placeholder='Enter your name' 
                        required
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control" 
                        id="email" 
                        placeholder='Enter your E-mail' 
                        required
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control" 
                        id="password" 
                        placeholder='Password' 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control" 
                        id="phone" 
                        placeholder='Phone No.'  
                        required
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control" 
                        id="address" 
                        placeholder='Address' 
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </form>

        </div>
    </Layout>
  )
}

export default Register