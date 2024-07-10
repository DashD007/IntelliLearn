import { useEffect, useState } from 'react'
import { backendURI } from '../utils/constants'
import axios from 'axios'

const useGetBlogByUser = (userId) => {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    const fetchData = async() => {
        try {
            const response = await axios.get(`${backendURI}/blog/get/user/${userId}`);
            setBlog(response?.data?.data)
          } catch (error) {
            console.log(error?.response?.data?.message)
          }
        }
        fetchData()
  },[userId])
  return blog
}

export default useGetBlogByUser