import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../../assets/index";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import SearchIcon from "@mui/icons-material/Search";
import { AllListItems } from "../../constants";
import HeaderBottom from "./HeaderBottom";
import { useSelector } from "react-redux";

const Header = () => {
  const [showDropdown, setshowDropdown] = useState(false);
  const products = useSelector((state) => state.amazon.products);

  return (
    // Header Container
    <div className="w-full sticky top-0 z-50">
      <div className="w-full bg-amazon_blue text-white px-4 py-2 flex items-center md:justify-between sm:justify-between gap-4">

        {/* logo */}
        <Link to="/">
          <div className="header-hover">
            <img className="w-24 mt-2" src={logo} alt="logo" />
          </div>
        </Link>

        {/* location and delivery  */}
        <div className="header-hover gap-2 hidden mdl:inline-flex">
          <PlaceOutlinedIcon />
          <p className="text-sm text-lightText font-light flex flex-col">
            Deliver to{" "}
            <span className="text-sm font-medium -mt-1 text-whiteText">
              Basirhat
            </span>
          </p>
        </div>

        {/* Search Bar */}
        <div className="h-10 rounded-md hidden lgl:flex flex-grow relative">
          <span
            onClick={() => setshowDropdown(!showDropdown)}
            className=" w-14 h-full bg-gray-200  hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md"
          >
            All
            <span>
              <ArrowDropDownOutlinedIcon />
            </span>
          </span>
          {showDropdown && (
            <div>
              <ul className=" absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2 flexcol gap-1 z-50 rounded-md">
                {/* dropdown-items */}
                {AllListItems.map((item) => (
                  <li
                    key={item.id}
                    className="text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200"
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <input
            className="h-full text-base text-amazon_blue text-m font-bodyFont flex-grow outline-none border-none px-2"
            type="text"
            placeholder="Search Amazon"
          />
          <span className="w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md">
            <SearchIcon />
          </span>
        </div>
        {/* Search Bar ends */}
        {/* sign in starts */}
        <Link to="/signin">
          <div className="flex flex-col items-start justify-center header-hover">
            <p className="text-sm mdl:text-xs text-white mdl:text-lightText font-light">
              Hello, Sign in
            </p>
            <p className="text-sm font-medium -mt-1 text-whiteText hidden mdl:inline-flex">
              Accounts & Lists{" "}
              <span>
                <ArrowDropDownOutlinedIcon />
              </span>
            </p>
          </div>
        </Link>
        {/* Sign In Ends */}
        {/* Orders */}
        <div className="hidden lgl:flex flex-col items-start justify-center header-hover">
          <p className="text-xs text-lightText font-light">Returns</p>
          <p className="text-sm font-medium -mt-1 text-whiteText ">
            & Orders
          </p>
        </div>
        {/* Cart-Section */}
        <Link to="/cart">
        <div className="flex items-start justify-center header-hover relative p-1 gap-1">
          <ShoppingCartRoundedIcon />
          <p className="text-xs font-medium mt-3 text-whiteText">
            Cart
            <span className="absolute text-xs -top-1 left-5 font-medium p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center">
              {products.length > 0 ? products.length : 0}
            </span>
          </p>
        </div>
        </Link>
        {/* Cart-End */}
      </div>
      {/* Header Bottom */}
      <HeaderBottom />
    </div>
  );
};

export default Header;
