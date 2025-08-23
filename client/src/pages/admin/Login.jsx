import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'



const Login = ({onLogin}) => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = async(e) => {
    e.preventDefault()
    try {
        
        const res = await axios.post("http://localhost:4000/api/admin/login", {email, password})

        console.log(res.data)

        if(res.data.success){
            localStorage.setItem("token", res.data.token)
            axios.defaults.headers.common["Authorization"] = res.data.token
            onLogin()
            toast.success("Login Successful")
            navigate("/admin")
        }else{
            toast.error(res.data.message || "Login Failed")
        }

    } catch (error) {
        toast.error("Invalid email or password")
    }
}

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
            <div className='w-full py-6 text-center'>
                <h1 className='text-3xl font-bold'><span className='text-primary'>Admin</span> Login</h1>
            </div>
            <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
                <div className='flex flex-col'>
                    <label> Email </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder='Enter your email' className='border-b-2 border-gray-300 p-2 outline-none mb-6' />
                </div>

                <div className='flex flex-col'>
                    <label> Password </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder='Enter your password' className='border-b-2 border-gray-300 p-2 outline-none mb-6' />
                </div>
                <button type='submit' className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all'>Login</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
