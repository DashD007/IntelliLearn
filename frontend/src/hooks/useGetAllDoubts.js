import { useEffect } from "react";
import axios from "axios";
import { backendURI } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setallDoubts } from "../redux/doubtSlice";
const useGetAllDoubts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        
        const fetchData = async() => {
            try {
                const data = await axios.get(`${backendURI}/doubt/get`);
                dispatch(setallDoubts(data?.data?.data.reverse()))
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    },[dispatch])
}

export default useGetAllDoubts;