import React, { useEffect, useState } from 'react'
import ProductTable from '../components/ProductTable'
import { getAllProductController } from '../services/product-controller';
import { authController } from '../services/auth-controller';
import { useNavigate } from 'react-router-dom';

const ProductManager = () => {

    const navigate = useNavigate();
    const [email , setEmail] = useState("");
    const [userAllProducts , setAllProducts] = useState([]);

    const validateUser = async () => {

        const token = localStorage.getItem('token');

        if (token === null) {
            navigate('/signin');
        }

        const response = await authController();
        console.log(response);
        setEmail(response.data.payload.email);
    }

    useEffect(()=>{
        validateUser();
    } , [])

    async function clickHandler(){

        const response = await getAllProductController(email);
        
        if(response.status === 200){
            if(response.data.length === 0){
                alert("No Products Found");
            }
            else{
                setAllProducts(response.data.products);
                console.log(response.data);
            }
        }
        else{
            alert("Error Fetching Data" , response.data.message);
        }
    }

    return (
        <div className='mt-5 w-full flex flex-col gap-y-5'>

            <div className='flex justify-center gap-x-5'>

                <label for="email" class="block mt-2 mx-2 text-sm font-medium leading-6 text-gray-200">Email</label>


                <div class="relative rounded-md shadow-sm">
                    <input type="email" name="email" id="email" class="block w-full min-w-[300px] rounded-md border-0 py-1.5 pl-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={email} readOnly />
                </div>


                <button type='button' className='border border-gray-300 text-gray-200 px-2 rounded-lg' onClick={clickHandler}>Fetch Data</button>

            </div>

            <ProductTable data={userAllProducts} />
        </div>
    )
}

export default ProductManager