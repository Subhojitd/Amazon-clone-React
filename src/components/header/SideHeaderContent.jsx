import React from "react";
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';


const SideHeaderContent = ({title,one,two,three}) => {
  return (
    <div className="py-3 border-b-[1px] border-b-gray-300">
      <h3 className="text-lg font-titleFont font-bold mb-1 px-6">
        {title}
      </h3>
      <ul className="text-sm ">
        <li className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer">
          {one}
          <span>
            <KeyboardArrowRightSharpIcon />
          </span>
        </li>
        <li className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer">
          {two}
          <span>
            <KeyboardArrowRightSharpIcon />
          </span>
        </li>
        <li className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer">
          {three}
          <span>
            <KeyboardArrowRightSharpIcon />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SideHeaderContent;
