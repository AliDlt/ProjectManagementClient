import React from "react";
import CustomButton from "../../modules/CustomButton";
import Message from "./Message";
import useGetMessages from "../../../hooks/useGetMessages";
import { Empty } from "antd";
import { Link } from "react-router-dom";

const Messages = () => {
  const { data } = useGetMessages();

  return (
    <div className="flex  items-end">
      <div className="bg-white w-full flex flex-col align gap-8 rounded-custom p-7 h-[95%] border-custom-primary-color-300 border-l-4  border-t-4 shadow-custom">
        {data?.data ? (
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-lg">پیام ها</h3>
              <Link to={"/messages"}>
                <CustomButton>همه پیام ها</CustomButton>
              </Link>
            </div>
            <div className="flex flex-col gap-5 h-full">
              {data?.data.data.tickets.map(
                ({ _id, title, messages }, index) => {
                  return (
                    index < 4 && (
                      <Message
                        title={title}
                        description={messages[0].content}
                        id={_id}
                        key={index}
                      />
                    )
                  );
                },
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            {" "}
            <Empty description="پیغامی برای شما وجود ندارد" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
