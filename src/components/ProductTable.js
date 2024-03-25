import React from 'react'

const ProductTable = (props) => {
    const { data } = props;
    return (
        <div className=" w-10/12 flex flex-col mx-auto mt-5">
            <div className=" overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className='text-center'>
                                    <th scope="col" className="py-2  font-medium text-gray-500">Image</th>
                                    <th scope="col" className="py-2  font-medium text-gray-500">Name</th>
                                    <th scope="col" className="py-2  font-medium text-gray-500">Category</th>
                                    <th scope="col" className="py-2  font-medium text-gray-500">Price</th>
                                    <th scope="col" className="py-2  font-medium text-gray-500">Ouantity</th>
                                    <th scope="col" className="py-2  font-medium text-gray-500">Description</th>
                                    <th scope="col" className="py-2  font-medium text-gray-500">Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((product, index) => {
                                        return (
                                            <tr key={index} className='text-center border-b transition duration-300 ease-in-out border-neutral-50 hover:bg-neutral-600'>
                                                <td className="py-2 whitespace-nowrap">
                                                    <img src={`https://g2c-backend.onrender.com/uploads/products/${product.images}`} alt="product pic" className="h-20 w-20 mx-auto rounded-md" />
                                                </td>
                                                <td className="py-2 whitespace-nowrap">
                                                    <div className="text-sm text-gray-200">{product.name}</div>
                                                </td>
                                                <td className="py-2 whitespace-nowrap">
                                                    <div className="text-sm text-gray-200">{product.category}</div>
                                                </td>
                                                <td className="py-2 whitespace-nowrap">
                                                    <div className="text-sm text-gray-200">{product.price}</div>
                                                </td>
                                                <td className="py-2 whitespace-nowrap">
                                                    <div className="text-sm text-gray-200">{product.quantity + " " + product.unit}</div>
                                                </td>
                                                <td className="py-2 whitespace-nowrap">
                                                    <div className="text-sm text-gray-200">{product.description}</div>
                                                </td>
                                                <td className="py-2 whitespace-nowrap">
                                                    <button className="text-indigo-300 mx-2 hover:text-indigo-900">Edit</button>
                                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductTable