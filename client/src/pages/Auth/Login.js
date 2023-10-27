import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import "../../styles/AuthStyles.css";

const Login = () => {
    const [email, setEmail] =useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, 
            {email, password});
            if( res && res.data.success) {
                toast.success(res.data && res.data.message)
                navigate('/')
            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
           console.log(error)
           toast.error('Something went wrong') 
        }
    }
    
  return (
    <Layout title={'Login Page'}>
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <h1>Log In</h1>
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
                <button 
                    type="submit" 
                    className="btn btn-primary"
                >
                    Login
                </button>
            </form>

        </div>
    </Layout>
  )
}

export default Login