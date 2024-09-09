import React, { useEffect, useRef, useState } from "react";
import TextMessage from "../components/ui/Message/TextMessage";
import NewMessage from "../components/ui/Message/NewMessage";
import { useNavigate, useParams } from "react-router-dom";
import useGetTicket from "../hooks/Message/useGetTicket";
import useGetMessages from "../hooks/Message/useGetMessages";
import CustomLoading from "../components/modules/CustomLoading";
import CustomButton from "../components/modules/CustomButton";
import { MdDelete } from "react-icons/md";
import MetaTag from "../components/modules/MetaTag";
import CustomModal from "../components/modules/CustomModal";
import DeleteTicket from "../components/ui/Message/DeleteTicket";
import useDeleteTicket from "../hooks/Message/useDeleteTicket";
import { useToast } from "../Context/ToastContext";
import { useQueryClient } from "@tanstack/react-query";

const Message = () => {
  const { id } = useParams();
  const [deleteModal, showDeleteModal] = useState(false);

  const [page, setPage] = useState(1);

  const { data, error, isLoading: loadingMessages } = useGetTicket(id);

  const navigate = useNavigate();
  const toast = useToast();
  const [allMessages, setAllMessages] = useState([]);
  
  const {
    data: messages,
    error: errorMessage,

    isPending,
  } = useGetMessages(id, page);
  console.log(errorMessage)
  const queryClient = useQueryClient();

  const successDeleteTicket = (e) => {
    toast(e.message, "success");
    queryClient.invalidateQueries("get-messages");
    navigate("/messages");
  };
  // delete Ticket
  const { mutate, isPending: loading } = useDeleteTicket();
  const deleteTicket = () => {
    mutate(id, {
      onSuccess: successDeleteTicket,
      onError: (e) => console.log(e),
    });
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (messages?.data.ticket.messages) {
      const newArr = [...messages.data.ticket.messages].reverse();
      setAllMessages((prevMessages) => [...newArr, ...prevMessages]);
    }
  }, [messages]);
  const addMessage = (e) => {
    console.log("first");
    setAllMessages((prev) => [...prev, e.data.data.replyTicket.messages[0]]);
    return;
  };
  if (error) {
    toast("مشکلی پیش آمده است", "error");
    navigate("/messages");
  }
  if (isPending && page === 1)
    return (
      <div className="container-grid justify-center">
        <div className="col-span-1 lg:col-span-9">
          <CustomLoading />
        </div>
      </div>
    );

  return (
    <div className="container-grid w-full relative row-span-7 min-h-screen ">
      <div className="col-span-1 lg:col-span-11  h-full flex justify-between flex-col">
        <div className="sticky flex justify-between items-center font-bold mb-4 top-2 col-span-11 bg-white p-4 rounded-custom border-4 border-custom-primary-color z-50">
          <h5>عنوان : {data?.data.ticket.title}</h5>
          <CustomButton onClick={() => showDeleteModal(true)}>
            <MdDelete />
          </CustomButton>
        </div>
        <div className="flex flex-col gap-4 h-full">
          <div className="flex items-center justify-center">
            {data?.data.totalMessages > 10 && (
              <CustomButton loading={isPending} onClick={loadMore}>
                بارگزاری بیشتر
              </CustomButton>
            )}
          </div>
          {allMessages?.map((message, index) => {
            return <TextMessage message={message} key={index} />;
          })}
        </div>
        <NewMessage addMessage={addMessage} />
      </div>
      <CustomModal
        onCancel={showDeleteModal}
        open={deleteModal}
        title={"حذف تیکت"}
      >
        <DeleteTicket
          loading={loading}
          deleteTicket={deleteTicket}
          cancel={() => showDeleteModal(false)}
        />
      </CustomModal>
      <MetaTag title={data?.data.ticket.title} />
    </div>
  );
};

export default Message;
