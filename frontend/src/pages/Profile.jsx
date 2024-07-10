import React, { useState, useRef, useEffect } from 'react'
import {backendURI,  userAvatar} from "../utils/constants.js";
import {useDispatch, useSelector} from "react-redux"
import { MdEdit } from "react-icons/md";
import axios from 'axios';
import {setAuthUser} from "../redux/userSlice.js";
import toast from 'react-hot-toast';
import {IoMdSend} from "react-icons/io"
import useGetBlogByUser from '../hooks/useGetBlogByUser.js';
import BlogCard from '../components/BlogCard.jsx';
import { Link,useNavigate } from 'react-router-dom';
const Profile = () => {
    const dispatch = useDispatch();
    const {authUser} = useSelector((store) => store.user)
    
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    useEffect(()=> {
        if(!authUser){
            navigate("/login");
        }
    },[authUser,navigate])

    const [avatar,setAvatar] = useState();
    const [ShowInputAbout,setShowInputAbout] = useState(false)
    const [ShowInputAvatar,setShowInputAvatar] = useState(false)
    const about = useRef();
    const changeAvatar = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("avatar", avatar);
        // const file = document.getElementById('file').value
        
        try {
            axios.defaults.withCredentials = true
            const result = await axios.patch(`${backendURI}/user/update/avatar`,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials:true
            })  
            setShowInputAvatar(false)
            dispatch(setAuthUser(result?.data?.data))
            toast.success(result?.data?.message)

        } catch (error) {
            console.log(error)   
        }
    }

    const blogs = useGetBlogByUser(authUser?._id)

    const updateAbout = async(e) => {
        e.preventDefault();
        try{
            axios.defaults.withCredentials = true
            const result = await axios.patch(`${backendURI}/user/update/about`,{about:about.current.value},{
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials:true});
            about.current.value="";
            setShowInputAbout(false);
            dispatch(setAuthUser(result?.data?.data));
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <div className='max-w-screen min-h-screen'>
        <div className='max-w-[800px] mx-auto flex flex-col items-center border mt-7 p-5 border-gray-500 rounded-md'>
            <div className='flex flex-col items-center'>
                <img src={authUser?.avatar || userAvatar} alt="user-avatar" className='w-36 h-36 object-center rounded-full' />
                <button onClick={() => setShowInputAvatar(!ShowInputAvatar)} className='border border-black bg-black text-white p-2 rounded-full relative bottom-8 left-10'><MdEdit/></button>
            </div>
            {ShowInputAvatar && <div>
                <form onSubmit={(e) => changeAvatar(e)} id="uploadForm" encType="multipart/form-data">
                    <input type="file" id="avatar" onChange={(e)=> setAvatar(e.target.files[0])}/> 
                    <button type="submit" className='border border-gray-600 p-1 rounded-md'>upload</button>
                </form>
            </div>}
            <div className='flex flex-col gap-3 items-center w-full'>
                <p className='text-3xl font-bold'>Hi, <span>{authUser?.username}</span></p>
                <p className='text-xl font-bold'>Email: {authUser?.email}</p>
                <p className='self-start text-xl font-bold'>About:</p>
                {ShowInputAbout ?
                <form className='flex gap-4 w-full items-center' onSubmit={(e) => updateAbout(e)}>
                    <input type="text" autoFocus ref={about} placeholder='Enter about you' className='px-3 py-2 text-md border border-gray-600 rounded-md'/>
                    <button className='text-lg border border-gray-600 rounded-full p-3' type="submit"><IoMdSend/></button>
                </form> :
                <p className='self-start text-lg text-justify'>{authUser?.about || "tell us about you"}</p>

                }
                <button className='self-start text-white bg-black rounded-md border-none px-4 py-2 font-bold' onClick={()=>setShowInputAbout(!ShowInputAbout)}>{!ShowInputAbout? "Change" :"Cancel"}</button>
            </div>
            <div className='w-full mt-5'>
                <p className='text-xl font-bold'>Blog Created:</p>
                <div className='flex gap-2 mt-3 overflow-auto '>
                    {
                        blogs?.map((blog) => <Link to={`/blog/${blog._id}`} key={blog._id} ><BlogCard  blog={blog}/></Link>) 
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile