import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { decreaseQuantity, deleteItem, increaseQuantity, resetCart } from "../redux/AmazonSlice";


const Cart = () => {
  const products = useSelector((state) => state.amazon.products);
  const [totalPrice, setTotalPrice] = useState("")
  const dispatch = useDispatch();
  useEffect(()=>{
    let Total = 0;
    products.map((item)=>{
      Total += item.price * item.quantity;
      return setTotalPrice(Total.toFixed(2));
    },[products])
  })
  return (
    <div className="w-full bg-gray-100 p-4">
      <div className=" container mx-auto h-auto grid grid-cols-5 gap-8">
        {/* Left section */}
        <div className="w-full h-full bg-white px-4 col-span-4 rounded-lg ">
          <div className=" font-titleFont flex items-center justify-between border-b-[1px] border-b-gray-400 py-3">
            <h2 className="text-3xl font-medium">Shopping Cart</h2>
            <h4 className="text-xl font-normal">Sub-total</h4>
          </div>
          <div>
            {products.map((item) => (
              <div
                key={item.id}
                className="w-full border-b-[1px] border-b-gray-300 p-4 flex items-center gap-6"
              >
                <div className="w-1/5">
                  <img
                    className="w-full h-44 object-contain"
                    src={item.image}
                    alt="product image"
                  />
                </div>
                <div className="w-3/5">
                  <h2 className="font-medium text-lg mb-1.5">{item.title}</h2>
                  <p className="pr-2 text-sm">{item.description.substring(0,150)}</p>
                  <p className="text-base">
                    Unit Price <span className=" font-medium">₹ {item.price}</span>
                  </p>
                  <div className="bg-[#f0f2f2] flex justify-center items-center gap-1 w-24 py-1 text-center drop-shadow-lg rounded-md">
                    <p>Qty:</p>
                    <p onClick={()=>dispatch(decreaseQuantity(item.id))} className="text-xl cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300 "> &nbsp;- </p>
                    <p>{item.quantity}</p>
                    <p onClick={()=>dispatch(increaseQuantity(item.id))} className="text-xl cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300"> + </p>
                  </div>
                  <button onClick={()=>dispatch(deleteItem(item.id))} className="bg-red-500 w-36 py-1 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-300 ">Delete Item</button>
                </div>
                <div>
                  <p className="text-lg tracking-wide font-titleFont font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Products end here */}
          {/* Clear Cart */}
          <div className="w-full flex items-center justify-end">
            <button onClick={()=>dispatch(resetCart())} className="bg-red-500 w-36 py-2 rounded-lg text-white m-3 hover:bg-red-700 active:bg-red-900 duration-300 font-titleFont tracking-wide ">Clear Cart</button>
          </div>
        </div>

        {/* Left Section Ends */}
        {/* Right section */}
        <div className=" w-full h-52 bg-white col-span-1 flex flex-col items-center justify-center p-3.5 rounded-md">
              <div>
                <p className="flex gap-2 items-start text-sm">
                  <span><CheckCircleIcon className="bg-white text-green-500 rounded-full" /></span>
                  Your order qualifies for FREE Shipping Choose this option at checkout. See details....
                </p>
              </div>
              <div>
                <p className="font-semibold px-10 gap-2 py-1 flex items-center justify-between">Total: <span className="text-lg font-bold">₹{totalPrice}</span></p>
              </div>
              <button className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to yellow-200 border hover:from-yellow-300 hover:to-yellow-500 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:toyellow-500 duration-200 py-1 rounded-md ">Proceed to pay</button>
        </div>
        {/* Right Section Ends */}
        {/* Products Start Here */}
      </div>
    </div>
  );
};

export default Cart;
