import React from "react";

function Free() {
  const data = [
    {
      photo: "/src/assets/free/free.svg",
      heading: "Free Shipping",
      subHeading: "Free Shipping on all orders",
    },
    {
      photo: "/src/assets/free/money.svg",
      heading: "Money Gurentee",
      subHeading: "30 day money back",
    },
    {
      photo: "/src/assets/free/online.svg",
      heading: "Online Support",
      subHeading: "24/7 online support",
    },
    {
      photo: "/src/assets/free/secure.svg",
      heading: "Secure Payment",
      subHeading: "UPI, Wallets, cards and cash.",
    },
  ];
  return <>
  <div className=" flex flex-wrap justify-between">
  {data.map(value=>
    <div className=" flex gap-3 items-center ">
        <div>
            <img src={value?.photo} alt="" />
        </div>
        <div className="   mt-[8px] text-neutral-200 leading-5 flex flex-col flex-1">
        <p className="text-[24px] font-semibold">{value?.heading}</p>
        <p className="text-[12px] ">{value?.subHeading}</p>
        </div>
    </div>
    )}
    </div>
  </>;
}

export default Free;
