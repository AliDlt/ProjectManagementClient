import React, { useState } from "react";
import TextMessage from "../components/ui/Message/TextMessage";
import NewMessage from "../components/ui/Message/NewMessage";
import { useParams } from "react-router-dom";
import useGetTicket from "../hooks/Message/useGetTicket";
import useGetMessages from "../hooks/Message/useGetMessages";
import CustomLoading from "../components/modules/CustomLoading";

const Message = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, error } = useGetTicket(id);
  const {
    data: messages,
    error: errorMessage,
    isPending,
  } = useGetMessages(id, page);
  console.log(messages)
  if (isPending)
    return (
      <div className="col-span-1 lg:col-span-11 ">
        {" "}
        <CustomLoading />{" "}
      </div>
    );
  return (
    <div className="container-grid p-0 w-full  ">
      <div className="col-span-1 lg:col-span-11 flex flex-col  ">
        <div className="flex flex-col gap-4 px-10">
          {messages?.data.messages[0].messages.map((message, index) => {
            return (
              <>
                <TextMessage key={index} message={message} />
              </>
            );
          })}
        </div>
        <NewMessage />
      </div>
    </div>
  );
};

export default Message;
