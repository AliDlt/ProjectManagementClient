import React from "react";
import CustomButton from "../../modules/CustomButton";
import { convertToLocalDate, getTime } from "../../../utils/tools";
import useUser from "../../../hooks/useUser";

const TextMessage = ({ message }) => {
  const { user, isLoading } = useUser();
  return (
    <div
      className={`flex ${message.sender?._id === user._id ? "justify-start" : "justify-end "}  `}
    >
      <div
        className={`border-2 w-3/4 lg:w-1/2 ${message.sender?._id === user._id ? " border-blue-400" : " border-custom-primary-color"} rounded-custom flex flex-col gap-6 relative bg-white p-4`}
      >
        <div className="flex  justify-between items-center ">
          <div className="flex flex-col gap-2">
            <h5>
              {message.sender
                ? message?.sender.name + " " + message?.sender.surName
                : "کاربر حذف شده"}
            </h5>
            <p className="absolute left-3 bottom-2 text-gray-400 font-bold text-14">
              {getTime(message.createdAt)}
            </p>
            <p>{convertToLocalDate(message.createdAt)}</p>
          </div>
        </div>
        <p className="w-11/12 break-words">{message.content}</p>
      </div>
    </div>
  );
};

export default TextMessage;
