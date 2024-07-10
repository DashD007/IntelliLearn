import React, { useRef } from 'react'
import { userAvatar } from '../utils/constants'
import { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaReply } from "react-icons/fa";
import {IoMdSend} from "react-icons/io";
import { MdCancel } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';
import { backendURI } from '../utils/constants';
import { useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

const ReplyCard = ({reply, addReply, doubtId}) => {
    const inputValue = useRef();
    const [ShowInput,setShowInput] = useState(false);
    const navigate = useNavigate();
    // const {doubtId} = useParams();
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
          navigate(`/doubts/${doubtId}`)
        }
        catch(error){
          toast.error(error?.response?.data?.message);
        }
      }

  return (
    <div className='flex flex-col gap-4' >
        <div className='px-3 py-2 flex flex-col gap-4 border ml-6 rounded-md border-gray-600'>
            <div className='flex flex-col gap-3'>
                <p>{reply?.content}</p>
                {
                    ShowInput && <input type='text' ref={inputValue} placeholder='Enter your reply here' autoFocus className='border border-gray-600 rounded-md h-10 w-[40%] px-3'/>
                }
                {
                    !ShowInput ? (<div className='flex gap-3'>
                        <button className='text-lg' onClick={() => setShowInput(true)}><FaReply/></button>
                        {authUser?._id === reply.owner._id ? <button className='text-lg' onClick={(e) => deleteReply(e,reply?._id)}><MdDelete/></button> : null}
                    </div>)
                    : (<div className='flex gap-3'>
                        <button className='text-lg' onClick={(e) => {addReply(e,reply._id,inputValue.current.value); setShowInput(false); inputValue.current.value = ""} } ><IoMdSend/></button>
                        <button className='text-lg' onClick={() => setShowInput(false)}><MdCancel/></button>
                    </div>)
                }
            </div>
            <div className='flex gap-3 items-center'>
                <img src={reply.owner?.avatar || userAvatar} alt="user-avatar" className='w-6 rounded-full'/>
                <p className=''>{reply.owner?.username}</p>
                <p>{reply?.createdAt?.split( 'T' )[0]}</p>
            </div>

        </div>
        <div className='ml-6'>
            {
                reply?.replies.map((reply) => <ReplyCard key={reply._id} reply={reply} addReply={addReply}/>) 

            }
        </div>
    </div>
  )
}

export default ReplyCard