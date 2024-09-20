import React, { useState } from "react";

import CustomButton from "./CustomButton";
import { MdDelete } from "react-icons/md";
import IconFile from "../ui/IconFile";
import CustomModal from "./CustomModal";
import { useToast } from "../../Context/ToastContext";
import { getFileFormat } from "../../utils/tools";
import { IoMdDownload } from "react-icons/io";
import { useQueryClient } from "@tanstack/react-query";
import { AiOutlineInfo } from "react-icons/ai";
import { IoEyeSharp } from "react-icons/io5";

const CustomSlideFIle = ({ item, mutate, isPending }) => {
  const toast = useToast();
  const [description, showDescription] = useState(false);
  const [modal, showModal] = useState(false);
  const queryClient = useQueryClient();
  const deleteFile = () => {
    mutate(
      { id: item.sectionId, fileName: item.fileName },
      {
        onSuccess: (e) => {
          toast(e.message, "success");
          queryClient.invalidateQueries(["get-report", item.sectionId]);
          showModal(false);
        },
        onError: (e) => {
          console.log(e);
          return toast(e.response.data.message, "error");
        },
      },
    );
  };
  return (
    <div className="h-full flex justify-center items-center flex-col gap-2">
      <div className="relative w-full  rounded-custom  bg-black bg-opacity-5 h-[150px] flex flex-col justify-center items-center  border-2 border-custom-primary-color ">
        <div className="absolute left-2 top-2 flex gap-1">
          <CustomButton
            onClick={() => showDescription(true)}
            className=" bg-white hover:text-white  p-1 h-10  w-10 border-2 border-custom-primary-color border-solid rounded-full text-20 text-custom-primary-color  "
          >
            <IoEyeSharp size={25} />
          </CustomButton>
          <CustomButton
            onClick={() => showModal(true)}
            className=" bg-white hover:text-white  p-1 h-10  w-10 border-2 border-custom-primary-color border-solid rounded-full text-20 text-custom-primary-color  "
          >
            <MdDelete size={25} />
          </CustomButton>

          <CustomButton className=" bg-white hover:text-white  p-1 h-10  w-10 border-2 border-custom-primary-color border-solid  rounded-full text-20 text-custom-primary-color  ">
            <a href={item.fileURL}>
              <IoMdDownload size={25} />
            </a>
          </CustomButton>
        </div>

        <span className="text-4xl text-black text-opacity-50">
          <IconFile type={getFileFormat(item.fileName)} />
        </span>
      </div>
      <div className=" absolute right-2 bottom-2  line-clamp-1 w-10/12  ">
        <p className="text-14   "> {item.description} </p>
      </div>
      <CustomModal title={"حدف فایل"} onCancel={showModal} open={modal}>
        <h3 className="mt-3">آیا از حذف فایل مطمئن هستید ؟</h3>
        <div className="flex gap-2 justify-end items-center">
          <CustomButton
            loading={isPending}
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
      <CustomModal
        onCancel={showDescription}
        title={"توضیحات فایل"}
        open={description}
      >
        <p className="pt-4">{item?.description}</p>
      </CustomModal>
    </div>
  );
};

export default CustomSlideFIle;
