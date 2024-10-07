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
  headerClassName,
  notClose,
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
          "ring-2 ring-custom-primary-color rounded-custom p-0",
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
          "flex flex-col text-xl !pb-4 p-5 bg-white z-10 rounded-3xl",
          headerClassName,
        ])}
      >
        <div className="flex justify-between items-center text-xl">
          <h3 className="text-24 font-semibold">{title}</h3>
          {!notClose && (
            <span
              className="text-custom-primary-color text-24 cursor-pointer"
              onClick={() => {
                onCancel(false);
              }}
            >
              <IoCloseSharp />
            </span>
          )}
        </div>
        {title && <hr className="w-full h-[1px] border-black/50 mt-4" />}
      </div>
      <div className="p-6 pt-0">{children}</div>
    </Modal>
  );
};

export default CustomModal;
