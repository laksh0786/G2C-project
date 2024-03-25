import React, { useState } from 'react'
import ProductCard from '../components/ProductCard';

const FilterProducts = (props) => {

  const { data } = props;

  const distinctCategories = [...new Set(data.map(product => product.category))];
  const distinctCities = [...new Set(data.map(product => product.city))];
  // console.log(distinctCities);

  const [filters , setFilters] = useState({
    category : '',
    city : ''
  })

  const [filteredData , setFilteredData] = useState([...data])

  const updateHandler = (e)=>{
    const {name , value} = e.target;
    setFilters({...filters , [name] : value})
  }

  const filterHandler = async ()=>{
    
    let tempData = [...data]
    console.log(tempData);

    if(filters.category !== ''){
      tempData = tempData.filter(product => product.category === filters.category)
    }

    if(filters.city !== ''){
      tempData = tempData.filter(product => product.city === filters.city)
    }

    console.log(tempData);
    setFilteredData(tempData);
    
  }


  return (
    <div className='max-w-[1200px] mx-auto flex flex-col gap-y-10'>

      {/* Filters */}
      <div className=" p-2 flex flex-wrap justify-center gap-x-20 gap-y-5">

        {/* Category Combo Box */}
        <div className=' w-2/6 md:w-1/5'>

          <div className="">
            <label htmlFor="category" className="block font-medium leading-6 text-gray-200">Category</label>
            <div className="mt-2">
              <select id="category" name="category" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" onChange={updateHandler}>

                <option>Select</option>
                {
                  distinctCategories.map((category, index) => {
                    return (
                      <option key={index} value={category}>{category}</option>
                    )
                  })
                }

              </select>
            </div>
          </div>
        </div>

        {/* City Combo Box */}
        <div className='w-2/6 md:w-1/5'>

          <div className="">
            <label htmlFor="city" className="block font-medium leading-6 text-gray-200">City</label>
            <div className="mt-2">
              <select id="city" name="city" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" onChange={updateHandler}>

                <option>Select</option>

                {
                  distinctCities.map((city, index) => {
                    return (
                      <option key={index} value={city}>{city}</option>
                    )
                  })
                }

              </select>
            </div>
          </div>

        </div>


        {/* Filter Products Button */}
        <div>
          <button type='button' className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[25px] py-[8px] mt-6' onClick={filterHandler}>Filter</button>
        </div>

      </div>

      <ProductCard data={filteredData}/>

    </div>
  )
}

export default FilterProducts