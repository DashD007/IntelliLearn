import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBookOpen } from "react-icons/fa";
import { MdSummarize } from "react-icons/md";
// import { summarizer_key } from '../utils/constants';
import {toast} from "react-hot-toast"

const ResearchCard = ({result}) => {
    const [SummarizeData,setSummarizeData] = useState();
    const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_SUMMARIZER_KEY,
          'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com'
        }
      };
    const summarizeHandler = async(title) =>{

        try {
            
            const response = await fetch(`https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${title}`,options);
            const text = await response.text()
            const data = await JSON.parse(text)
            setSummarizeData(data?.summary)
        } catch (error) {
            toast.error("Cannot summarize this research paper")
        }
    }
  return (
    <div className='rounded-md border border-gray-600 flex flex-col gap-3 px-3 py-4 '>
        <Link to={result?.title_link} target='_blank' ><p className='text-xl font-bold'>{result?.title}</p></Link>
        <p className='text-sm'>{result?.displayed_link}</p>
        <p>{result?.snippet}</p>
        <div className='flex gap-4'>
            <Link to={result?.inline_links?.cited_by?.link}><p>{result?.inline_links?.cited_by?.total}</p></Link>
            <Link to={result?.inline_links?.related_pages_link}><p>related articles</p></Link>
        </div>
        <div className='flex gap-3'>
            <Link to={result?.title_link} target='_blank'><button className='flex items-center rounded-md border border-gray-500 py-2 px-3 gap-2'><FaBookOpen/><p>Read</p></button></Link>
            {result?.resources && result?.resources[0].type === "HTML" &&
                <button className='flex items-center border border-gray-500 rounded-md py-2 px-3 gap-2' onClick={() => {summarizeHandler(result?.resources[0]?.link)}}><MdSummarize/> <p>Summarize</p></button>
            }
        </div>
        { SummarizeData &&
            <div className='m-2 rounded-md border border-gray-600 text-md text-justify px-3 py-2'>
                <p className='font-bold'>Summary:</p>
                <p>
                    {SummarizeData}
                </p>
            </div>
        }
    </div>
  )
}

export default ResearchCard