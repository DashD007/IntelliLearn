import React, { useRef, useEffect} from 'react'
// import { IoSearchOutline } from "react-icons/io5";
import {IoMdSend} from "react-icons/io"
import useGetAllDoubts from '../hooks/useGetAllDoubts';
import DoubtCard from '../components/DoubtCard';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendURI } from '../utils/constants';
import toast from 'react-hot-toast';
import { useSelector,useDispatch } from 'react-redux';
import { addDoubt } from '../redux/doubtSlice';

const DoubtStore = () => {

  const dispatch = useDispatch();
  const {authUser} = useSelector((store) => store.user);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  useEffect(()=> {
      if(!authUser){
          navigate("/login");
      }
  },[authUser,navigate])





  const question = useRef();
  const createDoubt = async(e) => {
    e.preventDefault()
    const content = question.current.value;
    if(content.trim().length === 0){
      toast.error("Please write your doubt")
      return null
    }
    try{
      axios.defaults.withCredentials = true;
      const result = await axios.post(`${backendURI}/doubt/create`,{
        content
      },{
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials:true
      });

      dispatch(addDoubt(result?.data?.data))
      toast.success(result?.data?.message)
      question.current.value = "";
    }
    catch(error){
      console.log(error)
    }
  }

  useGetAllDoubts();
  let {allDoubts} = useSelector((store) => store.doubt);
  // allDoubts = allDoubts.reverse();

  return (
    <div className=' min-h-screen'>
      <div className='max-w-[1200px] flex flex-col gap-10 mx-auto items-center'>
        {/* <div className='mt-10 w-full'>
          <form onSubmit={(e)=>{searchHandler(e)}} className='flex gap-5 w-[60%] mx-auto'>
            <input ref={inputValue} type="text" placeholder="Find your doubt" className='border-black border input rounded-full w-full px-4 py-3'/>
            <button type="submit" className='rounded-full border border-black text-2xl px-3'><IoSearchOutline /></button>
          </form>
        </div> */}

        <div className='w-full mt-10'>
          <form className='flex flex-col w-[70%] mx-auto items-center' onSubmit={(e) => createDoubt(e)}>
            <textarea ref={question} placeholder='Raise your doubt now' className='text-black  rounded-md text-lg placeholder:text-gray-800 w-full px-3 py-2 flex items-center h-32 bg-gray-400 border border-gray-200 focus:border-white'></textarea>
            <button className='text-white bg-black rounded-full text-2xl p-2 self-end relative bottom-12 right-2'><IoMdSend /></button>
          </form>
        </div>

        {allDoubts && <div className='w-full'>
          <div className='w-[70%] flex flex-col gap-5 mx-auto'>
            <p className='text-xl font-bold'>Doubts Asked By Others</p>
            {
              allDoubts?.map((doubt) => <Link to={`/doubts/${doubt._id}`} key={doubt._id} ><DoubtCard doubt={doubt}/></Link>)
            }
          </div>
        </div>}
      </div>
    </div>
  )
}

export default DoubtStore