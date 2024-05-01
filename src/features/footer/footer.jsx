import React from "react";
import { FaPinterest } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
function footer() {
  return (
    <>
      <div className=" grid grid-cols-3  relative h-[300px] py-[50px] bg-primary-400  justify-around  mx-auto text-white  gap-5">
       
        <div className=" place-self-center ">
        <Link to="/"><img src="/src/assets/logo/navbar_logo.png" className="  w-[300px] h-[200px]" alt="" />
        </Link></div>
        <div className="flex   place-self-center gap-6 flex-col">
          <p className="text-[24px] font-semibold">Contact</p>
          <a href="mailto:thakurnakul119@gmail.com">nyphr@gmail.com</a>
          <a href="">+917017846627</a>
        </div>
        <div className="  grid grid-cols-2 place-self-center items-center   justify-around  ">
          
          <div className=" flex flex-col gap-5 ">
          <a target="_nakul" href="https://pin.it/3o61D567c"><FaPinterest size={20} /></a>
          <a href=""><FaFacebook size={20} /></a>
          <a href=""><FaInstagram size={20}/></a>
        </div>
        </div>
        
      </div>
    </>
  );
}

export default footer;
