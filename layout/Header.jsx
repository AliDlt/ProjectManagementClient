import React from "react";
import { IoMdSettings } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import CustomInput from "../components/modules/CustomInput";
import { MdOutlineSearch } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { Tooltip } from "antd";
import { useSideBar } from "../Context/SideBarContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Header() {
  const { setShow } = useSideBar();

  return (
    <header className="lg:col-span-9 2xl:col-span-10 rounded-br-custom rounded-bl-custom lg:rounded-custom shadow-custom border-b-4 border-custom-primary-color/50 sticky top-0 lg:top-5 bg-white z-10">
      <div className="flex justify-between items-center p-5 lg:px-8 gap-2">
        <IoMenu
          className="text-custom-primary-color lg:hidden cursor-pointer"
          size={35}
          onClick={() => setShow(true)}
        />
        <div className="flex justify-center items-center gap-2 mr-auto">
          <Tooltip title="اعلان ها">
            <button aria-label="notification">
              <Link to="/messages">
                <IoNotifications
                  className="text-custom-primary-color cursor-pointer"
                  size={30}
                />
              </Link>
            </button>
          </Tooltip>
          <Tooltip title="تنظیمات">
            <button aria-label="setting">
              <Link to={"/setting"}>
                <IoMdSettings
                  className="text-custom-primary-color cursor-pointer"
                  size={30}
                />
              </Link>
            </button>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}

export default Header;
