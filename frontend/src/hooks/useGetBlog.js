import { useEffect,useState } from "react"
import axios from "axios";
import { backendURI } from "../utils/constants";
const useGetBlog = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(()=> {
        const fetchData = async() => {
            try {
                const result = await axios.get(`${backendURI}/blog/getAll`);
                
                setBlogs(result?.data?.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])

    return [blogs]
}

export default useGetBlog;