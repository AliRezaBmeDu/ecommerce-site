import React from 'react'
import Layout from '../../components/layout/Layout'

const Register = () => {
  return (
    <Layout title={'Register Now'}>
        <div className='register'>
            <h1>Register Now</h1>
            <form>
                <div class="mb-3">
                    <input type="text" class="form-control" id="name" required/>
                </div>
                <div class="mb-3">
                    <input type="email" class="form-control" id="email" required/>
                </div>
                <div class="mb-3">
                    <input type="password" className="form-control" id="password" />
                </div>
                <div class="mb-3">
                    <input type="text" class="form-control" id="phone" />
                </div>
                <div class="mb-3">
                    <input type="text" class="form-control" id="address" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    </Layout>
  )
}

export default Register