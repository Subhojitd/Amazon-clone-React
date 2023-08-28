import React, { useEffect, useState } from "react";
import { productsData } from "../../api/api";
import StarIcon from '@mui/icons-material/Star';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/AmazonSlice";

const Product = () => {

  const dispatch = useDispatch()
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await productsData();
        setProductData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6  xl:gap-10 px-4">
      {productData.map((item) => (
        <div key={item.id} className="bg-white h-auto border-[1px] border-gray-200 py-8 z-30 hover:border-transparent shadownone hover:shadow-testShadow duration-200 flex flex-col gap-4 relative rounded-md group">
          
          <span className="text-xs capitalize italic absolute top-2 right-2 text-gray-500">{item.category}</span>

          <div
            className="w-full h-auto flex items-center justify-center relative"
          >
            
            <img
              className="w-52 h-64 object-contain"
              src={item.image}
              alt="ProductImage"
            />

            <ul className="w-50% h-36 bg-gray-100 absolute right-0 bottom-[-170px] flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r rounded-tl-md group-hover:bottom-0 duration-700">
                <li className="productLi">Compare{" "}<CompareArrowsIcon/></li>
                <li className="productLi">Add to Cart{" "}<ShoppingCartIcon/></li>
                <li className="productLi">View details {" "}<ArrowCircleRightIcon/></li>
                <li className="productLi">Add to Wishlist{" "}<FavoriteIcon/></li>
            </ul>

            
          </div>
          <div className="px-4 z-10 bg-white">
            <div className="flex items-center justify-between">
              <h2 className="font-titleFont tracking-wide text-lg text-amazon_blue font-medium">{item.title.substring(0, 20)}</h2>
              <p className="text-xs text-gray-600 font-semibold">₹{" "}{(item.price * 82).toFixed(2)}</p>
            </div>
            <div>
                <p className="text-sm mb-1">{item.description.substring(0,100)}.....</p>
                <div className="text-yellow-500">
                    <StarIcon/>
                    <StarIcon/>
                    <StarIcon/>
                    <StarIcon/>
                </div>
            </div>
            <button onClick={()=>dispatch(addToCart({
              id: item.id,
              title: item.title,
              description: item.description,
              price: item.price,
              category: item.category,
              image: item.image,
              quantity:1,
            }))} className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to yellow-200 border hover:from-yellow-300 hover:to-yellow-500 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:toyellow-500 duration-200 py-1.5 rounded-md mt-3">Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
