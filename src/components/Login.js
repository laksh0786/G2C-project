import React, { useState } from 'react'
import pattern from "../assets/frame.png"
// import { FcGoogle } from "react-icons/fc"
import { loginController } from '../services/auth-controller'
import loginImg from '../assets/login.jpg'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
// import { Link} from 'react-router-dom'
// import toast from 'react-hot-toast'


const Login = (props) => {

  const navigate = useNavigate();

  const { setLoggedIn } = props;

  const [userData, setData] = useState({
    email: "", password: ""
  });
  //   console.log(userData);
  const [showPassword, setShowPassword] = useState(false);

  //updating user data on change
  function changeHandler(e) {

    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev, [name]: value
      }
    })

  }

  //login handler
  const loginHandler = async () => {
    const response = await loginController(userData);
    // console.log(response);

    if (response.data.success === true) {
      
      setLoggedIn(true);
      console.log(response.data.token);
      localStorage.setItem('token', response.data.token);

      navigate('/dashboard');
    }

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

        <form className='flex flex-col w-full gap-y-4 mt-6'>

          {/* If we write input tag inside label then it automatically links with the label */}

          {/* Email Address Input box */}
          <label className='w-full '>

            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>

            <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 border-b-richblack-700' type='email' required placeholder='Enter email address'
              name="email" value={userData.email} onChange={changeHandler} />

          </label>

          {/* Password Input box */}
          <label className='w-full relative'>

            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Password<sup className='text-pink-200'>*</sup></p>

            <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 border-b-richblack-700'
              type={showPassword ? ("text") : ("password")} required placeholder='Enter Password'
              name="password" value={userData.password} onChange={changeHandler} />

            <span className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
              {
                showPassword ?
                  <AiOutlineEye fontSize={24} fill='#AFB2BF' /> :
                  <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />
              }
            </span>

            {/* <Link to="#">
              <p className='text-right text-blue-100 text-xs mt-1'>Forgot Password</p>
            </Link> */}

          </label>

          <button type='button' className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6' onClick={loginHandler}>Login</button>

        </form>

        <div className='flex w-full items-center my-4 gap-x-2'>
          <div className='w-full h-[1px] bg-richblack-700'></div>
          <p className='text-richblack-700 font-medium leading-[1.375rem] '>OR</p>
          <div className='w-full h-[1px] bg-richblack-700'></div>
        </div>

      </div>

      <div className='hidden lg:block lg:relative lg:max-w-[450px] '>
        <img src={pattern} alt="Pattern" width={558} height={504} loading="lazy" />
        <img className='absolute -top-4 right-4 h-[400px] w-[450px]'
          src={loginImg} alt="" loading="lazy" ></img>
      </div>

    </div>
  )
}

export default Login