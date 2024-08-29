import React from "react";
import CustomButton from "../../modules/CustomButton";

const DeleteTicket = ({ deleteTicket, loading }) => {
  return (
    <div className="py-3">
      <h3>آیا از حذف تیکت مطمعن هسید ؟ </h3>
      <div className="flex justify-end gap-3 p-1">
        <CustomButton onClick={deleteTicket} loading={loading}>
          بله
        </CustomButton>
        <CustomButton onClick={deleteTicket}>خیر</CustomButton>
      </div>
    </div>
  );
};

export default DeleteTicket;
