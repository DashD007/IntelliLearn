import React, { useRef,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import useGetDoubtWithReplies from '../hooks/useGetDoubtWithReplies';
import { useSelector } from 'react-redux';
import { backendURI, userAvatar } from '../utils/constants';
import {IoMdSend} from "react-icons/io"
import axios from 'axios';
import toast from 'react-hot-toast';
import ReplyCard from '../components/ReplyCard';

const DoubtPage = () => {

  const {authUser} = useSelector((store) => store.user);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  useEffect(()=> {
      if(!authUser){
          navigate("/login");
      }
  },[authUser,navigate])
    const {id} = useParams();
    useGetDoubtWithReplies(id);
    
    const {doubtTree} = useSelector((store) => store.doubt);
    const reply = useRef();
    function autoRefresh() {
      window.location = window.location.href;
    }
    const addReply = async(e,id,content) => {
      e.preventDefault();
      try{
        axios.defaults.withCredentials = true
        const result = await axios.post(`${backendURI}/doubt/add/${id}`,{
          content,
        },{
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials:true
        })
        toast.success(result?.data?.message);
        reply.current.value = '';
        autoRefresh()
      }
      catch(error){
        toast.error(error?.response?.data?.message)
      }
    }

    

  return doubtTree ?(
    <div className='w-full min-h-screen'>
        <div className='max-w-[1200px] mx-auto flex flex-col gap-6'>
            <div className='mt-10 border rounded-md px-4 py-3 flex flex-col gap-6 bg-slate-800 text-white'>
                <p className='text-2xl font-bold'>{doubtTree?.content}</p>
                <div className='flex gap-3 items-center'>
                  <img src={doubtTree.owner?.avatar || userAvatar} alt="user-avatar" className='w-6 rounded-full'/>
                  <p className=''>{doubtTree.owner?.username}</p>
                  <p>{doubtTree?.createdAt?.split( 'T' )[0]}</p>
                </div>
            </div>
            {doubtTree?.replies && <div className='flex flex-col gap-2'>
              {doubtTree?.replies.map((reply) => <ReplyCard key={reply._id} reply={reply} addReply={addReply} doubtId={id}/>)}
            </div>}
            <div>
              <form className='w-[80%] mx-auto flex gap-4 items-center' onSubmit={(e) => addReply(e,doubtTree._id,reply.current.value)}>
                <textarea type="text" ref={reply} placeholder="Enter your solution here" className='border border-black rounded-md flex-1 px-3 py-2'></textarea>
                <button className='border border-black rounded-full p-4 text-xl' type='submit'><IoMdSend/></button>
              </form>
            </div>
        </div>
    </div>
  ) : null
}

export default DoubtPage