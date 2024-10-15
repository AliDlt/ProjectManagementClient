import React from "react";
import CustomButton from "../../modules/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

function Categories({ selectHandler, categories }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <CustomButton className="bg-blue-700 hover:bg-blue-700/90">
          پروژه های تعمیر خودرو
        </CustomButton>
        <Link
          className="text-custom-primary-color flex justify-center items-center"
          to="edit-category"
        >
          <MdModeEdit size={25} />
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <CustomButton className="bg-blue-900 hover:bg-blue-900/90">
          پروژه های معماری
        </CustomButton>
        <Link
          className="text-custom-primary-color flex justify-center items-center"
          to="edit-category"
        >
          <MdModeEdit size={25} />
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <CustomButton className="bg-red-700 hover:bg-red-700/90">
          پروژه های کوتاه مدت
        </CustomButton>
        <Link
          className="text-custom-primary-color flex justify-center items-center"
          to="edit-category"
        >
          <MdModeEdit size={25} />
        </Link>
      </div>
      <CustomButton
        className="mr-auto mt-5"
        onClick={() => navigate("add-new-category")}
      >
        <IoMdAdd size={20} />
        دسته بندی جدید
      </CustomButton>
    </div>
  );
}

export default Categories;
