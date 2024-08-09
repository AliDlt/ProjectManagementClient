import React, { useState } from "react";
import CustomButton from "../../modules/CustomButton";
import { MdOutlineEdit } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import ChangeData from "./ChangeData";
import CustomModal from "../../../layout/Modal";

const InformationBox = ({ title, children, type }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="bg-background rounded-lg p-3 flex flex-col gap-4 ">
      <span>{title}</span>
      <div className="flex justify-between px-2 items-center gap-2  p-1 rounded-custom border-2 border-custom-primary-color">
        <span className="text-14 text-nowrap text-ellipsis overflow-hidden rounded-md ">
          {children}
        </span>
        <CustomButton
          onClick={() => setVisible(true)}
          className="bg-white text-xl text-custom-primary-color hover:text-white border-custom-primary-color border-2 border-solid py-1 px-4 "
        >
          {children ? <MdOutlineEdit /> : <IoAddOutline />}
        </CustomButton>
      </div>
    
      <CustomModal
        open={visible}
        title="تغیر اطلاعات کاربری "
        onCancel={setVisible}
      >
        <ChangeData
          type={type}
          value={children}
          title={title}
          setShow={setVisible}
        />
      </CustomModal>
    </div>
  );
};

export default InformationBox;
