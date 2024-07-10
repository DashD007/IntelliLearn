import axios from 'axios';
import React, { useRef,useEffect } from 'react'
import { IoSearchOutline } from "react-icons/io5";
// import {SERP_API_KEY } from "../utils/constants.js";
import { useDispatch, useSelector} from 'react-redux';
import { setRelatedSearches, setResearchPapers } from '../redux/researchSlice.js';
import ResearchCard from '../components/ResearchCard.jsx';
import researchlogo from "../assests/images/Research paper-pana.svg"
import { useNavigate } from 'react-router-dom';
const Summarizer = () => {
    const dispatch = useDispatch()
    const {authUser} = useSelector((store) => store.user)
    
    const navigate = useNavigate();

    useEffect(()=> {
        if(!authUser){
            navigate("/login");
        }
    },[authUser,navigate])

    const searchValue = useRef();
    const searchHandler = async(e) => {
        e.preventDefault();
        try{
            const result = await axios.get(`https://api.serpdog.io/scholar?api_key=${process.env.REACT_APP_SERP_API_KEY}&q=${searchValue.current.value}`)
            dispatch(setResearchPapers(result?.data?.scholar_results));
            dispatch(setRelatedSearches(result?.data?.related_searches));
        }
        catch(error){
            console.log(error)
        }
    }

    const {ResearchPapers} = useSelector((store) => store.research);
    const {RelatedSearches} = useSelector((store) => store.research);
  return (
    <div className={`min-h-screen ${ResearchPapers?.length ? "grid grid-cols-5" :""} `}>
        <div className=''>
        </div>
        <div className={`max-w-[1000px] grid-cols-subgrid col-span-3 mx-auto  ${ResearchPapers?.length ?"border-r-2":""} flex flex-col gap-5 px-5`}>
            <div className='mt-10 w-full'>
                <form onSubmit={(e)=>{searchHandler(e)}} className='flex gap-5 w-[60%] mx-auto'>
                    <input ref={searchValue} type="text" placeholder="Search your research paper here" className='border-black border input rounded-full w-full px-4 py-3'/>
                    <button type="submit" className='rounded-full border border-black text-2xl px-3'><IoSearchOutline /></button>
                </form>
            </div>
            {ResearchPapers.length ?
                (<div className='flex flex-col gap-3  mx-auto'>
                    {
                        ResearchPapers?.map((paper, index) => <ResearchCard result={paper} key={index}/>)
                    }
                </div>):
                (<div>
                    <img src={researchlogo} alt="research-logo" className='object-center w-[500px] mx-auto mt-10 aspect-square' />
                </div>)
            }
        </div>
        <div >
            {RelatedSearches?.length && 
            <div className='mt-10 '>
                <h1 className='text-center font-bold text-xl'>Related Searches</h1>
                <div className='mt-4 flex flex-col gap-2 px-5'>
                    {RelatedSearches?.map((ele, index) => <p key={index} onClick={(e)=>{searchValue.current.value = ele?.title; searchHandler(e)} } className="cursor-pointer text-lg" >{ele?.title}</p>)}
                </div>
            </div>}
        </div>
    </div>
  )
}

export default Summarizer