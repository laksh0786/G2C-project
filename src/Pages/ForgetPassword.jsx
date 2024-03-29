import React, { useState } from 'react'
import forgetpic from '../assets/Forgot password-cuate (1).png'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { forgetPasswordController } from '../services/auth-controller';

const ForgetPassword = () => {

    const [pwdData, setData] = useState({
        email : "" , password : "" , newPassword: "" ,  confirmPassword : ""
    });

    const [showoldPassword, setoldPassword] = useState(false);
    const [shownewPassword, setnewPassword] = useState(false);
    const [showconfirmPassword, setconfirmPassword] = useState(false);

    const changeHandler = (e) => {

        setData((prev)=>{
            return {
                ...prev , [e.target.name] : e.target.value
            }
        })

    }

    const clickHandler = async ()=>{

        // alert("Password change request !!!!");
        console.log(pwdData);
        const response = await forgetPasswordController(pwdData);
        console.log(response);

    }

    return (
        <div className='flex justify-center my-5 '>

            <div className='flex max-h-[650px] bg-white max-w-[900px] rounded-lg px-5'>

                <div>
                    <img className='w-[570px] h-[620px]' src={forgetpic} alt="forget password" />
                </div>

                <div className='w-[340px] flex flex-col mt-2 p-5'>

                    <h1 className='text-3xl text-gray-500 my-2'>Change Password</h1>

                    <p className='text-[12px] my-2'>Kindly enter the Email Address tied with your account, we would help you reset your password. </p>


                    {/* Email input box */}
                    <div className="mt-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" name="email" onChange={changeHandler} required />
                    </div>


                    {/* Old Password Input box */}
                    <label className='w-full relative mt-5'>

                        <p className='text-[0.875rem] text-richblack-900 mb-1 leading-[1.375rem]'>Old Password</p>

                        <input className='rounded-[0.5rem] text-richblack-900 w-full p-[8px] border-2'
                            type={showoldPassword ? ("text") : ("password")} required placeholder='Enter Password'
                            name="password" value={pwdData.password} onChange={changeHandler} maxLength={12}/>

                        <span className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setoldPassword((prev) => !prev)}>
                            {
                                showoldPassword ?
                                    <AiOutlineEye fontSize={20} fill='#AFB2BF' /> :
                                    <AiOutlineEyeInvisible fontSize={20} fill='#AFB2BF' />
                            }
                        </span>
                    </label>


                    {/* New Password Input box */}
                    <label className='w-full relative mt-5'>

                        <p className='text-[0.875rem] text-richblack-900 mb-1 leading-[1.375rem]'>New Password</p>

                        <input className='rounded-[0.5rem] text-richblack-900 w-full p-[8px] border-2'
                            type={shownewPassword ? ("text") : ("password")} required placeholder='Enter Password'
                            name="newPassword" value={pwdData.newPassword} onChange={changeHandler} maxLength={12}/>

                        <span className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setnewPassword((prev) => !prev)}>
                            {
                                shownewPassword ?
                                    <AiOutlineEye fontSize={20} fill='#AFB2BF' /> :
                                    <AiOutlineEyeInvisible fontSize={20} fill='#AFB2BF' />
                            }
                        </span>
                    </label>


                    {/* Confirm Password Input box */}
                    <label className='w-full relative mt-5'>

                        <p className='text-[0.875rem] text-richblack-900 mb-1 leading-[1.375rem]'>Confirm Password</p>

                        <input className='rounded-[0.5rem] text-richblack-900 w-full p-[8px] border-2'
                            type={showconfirmPassword ? ("text") : ("password")} required placeholder='Enter Password'
                            name="confirmPassword" value={pwdData.confirmPassword} onChange={changeHandler} maxLength={12} />

                        <span className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setconfirmPassword((prev) => !prev)}>
                            {
                                showconfirmPassword ?
                                    <AiOutlineEye fontSize={20} fill='#AFB2BF' /> :
                                    <AiOutlineEyeInvisible fontSize={20} fill='#AFB2BF' />
                            }
                        </span>
                    </label>


                    <button className='text-sm mt-10 text-slate-300 bg-cyan-950 py-1.5 rounded-md' type='button' onClick={clickHandler}>Recover Password</button>

                </div>

            </div>

        </div>
    )
}

export default ForgetPassword