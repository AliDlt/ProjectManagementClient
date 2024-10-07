import React from "react";
import CustomButton from "../../modules/CustomButton";

const DeleteTicket = ({ deleteTicket, loading ,cancel }) => {
  return (
    <div className="py-2">
      <h3>آیا از حذف تیکت مطمئن هسید ؟ </h3>
      <div className="flex justify-end gap-3 p-1">
        <CustomButton className='border-2 border-custom-primary-color transition-all' onClick={deleteTicket} loading={loading}>
          حدف
        </CustomButton>
        <CustomButton
          onClick={cancel}
          className={
            "bg-white font-extrabold text-18 text-gray-500 border-2 border-gray-500 hover:bg-gray-100 transition-all "
          }
        >
          انصراف
        </CustomButton>
      </div>
    </div>
  );
};

export default DeleteTicket;
