import React from "react";
import { convertToLocalDate, getTime } from "../../../utils/tools";
import useUser from "../../../hooks/useUser";

const TextMessage = ({ message,title }) => {
  const { user, isLoading } = useUser();
  return (
    <div
      className={`flex ${message.sender?._id === user._id ? "justify-start" : "justify-end "}  `}
    >
      <div
        className={`w-3/4 lg:w-1/2 ${message.sender?._id === user._id ? " bg-orange-500/30" : " text-white bg-orange-500/75"} rounded-custom flex flex-col gap-6 relative  p-4`}
      >
        <div className="flex flex-col gap-1">
          <div className="flex flex-row justify-between ">
            <h5 className={`  rounded-custom px-2 ${message.sender?._id === user._id ? " bg-orange-400/[.4]" : "bg-white/[.2]"}`}>
              {message.sender
                ? message?.sender.name + " " + message?.sender.surName
                : "کاربر حذف شده"}
            </h5>
            <p className={`flex items-center text-white  rounded-custom px-2 text-12
              ${message.sender?._id === user._id ? "bg-orange-400/[0.4]" : "bg-white/[.3]"}
              `}>{convertToLocalDate(message.createdAt)}</p>
          </div>
          <div>
          <h5>{title}</h5>
          </div>
          <div>
          <p className="w-11/12 break-words text-12 mb-2">{message.content}</p>
          </div>
         <div>
          {/* absolute left-3 bottom-2 text-gray-400 font-bold text-14 */}
         <p className={`absolute bottom-2 font-bold text-10 mt-4 ${message.sender?._id === user._id ? " text-orange-400/80 right-4" : " text-white left-3"} `}
         >
            {getTime(message.createdAt)}
          </p>
         </div>
        </div>
        
      </div>
    </div>
  );
};

export default TextMessage;
