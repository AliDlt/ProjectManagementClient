import React, { useState } from "react";
import { SwiperSlide } from "swiper/react";
import CustomButton from "./CustomButton";
import { MdDelete } from "react-icons/md";
import IconFile from "../ui/IconFile";
import CustomModal from "./CustomModal";

const CustomSlideFIle = ({ item, mutate, isPending }) => {
  const [modal, showModal] = useState(false);
  const deleteFile = () => {
    mutate(
      { id: item.sectionId, fileName: item.fileName },
      {
        onSuccess: (e) => {
          console.log(e)
          console.log("ss");
        },
        onError: (e) => {
          console.log("first");
          console.log(e);
        },
      },
    );
  };
  return (
    <div className="h-full flex justify-center items-center flex-col gap-2">
      <div className="relative w-full  rounded-custom  bg-black bg-opacity-5 h-[150px] flex flex-col justify-center items-center  border-2 border-custom-primary-color ">
        <CustomButton
          onClick={() => showModal(true)}
          className="absolute bg-white hover:text-white  p-1 h-8 border-2 border-custom-primary-color border-solid w-8 rounded-full text-20 text-custom-primary-color  left-4 top-4"
        >
          <MdDelete />
        </CustomButton>
        <span className="text-4xl text-black text-opacity-50">
          <IconFile type={item.fileFormat} />
        </span>
      </div>
      <p className="text-14 absolute right-3 bottom-3">اسم فایل </p>
      <CustomModal title={"حدف فایل"} onCancel={showModal} open={modal}>
        <h3 className="mt-3">آیا از حذف فایل مطمعن هستید ؟</h3>
        <div className="flex gap-2 justify-end items-center">
          <CustomButton
            onClick={deleteFile}
            className="w-14 p-2 bg-red-500 hover:bg-transparent hover:text-red-500 transition-all border-red-500 border-2"
          >
            {" "}
            بله{" "}
          </CustomButton>
          <CustomButton
            onClick={() => showModal(false)}
            className="w-14 p-2 hover:text-custom-primary-color hover:bg-transparent border-custom-primary-color border-2 transition-all"
          >
            {" "}
            خیر{" "}
          </CustomButton>
        </div>
      </CustomModal>
    </div>
  );
};

export default CustomSlideFIle;