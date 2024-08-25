import React from "react";
import { SwiperSlide } from "swiper/react";
import CustomButton from "./CustomButton";
import { MdDelete } from "react-icons/md";
import IconFile from "../ui/IconFile";

const CustomSlideFIle = ({ item, onClickDelete }) => {
  return (
    <div className="h-full flex justify-center items-center flex-col gap-2">
      <div className="relative w-full  rounded-custom  bg-black bg-opacity-5 h-[150px] flex flex-col justify-center items-center  border-2 border-custom-primary-color ">
        <CustomButton
          onClick={onClickDelete}
          className="absolute bg-white hover:text-white  p-1 h-8 border-2 border-custom-primary-color border-solid w-8 rounded-full text-20 text-custom-primary-color  left-4 top-4"
        >
          <MdDelete />
        </CustomButton>
        <span className="text-4xl text-black text-opacity-50">
          <IconFile type={item.fileFormat} />
        </span>
      </div>
      <p className="text-14 absolute right-3 bottom-3">اسم فایل </p>
    </div>
  );
};

export default CustomSlideFIle;
