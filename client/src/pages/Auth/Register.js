import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] =useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, password)
    }

  return (
    <Layout title={'Register Now'}>
        <div className='register'>
            <h1>Register Now</h1>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
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
                <div class="mb-3">
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
                <div class="mb-3">
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
                <div class="mb-3">
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
                <div class="mb-3">
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