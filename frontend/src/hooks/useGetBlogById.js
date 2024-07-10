import {useEffect, useState} from "react";
import axios from "axios";
import { backendURI } from "../utils/constants";
const useGetBlogById = (id) => {
    const [data, setData] = useState([]);
    useEffect(()=> {
        const fetchData = async() => {
            try {
                const result = await axios.get(`${backendURI}/blog/get/${id}`);
    
                setData(result?.data?.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[id])

    return data
}

export default useGetBlogById;