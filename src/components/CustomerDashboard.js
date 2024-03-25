import React from 'react'
import profile from "../assets/Profile (2).png"
import { NavLink } from 'react-router-dom'

const CustomerDashboard = () => {
    return (
        <div className='flex flex-col mx-10 flex-wrap gap-12'>

            <h1 className='text-2xl text-gray-400 '>Customer Dashboard</h1>

            <div className='flex justify-center flex-wrap gap-x-8'>


                {/* Profile Card */}
                <div className="max-w-[300px] sm:max-w-full flex flex-col overflow-hidden border-2  rounded-md border-gray-600 shadow-pink-100 bg-slate-50 cursor-pointer hover:scale-110 hover:shadow-[#6fc2b0] hover:shadow-lg duration-500">

                    {/* Image */}
                    <img className="w-full h-[250px] shadow-md shadow-gray-400" src={profile} alt="product pic" />


                    <div className="px-6 py-3">

                        <div className="font-bold text-xl text-blue-950 border-b-2 border-orange-400 ">Profile</div>

                        <div className='pt-1 text-center'>

                            {/*Button */}
                            <NavLink to="/profile">
                                <button className=' bg-gray-700 rounded-[8px] font-medium text-gray-100 hover:bg-pink-500 duration-300 px-[8px] py-[5px] mt-4'>Open</button>
                            </NavLink>

                        </div>

                    </div>
                </div>


                {/*Filter Product Card */}
                <div className="max-w-[300px] sm:max-w-full flex flex-col overflow-hidden border-2  rounded-md border-gray-600 shadow-pink-100 bg-slate-50 cursor-pointer hover:scale-110 hover:shadow-[#6fc2b0] hover:shadow-lg duration-500">

                    {/*Image */}
                    <img className="w-full h-[250px] shadow-md shadow-gray-400" src={profile} alt="product pic" />


                    <div className="px-6 py-3">

                        <div className="font-bold text-xl text-blue-950 border-b-2 border-orange-400 ">Filter Products</div>

                        <div className='pt-1 text-center'>

                            {/*Button */}
                            <NavLink to="/filterproducts">
                                <button className=' bg-gray-700 rounded-[8px] font-medium text-gray-100 hover:bg-pink-500 duration-300 px-[8px] py-[5px] mt-4'>Filter</button>
                            </NavLink>

                        </div>

                    </div>
                </div>


                {/*Settings Card */}
                <div className="max-w-[300px] sm:max-w-full flex flex-col overflow-hidden border-2  rounded-md border-gray-600 shadow-pink-100 bg-slate-50 cursor-pointer hover:scale-110 hover:shadow-[#6fc2b0] hover:shadow-lg duration-500">

                    {/* Image */}
                    <img className="w-full h-[250px] shadow-md shadow-gray-400" src={profile} alt="product pic" />


                    <div className="px-6 py-3">

                        <div className="font-bold text-xl text-blue-950 border-b-2 border-orange-400 ">Settings</div>

                        <div className='pt-1 text-center'>

                            {/* Button */}
                            <NavLink to="">
                                <button className=' bg-gray-700 rounded-[8px] font-medium text-gray-100 hover:bg-pink-500 duration-300 px-[8px] py-[5px] mt-4'>Click</button>
                            </NavLink>

                        </div>

                    </div>
                </div>



            </div>

        </div>
    )
}

export default CustomerDashboard