import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  decreaseQuantity,
  deleteItem,
  increaseQuantity,
  resetCart,
} from "../redux/AmazonSlice";
import { emptyCart } from "../assets/index";
import { motion } from "framer-motion";

const Cart = () => {
  const products = useSelector((state) => state.amazon.products);
  const [totalPrice, setTotalPrice] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    let Total = 0;
    products.map(
      (item) => {
        Total += item.price * item.quantity;
        return setTotalPrice(Total.toFixed(2));
      },
      [products]
    );
  });
  return (
    <div className="w-full bg-gray-100 p-4">
      {products.length > 0 ? (
        <div className="container mx-auto h-auto  lgl:grid lgl:grid-cols-5 gap-8">
          {/* Left section */}
          <div className="w-full h-full bg-white px-4 col-span-4 rounded-lg ">
            <div className=" font-titleFont flex items-center justify-center  md:justify-between border-b-[1px] border-b-gray-400 py-3">
              <h2 className="text-3xl font-medium">Shopping Cart</h2>
              <h4 className="text-xl hidden md:inline-flex font-normal ">Sub-total</h4>
            </div>
            <div>
              {products.map((item) => (
                <div
                  key={item.id}
                  className="w-full border-b-[1px] border-b-gray-300  p-4 flex flex-col justify-center  lg:flex-row items-center lg:items-stretch lg:gap-6"
                >
                  <div className="w-full lg:w-1/5">
                    <img
                      className="w-full h-64 lg:h-44 object-contain"
                      src={item.image}
                      alt="productimage"
                    />
                  </div>  
                  <div className="w-full lg:w-3/5">
                    <h2 className="font-medium text-lg mb-1.5">{item.title}</h2>
                    <p className="pr-2 text-sm">
                      {item.description.substring(0, 150)}
                    </p>
                    <p className="text-base">
                      Unit Price{" "}
                      <span className=" font-medium">₹ {(item.price*82).toFixed(2 )}</span>
                    </p>
                    <div className="bg-[#f0f2f2] flex justify-center items-center gap-1 w-24 py-1 text-center drop-shadow-lg rounded-md">
                      <p>Qty:</p>
                      <p
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="text-xl cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300 "
                      >
                        {" "}
                        &nbsp;-{" "}
                      </p>
                      <p>{item.quantity}</p>
                      <p
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="text-xl cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300"
                      >
                        {" "}
                        +{" "}
                      </p>
                    </div>
                    <button
                      onClick={() => dispatch(deleteItem(item.id))}
                      className="bg-red-500 w-36 py-1 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-300 "
                    >
                      Delete Item
                    </button>
                  </div>
                  <div>
                    <p className=" hidden lg:inline-flex text-lg tracking-wide font-titleFont font-medium">
                      ₹{(item.price * item.quantity * 82).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Products end here */}
            {/* Clear Cart */}
            <div className="w-full flex items-center justify-end">
              <button
                onClick={() => dispatch(resetCart())}
                className="bg-red-500 w-36 py-2 rounded-lg text-white m-3 hover:bg-red-700 active:bg-red-900 duration-300 font-titleFont tracking-wide "
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Left Section Ends */}
          {/* Right section */}
          <div className=" w-full h-64 p-3.5 gap-3  lg:h-52 bg-white col-span-1 flex flex-col items-center justify-center  rounded-md">
            <div>
              <p className="flex gap-2 items-start text-sm">
                <span>
                  <CheckCircleIcon className="bg-white text-green-500 rounded-full" />
                </span>
                Your order qualifies for FREE Shipping Choose this option at
                checkout. See details....
              </p>
            </div>
            <div>
              <p className="font-semibold px-10 gap-2 py-1 flex items-center justify-between">
                Total: <span className="text-lg font-bold">₹{(totalPrice * 82).toFixed(2)}</span>
              </p>
            </div>
            <button className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to yellow-200 border hover:from-yellow-300 hover:to-yellow-500 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:toyellow-500 duration-200 py-1 rounded-md ">
              Proceed to pay
            </button>
          </div>
          {/* Right Section Ends */}
          {/* Products Start Here */}
        </div>
      ) : (
        <motion.div
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col lg:flex-row  items-center justify-center gap-4 py-10"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCartImg"
            />
          </div>
          <div className=" w-64 lg:w-96 p-4 bg-white flex flex-col items-center rounded-md shadow-lg gap-2">
            <h1 className="font-titleFont text-xl font-bold">
              Your Cart is Empty
            </h1>
            <p className="text-sm text-center">
              Add something to the card of your choice and continue shopping. .
              .
            </p>
            <Link to="/">
              <button className="mt-6 bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 px-8 py-2 font-titleFont font-semibold text-lg">
                Add Something !{" "}
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
