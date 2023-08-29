import React from 'react'
import { logo } from '../assets'

const SignIn = () => {
  return (
    <div className='w-full'>
      <div className='w-full bg-gray-100 pb-10'>
        <form className='w-[350px] mx-auto flex flex-col items-center'>
          <img className='w-32' src={logo} alt="logo" />
          <div className='w-full border border-zinc-200 p-6'>
            <h2 className='font-titleFont text-3xl font-medium mb-4' >Sign In</h2>

          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn