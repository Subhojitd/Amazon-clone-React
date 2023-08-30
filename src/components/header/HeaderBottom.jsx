import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import SideHeaderContent from "./SideHeaderContent";
import { useSelector } from "react-redux";


const HeaderBottom = () => {
  const ref = useRef();
  const [showSideBar, setshowSideBar] = useState(false);
  const userInfo = useSelector((state) => state.amazon.userInfo)

  useEffect(()=>{
    document.body.addEventListener('click',(e)=>{
      if(e.target.contains(ref.current)){
        setshowSideBar(false)
      }
    })
  },[ref,showSideBar])

  return (
    <div className="w-full px-4 h-[36px] bg-amazon_light text-white flex items-center">
      {/* List Item starts */}
      <ul className="flex font-bodyFont items-center gap-2 text-sm tracking-wide">
        <li
          onClick={() => setshowSideBar(true)}
          className="header-hover flex items-center gap-1"
        >
          {" "}
          <MenuIcon /> All
        </li>
        <li className="header-hover hidden mdl:inline-flex">Today's Deals</li>
        <li className="header-hover hidden mdl:inline-flex">Customer Service</li>
        <li className="header-hover hidden mdl:inline-flex">Gift Cards</li>
        <li className="header-hover hidden mdl:inline-flex">Registry</li>
        <li className="header-hover hidden mdl:inline-flex">Sell</li>
      </ul>
      {/* List Items Ends */}
      {/* Sidenav Start Here */}
      {showSideBar && (
        <div className="w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50">
          <div className="w-full h-full relative">
            <motion.div ref={ref}
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[80%] md:w-[350px] h-full bg-white
                     border border-black"
            >
              <div className="w-full bg-amazon_light text-white py-2 px-6 flex items-center gap-4">
                <AccountCircleSharpIcon />
                {
                  userInfo ? <h3 className=" font-titleFont capitalize font-bold text-lg tracking-wide">
                  {userInfo.userName} 
                </h3> : <h3 className=" font-titleFont font-bold text-lg tracking-wide">
                  Hello, Sign In{" "}
                </h3>
                }
              </div>
              {/* Side header Content */}
              <div className=" h-[90vh] overflow-y-scroll">
                <SideHeaderContent
                  title="Digital Content & Devices"
                  one="Amazon Music"
                  two="Kindle E-readers & Books"
                  three="Amazon Appstore"
                />

                <SideHeaderContent
                  title="Shop By Department"
                  one="Electronics"
                  two="Computers"
                  three="Smart Home"
                />

                <SideHeaderContent
                  title="Programs & Features"
                  one="Gift Cards"
                  two="Amazon Live"
                  three="International Shopping"
                />

                <SideHeaderContent
                  title="Help & Settings"
                  one="Your Account"
                  two="Customer Service"
                  three="Sign In"
                />
              </div>
              <span
                onClick={() => setshowSideBar(false)}
                className=" cursor-pointer absolute top-0 left-[71%] mdl:left-[360px] w-10 h-10 text-black flex items-center justify-center  border bg-gray-200 hover:bg-red-500 hover:text-white duration-200 rounded-sm"
              >
                <CloseSharpIcon />
              </span>
              {/* Animated close Btn */}
            </motion.div>
          </div>
        </div>
      )}
      {/* SideNav end here */}
    </div>
  );
};

export default HeaderBottom;
