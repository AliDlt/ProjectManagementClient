import React, { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import CustomInput from "../components/modules/CustomInput";
import { MdOutlineLogout, MdOutlineSearch } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { Tooltip } from "antd";
import { useSideBar } from "../Context/SideBarContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import CustomButton from "../components/modules/CustomButton";
import CustomModal from "../components/modules/CustomModal";
import Logout from "../components/ui/Logout";

function Header() {
  const { setShow } = useSideBar();
  const [modal, showModal] = useState(false);
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
          <Tooltip title="خروج">
            <button onClick={() => showModal(true)} aria-label="logout">
              <MdOutlineLogout
                className="text-custom-primary-color cursor-pointer"
                size={30}
              />
            </button>
          </Tooltip>
        </div>
      </div>
      <div>
        <CustomModal open={modal} onCancel={showModal} title="خروج از حساب">
          <Logout close={showModal} />
        </CustomModal>
      </div>
    </header>
  );
}

export default Header;
