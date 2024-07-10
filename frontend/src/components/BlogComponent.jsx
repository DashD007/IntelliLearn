import React from 'react'
import { blogPlaceholder, userAvatar } from '../utils/constants'

const BlogComponent = ({title,banner,content,owner,createdAt}) => {

  return (
        <div className='p-3 flex flex-col gap-3 border border-gray-500 rounded-md'>
            <div className='h-1/3 flex justify-center items-center object-cover'>
                <img src={ banner || blogPlaceholder} alt="blog-banner" className='border border-gray-500 rounded-md w-full aspect-video object-cover '/>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='text-3xl font-bold truncate'>{title}</p>
                <p className='text-lg truncate'>{content}</p>
            </div>
            <div className='flex gap-3 items-center'>
                <img src={owner?.avatar || userAvatar} alt="user-avatar" className='w-8 h-8 rounded-full' />

                <p>{owner?.username}</p>
                <p>{createdAt?.split("T")[0]}</p>
            </div>
        </div>  
  )
}

export default BlogComponent