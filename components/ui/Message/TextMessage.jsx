import React from "react";
import CustomButton from "../../modules/CustomButton";
import { MdDelete } from "react-icons/md";
import { convertToLocalDate } from "../../../utils/tools";
import useUser from "../../../hooks/useUser";

const TextMessage = ({ message }) => {
  console.log(message)
  const { user, isLoading } = useUser();
  // console.log()
  return (
    <div
      className={`flex ${message.sender._id === user._id ? "justify-start" : "justify-end"} `}
    >
      <div
        className={`border-2 w-3/4 lg:w-1/2 border-custom-primary-color rounded-custom flex flex-col gap-6 bg-white p-4`}
      >
        <div className="flex  justify-between items-center">
          <div className="flex flex-col gap-2">
            <h5>
              {message?.sender.name}
              {message?.sender.surName}
            </h5>
            <p>{convertToLocalDate(message.createdAt)}</p>
          </div>
        
        </div>
        <p>{message.content}</p>
      </div>
    </div>
  );
};

export default TextMessage;
