import React, { useEffect, useState } from 'react'
import AddProductForm from '../components/AddProductForm'
import { useNavigate } from 'react-router-dom';
import { authController } from '../services/auth-controller';

const AddProduct = () => {

    const navigate = useNavigate();
    const [imgPrev, setPrev] = React.useState('');

    const [productData, setData] = useState({
        name: "", email: "", price: "", quantity: "", unit: "", category: "", description: "", images: null
    })

    //updating productData object  on change
    const changeHandler = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {

            setData((prev) => {
                return { ...prev, [name]: files[0] }
            })
            console.log(files[0]);
            setPrev(URL.createObjectURL(files[0]));
        }

        else {
            setData((prev) => {
                return { ...prev, [name]: value };
            })
        }
    }


    //Validating the user
    const validateUser = async () => {

        const token = localStorage.getItem('token');

        if (token === null) {
            navigate('/signin');
        }

        const response = await authController();
        console.log(response);
        setData( {...productData , ["email"] : response.data.payload.email});
    }

    useEffect(() => {
        validateUser();
    }, []);

    return (
        <form className='flex justify-center gap-x-10'>

            {/* Product Pictures Preview */}
            <div className="flex flex-col items-center mt-20">
                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-500">Product Pictures</label>
                <div className="mt-2 flex flex-col items-center gap-x-3">
                    {
                        imgPrev
                            ?
                            <img src={imgPrev} alt="product pic" className="h-40 w-45 rounded-md" />
                            :
                            <svg className="w-32 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                            </svg>
                    }
                    <button type="button" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <label>
                            <span>Upload Pic</span>
                            <input name="images" type="file" className="sr-only" onChange={changeHandler} />
                        </label>
                    </button>
                </div>
            </div>

            <AddProductForm productData={productData} setData={setData} changeHandler={changeHandler} />

        </form>
    )
}

export default AddProduct