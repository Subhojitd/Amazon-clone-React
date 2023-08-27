import React from "react";
import FooterMiddleList from "./FooterMiddleList";
import { MiddleList } from "../../constants";

const FooterMiddle = () => {
  return (
    <div className=" w-full bg-amazon_light text-white flex items-center ">
      {/*-----Top Part----- */}
      <div className=" w-full border-b-[1px] border-gray-500 py-10">
        <div className="max-w-5xl mx-auto text-gray-300">
          <div className=" w-full grid grid-cols-4 place-items-center items-start">
            {MiddleList.map((item) => (
              <FooterMiddleList
                key={item.id}
                title={item.title}
                listItem={item.ListItem}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterMiddle;
