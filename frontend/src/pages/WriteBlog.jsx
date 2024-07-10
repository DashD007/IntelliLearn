import React, { useRef, useState,useEffect } from 'react'
import Button from "../components/Button"
import axios from "axios";
import { backendURI } from '../utils/constants';
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux"
const WriteBlog = () => {
  const title = useRef();
  const content = useRef();
  const [banner,setBanner] = useState();
  const navigate = useNavigate();
  const {authUser} = useSelector((store) => store.user)

    useEffect(()=> {
        if(!authUser){
            navigate("/login");
        }
    },[authUser,navigate])
  const publishBlog = async(e) => {
    e.preventDefault();
    try{
      const form = new FormData();
      form.append('title', title.current.value?.trim());
      form.append('content', content.current.value?.trim());
      form.append('banner', banner);
      const result = await axios.post(`${backendURI}/blog/create`,form,{
        headers: {
          'Content-Type': 'multipart/form-data'
          },
        withCredentials:true
      });
      
      toast.success(result?.data?.message);
      title.current.value = "";
      content.current.value = "";
      setBanner();
      navigate(`/blog/${result?.data?.data?._id}`)
    }
    catch(error){
      toast.error(error?.response?.data?.message);
    }
  }
  return (
    <div className='max-w-screen min-h-screen'>
        <div className='max-w-[1000px] mx-auto h-screen '>
          <form className='grid grid-rows-6 gap-3 my-4 h-full' onSubmit={(e) => publishBlog(e)}>
            <div className='border border-gray-300 rounded-md p-2'>
              <input type="text" ref={title} placeholder='Enter your blog title' autoFocus className='text-2xl text-justify p-2 font-bold w-full h-full  placeholder:text-2xl placeholder:text-center focus:border-none'/>
            </div>
            <div className='border border-gray-300 rounded-md p-2'>
              <input type="file" onChange={(e) => setBanner(e.target.files[0])} placeholder='upload your banner image' className='w-full h-full  '/>
            </div>
            <div className='grid-rows-subgrid row-span-3 border border-gray-300 rounded-md p-2'>
              <textarea  ref={content} placeholder='Enter your blog content' className='text-xl text-justify p-2  w-full h-full  placeholder:text-2xl placeholder:text-center placeholder:my-auto'></textarea>
            </div>
            <div className='flex items-center justify-center'>
              <Button text={"publish"}/>
            </div>
          </form>
          {/* <div className='flex justify-center mb-6'>
          </div> */}
        </div>
    </div>
  )
}

export default WriteBlog