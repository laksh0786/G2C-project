import React, { useState } from 'react'
import pattern from "../assets/frame.png"
// import { FcGoogle } from "react-icons/fc"
import { signupController } from '../services/auth-controller'
import loginImg from '../assets/login.png'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
// import toast from 'react-hot-toast'

const Signup = () => {

  const navigate = useNavigate();

  const [userData, setData] = useState({
    email: "", name: "", password: "", confirmPassword: "", type: ""
  });
  //   console.log(userData);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [accountType, setAccountType] = useState("Grower");

  //updating user data on change
  function changeHandler(e) {

    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev, [name]: value
      }
    })

  }

  //signup handler
  const signupHandler = async () => {

    let newData = { ...userData, type: accountType };
    const response = await signupController(newData);

    if (response.data.success === false) {
      alert(response.data.message);
      return;
    }

    alert("Signup Successfull. Welcome, " + response.data.user.name);

    navigate('/signin');

  }


  return (
    <div className=' flex w-11/12 max-w-[1160px] h-screen py-10 mx-auto justify-center lg:justify-between gap-y-0'>

      <div className='w-11/12 max-w-[550px] lg:max-w-[450px]' >

        <h1 className='text-richblack-5 font-semibold  text-[1.875rem] leading-[2.375rem]'>Welcome Back</h1>

        <p className='text-[1.125rem] leading-[1.625rem] mt-4'>
          <span className='text-richblack-100'>Build Skills for today , tomorrow , and beyond</span>
          <br />
          <span className='text-blue-100 italic'>Education to future-proof your career.</span>
        </p>

        <div>

          {/* Grower and Customer Button */}
          <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>

            <button className={(accountType === "Grower" ?
              "bg-richblack-900 text-richblack-5 " :
              "bg-transparent  text-richblack-200 ") + "py-2 px-5 rounded-full transition-all duration-200"}
              onClick={() => {
                setAccountType("Grower");
              }}>Grower</button>

            <button className={(accountType === "Customer" ?
              "bg-richblack-900 text-richblack-5 " :
              "bg-transparent  text-richblack-200 ") + "py-2 px-5 rounded-full transition-all duration-200"}
              onClick={() => {
                setAccountType("Customer");
              }}>Customer</button>

          </div>

          <form className='flex flex-col w-full gap-y-4 mt-6'>

            {/* Name */}
            <div className='flex gap-x-4'>

              <label className='w-full'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                  Full Name
                  <sup className='text-pink-200'>*</sup>
                </p>

                <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 border-b-richblack-700'
                  type="text" required placeholder='Enter full name'
                  name="name" value={userData.name} onChange={changeHandler} />

              </label>

            </div>

            {/* Email Address */}
            <label className='w-full'>
              <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Email Address
                <sup className='text-pink-200'>*</sup>
              </p>

              <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 border-b-richblack-700'
                type="email" required placeholder='Enter email address'
                name="email" value={userData.email} onChange={changeHandler} />
            </label>

            {/* Password and Confirm Password */}
            <div className='flex gap-x-4' >

              <label className='w-full relative'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                  Password
                  <sup className='text-pink-200'>*</sup>
                </p>

                <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 border-b-richblack-700'
                  type={showPassword ? "text" : "password"} required placeholder='Enter your password'
                  name="password" value={userData.password} onChange={changeHandler} />

                <span className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
                  {
                    showPassword ?
                      <AiOutlineEye fontSize={24} fill='#AFB2BF' /> :
                      <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />
                  }
                </span>
              </label>

              <label className='w-full relative'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                  Confirm Password
                  <sup className='text-pink-200'>*</sup>
                </p>

                <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 border-b-richblack-700'
                  type={showConfirmPassword ? "text" : "password"} required placeholder='Re-enter password'
                  name="confirmPassword" value={userData.confirmPassword} onChange={changeHandler} />

                <span className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setConfirmShowPassword((prev) => !prev)}>
                  {
                    showConfirmPassword ?
                      <AiOutlineEye fontSize={24} fill='#AFB2BF' /> :
                      <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />
                  }
                </span>
              </label>

            </div>

            <button className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6' type="button" onClick={signupHandler}>Create Account</button>

          </form>

        </div>

        <div className='flex w-full items-center my-4 gap-x-2'>
          <div className='w-full h-[1px] bg-richblack-700'></div>
          <p className='text-richblack-700 font-medium leading-[1.375rem] '>OR</p>
          <div className='w-full h-[1px] bg-richblack-700'></div>
        </div>

      </div>

      <div className='hidden lg:block lg:relative lg:max-w-[450px] '>
        <img src={pattern} alt="Pattern" width={558} height={504} loading="lazy" />
        <img className='absolute -top-4 right-4'
          src={loginImg} alt="" width={558} height={490} loading="lazy" ></img>
      </div>

    </div>
  )
}

export default Signup