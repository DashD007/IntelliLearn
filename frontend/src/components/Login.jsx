import React, { useState} from 'react'
import Button from './Button';
import toast from 'react-hot-toast';
import { Link, useNavigate} from 'react-router-dom'
import axios from "axios";
import { backendURI } from '../utils/constants';
import {useDispatch} from "react-redux";
import {setAuthUser} from "../redux/userSlice.js"

const Login = () => {
    
    const [User,setUser] = useState({
        email:"",
        password:""
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginHandler = async(e) => {
        e.preventDefault();
        try {
            await axios.post(`${backendURI}/user/login`,User,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })
            .then((res) => {
                toast.success("user logged in successfull")
                if(res?.data?.success) navigate("/home");
                dispatch(setAuthUser(res?.data?.data));
            })
            .catch((error) => {toast.error(error.response.data.message); return null})
            setUser({email:"", password:""})
        } catch (error) {
            toast.error(error?.message)
        }
    }
  return (
    <div className='h-screen flex items-center justify-center z-10 '>
        <div className=' border-black border-2 px-4 py-3 w-[450px]'>
            <form className='flex flex-col gap-3' onSubmit={loginHandler}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='email' className='text-xl font-bold'>Email</label>
                    <input value={User.email} onChange={(e) => setUser({...User, email:e.target.value})} type="email" id="email" placeholder='Enter your email' className='border-2 border-gray-400 px-2 py-3'/>    
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='pass' className='text-xl font-bold'>Password</label>
                    <input value={User.password} onChange={(e) => setUser({...User,password:e.target.value})} type="password" id="pass" placeholder='Enter your password' className='border-2 border-gray-400 px-2 py-3'/>    
                </div>
                <div className='flex justify-center'>
                    <Button type="submit" text={"Login"}/>
                </div>
            </form>
            
            <div className='text-center my-4'>
                <Link to="/signup"><p>Don't have account? <span className='hover:underline'>Sign Up</span></p></Link>
            </div>
        </div>
    </div>
  )
}

export default Login;