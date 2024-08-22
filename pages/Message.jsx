import React, { useEffect, useRef, useState } from "react";
import TextMessage from "../components/ui/Message/TextMessage";
import NewMessage from "../components/ui/Message/NewMessage";
import { useParams } from "react-router-dom";
import useGetTicket from "../hooks/Message/useGetTicket";
import useGetMessages from "../hooks/Message/useGetMessages";
import CustomLoading from "../components/modules/CustomLoading";
import CustomButton from "../components/modules/CustomButton";
import { MdDelete } from "react-icons/md";

const Message = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, error } = useGetTicket(id);
  const [allMessages, setAllMessages] = useState([]);
  const {
    data: messages,
    error: errorMessage,

    isPending,
  } = useGetMessages(id, page);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (messages?.data.ticket.messages) {
      const newArr = [...messages.data.ticket.messages].reverse();
      setAllMessages((prevMessages) => [...newArr, ...prevMessages]);
    }
  }, [messages]);
  console.log();
  const addMessage = (e) => {
    console.log("first");
    setAllMessages((prev) => [...prev, e.data.data.replyTicket.messages[0]]);
    return;
  };

  if (isPending && page === 1)
    return (
      <div className="container-grid justify-center">
        <div className="col-span-1 lg:col-span-9">
          <CustomLoading />
        </div>
      </div>
    );

  return (
    <div className="container-grid w-full relative">
      <div className="col-span-1 lg:col-span-11 flex flex-col">
        <div className="sticky flex justify-between items-center font-bold mb-4 top-24 col-span-11 bg-white p-4 rounded-custom border-4 border-custom-primary-color z-50">
          <h5>عنوان : {data?.data.ticket.title}</h5>
          <CustomButton>
            <MdDelete />
          </CustomButton>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center">
            <CustomButton loading={isPending} onClick={loadMore}>
              بارگزاری بیشتر
            </CustomButton>
          </div>
          {allMessages?.map((message, index) => {
            return (
              <div key={index}>
                <TextMessage message={message} />
              </div>
            );
          })}
        </div>
        <NewMessage addMessage={addMessage} />
      </div>
    </div>
  );
};

export default Message;
