import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import CustomModal from "../../modules/CustomModal";
import CustomInput from "../../modules/CustomInput";
import CustomButton from "../../modules/CustomButton";
import { GrSearch } from "react-icons/gr";
import { Link } from "react-router-dom";

function ProjectUsers() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mt-10">
        <h3 className="text-20 font-extrabold">لیست کاربران</h3>
        <CustomInput
          className="hidden py-1 rounded-custom w-72 ml-auto mr-12 md:flex"
          placeholder="جستجو"
          icon={
            <GrSearch className="-scale-x-100 text-custom-primary-color w-5 h-5 ml-2" />
          }
        />
        <div className="flex justify-center items-center gap-5">
          <span className="hidden md:block">اضافه کردن کاربر </span>
          <CustomButton
            className=" flex justify-center items-center ring-2 ring-custom-primary-color bg-white rounded-full size-10 p-0 hover:bg-custom-primary-color group"
            onClick={() => setOpen(true)}
          >
            <IoAddOutline
              size={25}
              className="text-custom-primary-color rounded-full group-hover:text-white"
            />
          </CustomButton>
        </div>
      </div>
      <div className="grid grid-cols-3 mt-5 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 md:mt-10">
        <Link to={`/users/${1}`} className="p-2">
          لاله شیرپور
        </Link>
        <Link to={`/users/${2}`} className="p-2">
          سمیرا امیری
        </Link>
        <Link to={`/users/${3}`} className="p-2">
          علیرضا مرادی
        </Link>
        <Link to={`/users/${4}`} className="p-2">
          مهراد احمدی
        </Link>
        <Link to={`/users/${5}`} className="p-2">
          علی باقری
        </Link>
        <Link to={`/users/${6}`} className="p-2">
          امیر سحرخیز
        </Link>
        <Link to={`/users/${7}`} className="p-2">
          زهرا کریمی
        </Link>
        <Link to={`/users/${8}`} className="p-2">
          محمد کریم پور
        </Link>
        <Link to={`/users/${9}`} className="p-2">
          محسن کارگر
        </Link>
      </div>
      <CustomModal
        open={open}
        onCancel={() => setOpen(false)}
        title="اضافه کردن کاربر به پروژه"
      ></CustomModal>
    </div>
  );
}

export default ProjectUsers;
