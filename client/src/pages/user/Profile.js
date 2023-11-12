import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {
    const [auth, setAuth] = useAuth()

    const [name, setName] = useState("")
    const [email, setEmail] =useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, 
            {name, email, password, phone, address});
            if( res && res.data.success) {
                toast.success(res.data && res.data.message)
            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
           console.log(error)
           toast.error('Something went wrong') 
        }
    }
  return (
    <Layout title={'User-Profile'}>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu />
                </div>
                <div className='col-md-9'>
                    
                    <form onSubmit={handleSubmit}>
                        <h4 className='title'>User Profile</h4>
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
                        <div className="mb-3">
                            <input 
                                type="text" 
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="form-control" 
                                id="address" 
                                placeholder='Your pet name?' 
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
            </div>
        </div>
    </Layout>
  )
}

export default Profile