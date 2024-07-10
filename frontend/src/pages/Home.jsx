/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import BlogComponent from "../components/BlogComponent";
import { useSelector} from "react-redux";

import { FaPenAlt } from "react-icons/fa";
import { Link , useNavigate} from "react-router-dom";

import useGetBlog from "../hooks/useGetBlog";
const Home = () => {
    const {authUser} = useSelector((store) => store.user);
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    useEffect(()=> {
        if(!authUser){
            navigate("/login");
        }
    },[authUser,navigate])

   
    const [blogs] = useGetBlog();
    const blog = blogs?.shift();
   

    return (
        <div className="min-h-screen max-w-screen mt-7">
            { blog &&
            <div className="max-w-[1000px] mx-auto flex flex-col gap-3">
                <div className="h-1/2">
                    <Link to={`/blog/${blog._id}`} key={blog._id}><BlogComponent banner={blog.banner} content={blog.content} title={blog.title} owner={blog.owner} createdAt={blog.createdAt}/></Link>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {blogs.map((blog) => <Link to={`/blog/${blog._id}`} key={blog._id}><BlogComponent banner={blog.banner} content={blog.content} title={blog.title} owner={blog.owner} createdAt={blog.createdAt}/></Link>)}
                </div>
            </div>}
            <Link to="/blog/write" ><button className="bottom-10 left-10 sticky  bg-black w-16 h-16 rounded-full text-white flex items-center justify-center text-xl"><FaPenAlt/></button></Link>
            
        </div>
        )

}

export default Home;