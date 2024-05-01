import React, { useEffect, useState } from 'react'
import Hero from '../../../components/Hero'
// import Slider from '@mui/material/Slider';
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import Pagination from '@mui/material/Pagination';
import Card from '../../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByFilterAsync,  selectAllProducts, selectTotalProducts } from '../productSlice';
function ProductList() {
const [sort,setSort]=useState({});
const [currentpage,setCurrentPage]=useState(1);
const [filter,setFilter]=useState({});

    const dispatch=useDispatch();
    const products=useSelector(selectAllProducts);
    const total=useSelector(selectTotalProducts);
    console.log(total)
    
    // const [value, setValue] = useState([20, 37]);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  // function valuetext(value) {
  //   return `${value}°C`;
  // }

 function handleFilter(e)
 {
  let newfilter={...filter}
  if(e.target.checked)
  {
 if(filter[e.target.name])
 {
  newfilter[e.target.name].push(e.target.value)
 }
 else{
  newfilter[e.target.name]=[e.target.value];
}}
else{
  newfilter[e.target.name]=newfilter[e.target.name].filter(v=>v!==e.target.value)
}
setFilter(newfilter);
 }

 function handleSort(type)
{
  let sort={_sort:"discountPrice",_order:type};
  console.log(sort);
  setSort(sort);
}

function handlePagination(e,v)
{
  console.log(currentpage)
  setCurrentPage(v);
}

useEffect(()=>{
  let pagination={_page:currentpage,_limit:30}
  console.log("useffect")
 dispatch(fetchProductByFilterAsync({filter,sort,pagination}))
},[dispatch,currentpage,sort,filter])

  return (
    <>
    <div className='w-[90vw] mx-auto'>
    <Hero/>
    <div className=' flex   my-[5vh]  gap-5'>
        <div className=' w-[270px] h-max  px-[1vw] py-[2vh] bg-neutral-20 '>
     <div className=''>
        <p className='text-neutral-400 text-[20px] font-bold'>Sort By</p>
        <div className='  space-y-2 mt-5'>
        <div className=' flex justify-between'>
            <p className='text-neutral-400 text-[14px]'>Price</p>
            <div className='  flex gap-2 '>
            <button onClick={()=>handleSort("asc")}  className=' bg-primary-300 p-1 grid place-content-center  w-[22px] h-[22px] text-white rounded-md'><FaArrowDown  size={12}/></button>
                <button onClick={()=>handleSort("desc")} className=' bg-primary-300 grid place-content-center  p-1 w-[22px] h-[22px] text-white rounded-md'><FaArrowUp size={12}/></button>
            </div>
        </div>
        </div>
     </div>
     {/* <div className=' mt-3'>
        <p className='text-neutral-400 text-[20px] font-bold'>Price Range</p>
        <div className='  space-y-2 mt-5'>
        <div className=' flex justify-between'>
            <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
        </div>
        </div>
     </div> */}
     <div className='mt-3'>
        <p className='text-neutral-400 text-[20px] font-bold'>Categories</p>
        <div className='  space-y-2 mt-5'>
        <div className=' flex justify-between'>
         <span className='text-neutral-400 text-[14px]'>Smartphone</span>
         <input type="checkbox"  onChange={handleFilter} value="smartphones" name='category'   className='w-[20px] h-[20px] rounded-md p-4  ' />
        </div>
        <div className=' flex justify-between'>
         <span className='text-neutral-400 text-[14px]'>Tablets</span>
         <input type="checkbox" onChange={handleFilter} value="tablets" name='category'  className='w-[20px] h-[20px] rounded-md p-4  ' />
        </div>
        <div className=' flex justify-between'>
         <span className='text-neutral-400 text-[14px]'>Laptops</span>
         <input type="checkbox" onChange={handleFilter} value="laptops" name='category' className='w-[20px] h-[20px] rounded-md p-4  ' />
        </div>
        </div>
     </div>
     <div className='mt-3'>
        <p className='text-neutral-400 text-[20px] font-bold'>Brands</p>
        <div className='  space-y-2 mt-5'>
        <div className=' flex justify-between'>
         <span className='text-neutral-400 text-[14px]'>Samsung</span>
         <input type="checkbox" onChange={handleFilter} value="Samsung" name='brand' className='w-[20px] h-[20px] rounded-md p-4  ' />
        </div>
        <div className=' flex justify-between'>
         <span className='text-neutral-400 text-[14px]'>Apple</span>
         <input type="checkbox" onChange={handleFilter} value="Apple" name='brand' className='w-[20px] h-[20px] rounded-md p-4  ' />
        </div>
        </div>
     </div>
    
        </div>
        <div  className=' flex-1 h-max '>
            <div className=' flex flex-wrap  gap-1     bg-[#F6F9FF] '>
         {Array.isArray(products) &&products?.map((value,index)=>
         <Card data={value} key={index} />
         )}
         </div>
        <div className=' bg-white mt-5  '>
    <Pagination  page={currentpage} onChange={handlePagination}     count={Math.floor(total<30?1:Math.ceil(total/30))} variant="outlined" color="primary" />
    </div>
    {/* } */}
          
        </div>
       
    </div>
    
    </div>
    </>
  )
}

export default ProductList
