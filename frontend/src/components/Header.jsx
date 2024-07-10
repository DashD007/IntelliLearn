import React from 'react'
import {Link} from "react-router-dom"
import Button from './Button'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import axios from 'axios'
import { backendURI } from '../utils/constants'
import { setAuthUser } from '../redux/userSlice'
import {setallDoubts, setdoubtTree} from "../redux/doubtSlice.js"
import {setResearchPapers, setRelatedSearches} from "../redux/researchSlice.js"

const Header = () => {
  const {authUser} = useSelector((store) => store?.user);
  const dispatch = useDispatch()
  const logoutHandler = async() => {

    try {
      axios.defaults.withCredentials = true
      await axios.patch(`${backendURI}/user/logout`,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      }).then((res) => {toast.success("user logged out successfully"); 
        dispatch(setAuthUser(null))
        dispatch(setallDoubts([]));
        dispatch(setdoubtTree([]));
        dispatch(setResearchPapers([]));
        dispatch(setRelatedSearches([]));})
      .catch((error)=> {toast.error(error.response.data?.message)})
    } catch (error) {
      toast.error(error?.message);
    }
  }

  return (
    <div className=' border-gray-400 border-b z-20 top-0 sticky bg-white'>
      <div className='flex justify-between items-center px-5 py-3 mx-auto max-w-[1200px] '>
        <div className='text-3xl font-bold'>
          IntelliLearn
        </div>
        <div className='flex items-center gap-4'>
          {authUser ? (<div>
            <ul className='list-none flex gap-4 text-lg'>
              <Link to="/home"><li>Home</li></Link>
              <Link to="/doubts"><li>Doubt Store</li></Link>
              <Link to="/summarize"><li>AI Summarizer</li></Link>
              <Link to="/profile"><li>Profile</li></Link>
            </ul>
          </div>) : null}
          
          <div>
            {
              !authUser ? (
                <Link to="/login">
                <Button text={"Login"} />
                </Link>
              ): <div onClick={logoutHandler}>
                <Button text={"Logout"}  />
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header