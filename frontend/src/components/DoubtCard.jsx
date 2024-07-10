import React from 'react'
import { userAvatar } from '../utils/constants'
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { backendURI } from '../utils/constants';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
// import useGetAllDoubts from '../hooks/useGetAllDoubts';
const DoubtCard = ({doubt}) => {
  const {authUser} = useSelector((store) => store.user)

  const deleteReply = async(e,id) => {
    e.preventDefault();
    try{
      axios.defaults.withCredentials = true
      const result = await axios.patch(`${backendURI}/doubt/delete/${id}`,{id},{
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials:true
      })
      toast.success(result?.data?.message)
      // useGetAllDoubts()
    }
    catch(error){
      toast.error(error?.response?.data?.message);
    }
  }


  return (
    
        <div className='rounded-md  p-3 flex flex-col gap-5 bg-slate-800 text-white'>
            <div>
                <p className='text-2xl font-black'>{doubt?.content}</p>
            </div>
            <div className='flex justify-between items-center self-baseline text-sm w-full'>
              <div className='flex gap-3 items-center'>
                <img src={doubt.owner?.avatar || userAvatar} alt="user-avatar" className='w-6 rounded-full'></img>
                <p>{doubt.owner?.username}</p>
                <p className='text-xs'>{doubt?.createdAt?.split( 'T' )[0]}</p>
              </div>
              {authUser?._id === doubt.owner._id ?
                (<div className='text-lg'>
                <button onClick={(e) => {deleteReply(e,doubt._id); }}><MdDelete/></button>
              </div>):null}
            </div>
        </div>
  )
}

export default DoubtCard