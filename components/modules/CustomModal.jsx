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
<<<<<<< HEAD
  headerClassName,
=======
  notClose,
>>>>>>> 24a2bdc05cd59929d860995bacc46a1858b6ca42
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
<<<<<<< HEAD
        <div className="flex justify-between items-center text-xl">
          <h3>{title}</h3>
=======
        <h3>{title}</h3>
        {!notClose && (
>>>>>>> 24a2bdc05cd59929d860995bacc46a1858b6ca42
          <span
            className="text-custom-primary-color text-24 cursor-pointer"
            onClick={() => {
              onCancel(false);
            }}
          >
            <IoCloseSharp />
          </span>
<<<<<<< HEAD
        </div>
        {title && <hr className="w-full h-[1px] border-black/50 mt-4" />}
=======
        )}
>>>>>>> 24a2bdc05cd59929d860995bacc46a1858b6ca42
      </div>
      <div className="p-6 pt-0">{children}</div>
    </Modal>
  );
};

export default CustomModal;
