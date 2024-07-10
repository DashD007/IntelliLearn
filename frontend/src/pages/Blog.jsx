import React, {useEffect} from 'react'
import { blogPlaceholder, userAvatar } from '../utils/constants'
import { useParams ,useNavigate} from 'react-router-dom'
import useGetBlogById from '../hooks/useGetBlogById';
import {useSelector} from "react-redux";
const Blog = () => {
    const { id } = useParams();
    
    const blog = useGetBlogById(id)?.shift();
    const {authUser} = useSelector((store) => store.user);
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    useEffect(()=> {
        if(!authUser){
            navigate("/login");
        }
    },[authUser,navigate])
  return blog && (
    <div className='max-w-screen min-h-screen'>
        <div className='w-[1000px] mx-auto mt-7 flex flex-col gap-4'>
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-5xl font-bold">{blog.title}</h1>
                <div className='flex gap-3 items-center'>
                    <img src={blog.owner.avatar || userAvatar} alt="user-avatar" className="rounded-full w-7 h-7 object-center"/>
                    <p>{blog.owner.username}</p>
                    <p>{blog?.createdAt.split( 'T' )[0]}</p>
                </div>
            </div>
            <div className='rounded-md  h-[400px] object-cover aspect-video'>
                <img src={blog.banner || blogPlaceholder} alt="blog-banner" className="rounded-md object-center w-full h-[400px] aspect-video "/>
            </div>
            <div>
                <p className="text-justify text-lg">{blog.content}</p>
            </div>
        </div>
    </div>
  )
}

export default Blog