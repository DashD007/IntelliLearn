import React, { useState } from 'react'
import Button from './Button';
import toast from 'react-hot-toast';
import {formValidate} from "../utils/formValidate.js"
import { Link } from 'react-router-dom';
import axios from "axios";
import { backendURI } from '../utils/constants.js';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [User,setUser] = useState({username :"" ,email: "",password:"" , confirmPassword:""})
    
    const navigate = useNavigate();

    const SignUpHandler = async(e) => {
        e.preventDefault();
        if(User.password !== User.confirmPassword){
            toast.error("password should match");
            return null
        }
        try {
            const result = formValidate(User.email,User.password,User.username);
            if(result){
                toast.error(result);
                return null;
            }
            await axios.post(`${backendURI}/user/register`,User,{
                headers:{
                    'Content-Type':"application/json"
                },
                withCredentials:true
            }).then(() => toast.success("user logged in successfully"))
            .catch((error) => {toast.error(error.message); return null})

            setUser({username:"",email:"",password:"",confirmPassword:""})
            navigate("/login")
        } catch (error) {
            toast.error(error);
        }
    }
  return (
    <div className='h-screen flex items-center justify-center z-10 '>
        <div className=' border-black border-2 px-4 py-3 w-[450px]'>
            <form className='flex flex-col gap-3' onSubmit={SignUpHandler}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='username' className='text-xl font-bold'>Username</label>
                    <input value={User.username} onChange={(e) => {setUser({...User,username:e.target.value})}} type="text" id="username" placeholder='Enter your name' className='border-2 border-gray-400 px-2 py-3'/>    
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='email' className='text-xl font-bold'>Email</label>
                    <input value={User.email} onChange={(e) => {setUser({...User, email:e.target.value})}} type="email" id="email" placeholder='Enter your email' className='border-2 border-gray-400 px-2 py-3'/>    
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='pass' className='text-xl font-bold'>Password</label>
                    <input value={User.password} onChange={(e) => {setUser({...User,password:e.target.value})}} type="password" id="pass" placeholder='Enter your password' className='border-2 border-gray-400 px-2 py-3'/>    
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='con_pass' className='text-xl font-bold'>Confirm Password</label>
                    <input value={User.confirmPassword} onChange={(e) => {setUser({...User,confirmPassword:e.target.value})}} type="password" id="con_pass" placeholder='Enter your password again' className='border-2 border-gray-400 px-2 py-3'/>    
                </div>
                <div className='flex justify-center'>  
                    <Button type="submit" text={"Sign in"}/>
                </div>
            </form>
            
            <div className='text-center my-4'>
                <Link to="/login"><p>Already have account? <span className='hover:underline'>Login</span></p></Link>
            </div>
        </div>
    </div>
  )
}

export default SignIn