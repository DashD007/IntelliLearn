import React from 'react'
import Button from './Button'
import { Link} from 'react-router-dom'
const LandingComponent = ({swap, src, heading, sub, basicText, btnText}) => {
  
  return (
    <div className=''>
        <div className={`max-w-[1200px] mx-auto flex  h-screen items-center justify-between ${swap ? 'flex-row-reverse':''}`}>
            <div className='w-[40%] flex flex-col gap-6'>
                <p className='font-Sunday text-8xl text-red-800'>{heading}</p>
                <p className='text-4xl font-bold'>{sub}</p>
                <p className='text-lg'>{basicText}</p>
                <div className='flex '>
                  <Link to="/signup">
                    <Button text={btnText} className="flex-start"/>
                  </Link>
                </div>
            </div>
            <div className='w-[50%] '>
                <img src={src} alt="landing_page_component_image" className='object-center' />
            </div>
        </div>
    </div>
  )
}

export default LandingComponent