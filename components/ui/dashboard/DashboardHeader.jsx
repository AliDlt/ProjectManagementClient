import React from "react";
import { IoMdSettings } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import CustomInput from "../../modules/CustomInput";
import { MdOutlineSearch } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { Tooltip } from "antd";
import { useSideBar } from "../../../Context/SideBarContext";
import { useForm } from "react-hook-form";

function DashboardHeader() {
  const { setShow } = useSideBar();

  const { control } = useForm();

  return (
    <div className="flex justify-between items-center p-5 lg:px-8 gap-2">
      <h3 className="lg:block hidden">کاربر عزیز، به داشبورد خوش آمدید.</h3>
      <IoMenu
        className="text-custom-primary-color lg:hidden cursor-pointer"
        size={35}
        onClick={() => setShow(true)}
      />
      <CustomInput
        control={control}
        name="search"
        className={
          "  mx-auto md:w-80 xl:w-[30rem] lg:h-11 px-4 lg:px-6 placeholder:text-black"
        }
        icon={
          <MdOutlineSearch className="text-custom-primary-color -scale-x-100 w-5 h-5 lg:w-7 lg:h-7 ml-2" />
        }
        placeholder="جستجو"
      />
      <div className="flex justify-center items-center gap-2">
        <Tooltip title="اعلان ها">
          <button aria-label="notification">
            <IoNotifications
              className="text-custom-primary-color cursor-pointer"
              size={30}
            />
          </button>
        </Tooltip>
        <Tooltip title="تنظیمات">
          <button aria-label="setting">
            <IoMdSettings
              className="text-custom-primary-color cursor-pointer"
              size={30}
            />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default DashboardHeader;
