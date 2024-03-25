import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductAndGrowerDetails } from '../services/product-controller';

const ProductPage = () => {

    // console.log(useParams());
    const { productId } = useParams();
    console.log(productId);
    const [productDetails, setProductDetails] = useState({
        product: {},
        grower: {}
    });

    async function fetchProductAndGrowerDetails() {

        const response = await getProductAndGrowerDetails(productId);
        // console.log(response.data);
        if (response.data.success === true) {
            // console.log(response.data);
            setProductDetails((prev) => {
                return {
                    ...prev,
                    product: response.data.product,
                    grower: response.data.grower
                }
            })
        }
        else {
            alert(response.data.message);
            // console.log(response.data.message);
        }

    }

    useEffect(() => {
        fetchProductAndGrowerDetails();
    }, []);

    return (
        <div className=" max-w-[1200px] rounded-lg mx-auto bg-gray-100 dark:bg-gray-800 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                            <img className="w-full h-full object-cover rounded-lg" src={`https://g2c-backend.onrender.com/uploads/products/${productDetails.product.images}`} alt="Product Image" />
                        </div>
                        <div className="flex -mx-2 mb-4">
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                            </div>
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
                            </div>
                        </div>
                    </div>

                    {/* Product And Grower Details */}
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{productDetails.product.name}</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            <i>Sold By </i><span className="text-gray-800 dark:text-white font-bold">{productDetails.grower.name}</span>
                        </p>
                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                                <span className="text-gray-600 dark:text-gray-300"> Rs. {productDetails.product.price} per {productDetails.product.unit} </span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                                <span className="text-gray-600 dark:text-gray-300">In Stock</span>
                            </div>
                        </div>
                        
                        <div className='flex gap-x-2 mb-4'>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Category: </span>
                            <p className="text-gray-600 dark:text-gray-300">
                                {(productDetails.product.category)}
                            </p>
                        </div>

                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                {productDetails.product.description}
                            </p>
                        </div>

                        <hr className='h-1 my-5 bg-slate-300 rounded-md'/>

                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Grower Details</h2>

                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Name: </span>
                                <span className="text-gray-600 dark:text-gray-300">{productDetails.grower.name}</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Contact: </span>
                                <span className="text-gray-600 dark:text-gray-300">{productDetails.grower.contact}</span>
                            </div>
                        </div>

                        <div className='flex gap-x-2 mb-4'>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Email: </span>
                            <p className="text-gray-600 dark:text-gray-300">
                                {(productDetails.grower.email)}
                            </p>
                        </div>

                        <div className='flex gap-x-2 mb-4'>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Address: </span>
                            <p className="text-gray-600 dark:text-gray-300">
                                {(productDetails.grower.address)}
                            </p>
                        </div>


                        <div className="flex gap-x-4 flex-wrap mb-4">

                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Vilage : </span>
                                <span className="text-gray-600 dark:text-gray-300">{productDetails.grower.village}</span>
                            </div>
                            
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">City : </span>
                                <span className="text-gray-600 dark:text-gray-300">{productDetails.grower.city}</span>
                            </div>                            
                            
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">State : </span>
                                <span className="text-gray-600 dark:text-gray-300">{productDetails.grower.state}</span>
                            </div>

                        </div>
                        

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage