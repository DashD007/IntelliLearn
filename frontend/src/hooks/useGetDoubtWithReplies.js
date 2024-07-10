import axios from "axios"
import { backendURI } from "../utils/constants"
import { useEffect } from "react";
import { setdoubtTree } from "../redux/doubtSlice";
import { useDispatch } from "react-redux";

const useGetDoubtWithReplies = (id) => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`${backendURI}/doubt/get/${id}`);
                
                dispatch(setdoubtTree(response?.data?.data))
                // return response?.data?.data
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[id,dispatch])
}

export default useGetDoubtWithReplies