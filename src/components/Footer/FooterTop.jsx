import React from 'react'

const FooterTop = () => {
  return (
    <div className='w-full bg-white py-6'>
        <div className='w-full border-t-[1px] border-b-[1px] py-8'>
            <div className=' w-64 mx-auto text-center flex flex-col gap-1'>
                <p className='text-sm '> See Personalised recommendations</p>
                <button className='w-full border-[2px] border-yellow-500 bg-yellow-400 rounded-md py-1 font-medium cursor-pointer hover:bg-yellow-500 active:bg-yellow-600'>Sign In</button>
                <p className=' text-xs mt-1'>New Customer?{" "} <span className=" text-blue-600 ml-1 cursor-pointer hover:text-orange-400">Start here.</span></p>
            </div>
        </div>
    </div>
  )
}

export default FooterTop