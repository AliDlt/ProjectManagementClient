import React, { useState } from "react";
import CustomButton from "../../modules/CustomButton";
import { MdOutlineEdit } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import CustomModal from "../../../layout/Modal";
import ChangePassword from "./ChangePassword";

const PasswordBox = ({
  title,
  children,
  type,
  userId,
  placeholder,
  phoneNumber,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="bg-background rounded-lg p-3 flex flex-col gap-4 ">
      <span>{title}</span>
      <div className="flex justify-between px-2 items-center gap-2  p-1 rounded-custom border-2 border-custom-primary-color">
        <span className="text-14 text-nowrap text-ellipsis overflow-hidden rounded-md ">
          {placeholder}
        </span>
        <CustomButton
          onClick={() => setVisible(true)}
          className="bg-white text-xl text-custom-primary-color hover:text-white border-custom-primary-color border-2 border-solid py-1 px-4 "
        >
          {children ? <MdOutlineEdit /> : <IoAddOutline />}
        </CustomButton>
      </div>

      <CustomModal open={visible} title="رمز عبور جدید" onCancel={setVisible}>
        <ChangePassword
          phoneNumber={phoneNumber}
          id={userId}
          type={type}
          title={title}
          setShow={setVisible}
        />
      </CustomModal>
    </div>
  );
};

export default PasswordBox;
