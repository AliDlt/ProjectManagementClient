import React from "react";
import CustomButton from "../../modules/CustomButton";
import { MdDelete } from "react-icons/md";
import { convertToLocalDate } from "../../../utils/tools";

const TextMessage = ({ message }) => {
  return (
    <div  className="  border-2 w-full border-custom-primary-color rounded-custom rounded-br-none flex flex-col gap-6 bg-white p-4">
      <div className="flex  justify-between items-center">
        <div className="flex flex-col gap-2">
          <h5>
            {message?.sender.name}
            {message?.sender.surName}
          </h5>
          <p>{convertToLocalDate(message.createdAt)}</p>
        </div>
        <div>
          <CustomButton className="bg-white rounded-full text-custom-primary-color hover:text-white hover:bg-custom-primary-color border-custom-primary-color border-2 border-solid p-1 w-9 h-9">
            <MdDelete className="text-24" />
          </CustomButton>
        </div>
      </div>
      <p>{message.content}</p>
    </div>
  );
};

export default TextMessage;
