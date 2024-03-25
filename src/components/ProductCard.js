import React from 'react'
import login from "../assets/login.png"
import { NavLink } from 'react-router-dom';

const ProductCard = (props) => {

    const { data } = props;

    return (

        <div>

            {/* Card Container */}
            <div className='max-w-[900px] grid sm:grid-cols-2 md:grid-cols-3 gap-10 mx-auto'>

                {/* Card - 1 */}
                {
                    data.map((product, index) => {
                        return (
                            <div key={index}>
                                {/* Card */}
                                <div className="max-w-[300px] sm:max-w-full flex flex-col overflow-hidden shadow-md border-2  rounded-md border-gray-600 shadow-pink-100 bg-slate-50 cursor-pointer hover:scale-110 hover:shadow-[#6fc2b0] hover:shadow-lg duration-500" key={index}>

                                    {/* Product Image */}
                                    <img className="w-full h-[220px] shadow-md shadow-gray-400" src={`https://g2c-backend.onrender.com/uploads/products/${product.images}`} alt="product pic" />

                                    {/* Product Details */}
                                    <div className="px-6 py-3">
                                        <div className="font-bold text-xl text-blue-950 border-b-2 border-orange-400 ">{product.name}</div>
                                        <p className="text-gray-800 pt-2 leading-[18px] text-[14px]">
                                            Description : {product.description}
                                        </p>
                                        <p className="text-gray-800 pt-1 leading-[18px] text-[14px]">
                                            Price : {product.price} per {product.unit}
                                        </p>
                                        <p className="text-gray-800 pt-1 leading-[18px] text-[14px]">
                                            Category : {product.category}
                                        </p>

                                        {/*Product Code*/}
                                        <div className='pt-1 text-center'>

                                            {/* get Details Button */}
                                            <NavLink to={`/product/${product._id}`}>
                                                <button className=' bg-gray-700 rounded-[8px] font-medium text-gray-100 hover:bg-pink-500 duration-300 px-[8px] py-[5px] mt-4'>Get Details</button>
                                            </NavLink>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default ProductCard