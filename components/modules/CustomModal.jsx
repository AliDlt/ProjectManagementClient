import React from "react";
import { Modal } from "antd";
import { IoCloseSharp } from "react-icons/io5";

const CustomModal = ({ title, children, open, onCancel }) => {
  return (
    <Modal
      classNames={{
        content: "ring-2 ring-custom-primary-color rounded-custom",
      }}
      closeIcon={null}
      open={open}
      footer={null}
      onCancel={() => {
        onCancel(false);
      }}
    >
      <div className="flex justify-between items-center text-xl border-b pb-3 border-black border-opacity-55">
        <h3>{title}</h3>
        <span
          className="text-custom-primary-color text-24 cursor-pointer"
          onClick={() => {
            onCancel(false);
          }}
        >
          <IoCloseSharp />
        </span>
      </div>
      <div>{children}</div>
    </Modal>
  );
};

export default CustomModal;
