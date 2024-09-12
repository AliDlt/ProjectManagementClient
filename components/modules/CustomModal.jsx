import React from "react";
import { Modal } from "antd";
import { IoCloseSharp } from "react-icons/io5";
import cn from "../../utils/cn";

const CustomModal = ({
  title,
  children,
  open,
  onCancel,
  className,
  ...rest
}) => {
  return (
    <Modal
      centered
      closeIcon={null}
      open={open}
      footer={null}
      classNames={{
        content: cn([
          "ring-2  ring-custom-primary-color rounded-custom  ",
          className,
        ]),
      }}
      onCancel={() => {
        onCancel(false);
      }}
      {...rest}
    >
      <div
        className={cn([
          "flex justify-between items-center text-xl pb-3 ",
          title && "border-opacity-55 border-black border-b",
        ])}
      >
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
