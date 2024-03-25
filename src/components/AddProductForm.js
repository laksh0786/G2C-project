import React from 'react'
import { addProductController } from '../services/product-controller';

const AddProductForm = (props) => {

    const { changeHandler, productData } = props;

    const submitHandler = async () => {
        // console.log(productData);
        const prodData = new FormData();

        for (let key in productData) {
            prodData.append(key, productData[key]);
        }

        const response = await addProductController(prodData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 200) {
            alert("Product Added Successfully");
        }
        else {
            alert("Error Adding Product " , response.data.message);
        }

    }

    return (
        <div className="max-w-[600px] w-full p-10 flex flex-col gap-6">

            {/* <div className="relative z-0 w-full mb-5 group">

                <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-richblack-5 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" value={productData.email} required />

                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>

            </div> */}

            <div className="grid md:grid-cols-2 md:gap-6">

                <div className="relative z-0 w-full mb-5 group">

                    <input type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-richblack-5 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={changeHandler} value={productData.name} />

                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Name</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="price" id="price" className="block py-2.5 px-0 w-full text-sm text-richblack-5 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={changeHandler} value={productData.price} required />
                    <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price (in Rs)</label>
                </div>
            </div>

            <div>
                <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-500">Quantity</label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input type="text" name="quantity" id="quantity" className="block bg-transparent w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="1" onChange={changeHandler} value={productData.quantity} />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <label htmlFor="units" className="sr-only">Units</label>
                        <select id="units" name="unit" className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" onChange={changeHandler} value={productData.unit}>
                            <option>Unit</option>
                            <option value="kg">Kg</option>
                            <option value="lt">Lt</option>
                            <option valu="nos">Nos</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="category" className="mb-2 text-sm font-medium text-gray-500">Select Category</label>
                <select id="category" name="category" className="bg-transparent border-2 rounded-md border-gray-300 text-gray-500 text-sm outline-none focus:ring-blue-500 focus:border-blue-500  w-full py-2 px-1" onChange={changeHandler} value={productData.category}>
                    <option>Select</option>
                    <option value="diary">Diary Products</option>
                    <option value="fruit">Fruits</option>
                    <option value="vegetable">Vegetables</option>
                    <option value="honey">Honey</option>
                    <option value="dals">Dals and Pulses</option>
                    <option value="others">Others</option>
                </select>
            </div>



            <div className="relative z-0 w-full mb-5 group">

                <textarea type="text" name="description" id="description" className="block py-2.5 px-0 w-full text-sm text-richblack-5 bg-transparent border-0 border-b-2 border-gray-300 appearance-noned focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " rows={1} onChange={changeHandler} value={productData.description} required></textarea>

                <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Description</label>

            </div>


            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={submitHandler}>Add Product</button>
        </div>
    )
}

export default AddProductForm