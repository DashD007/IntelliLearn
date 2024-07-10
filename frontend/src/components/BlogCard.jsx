import React from 'react'
import { blogPlaceholder } from '../utils/constants';
const BlogCard = ({blog}) => {
  return (
    <div className="border border-gray-400 rouded-md p-2 w-[250px] h-[280px] flex flex-col gap-3 rounded-md">
      <div className="h-1/2 border rounded-md">
        <img
          src={blog?.banner || blogPlaceholder}
          alt="blog-banner"
          className=" w-full h-full object-center rounded-md"
        />
      </div>
      <div>
        <p className="text-lg font-bold ">
          {blog?.title}
        </p>
      </div>
    </div>
  );
}

export default BlogCard