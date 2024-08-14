import React, { useState } from "react";
import SmsCart from "../components/modules/MessageCart";
import useGetMessages from "../hooks/useGetMessages";
import CustomLoading from "../components/modules/CustomLoading";
import { Navigate } from "react-router-dom";
import { Pagination } from "antd";

const Messages = () => {
  const [page, setPage] = useState(1);

  const changePage = (e) => {
    setPage(e);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const { data, error, isPending } = useGetMessages(page);

  if (error) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="container-grid">
      {isPending ? (
        <div className="lg:col-span-7">
          <CustomLoading />
        </div>
      ) : (
        <div className="lg:col-span-7">
          <h3 className="text-24">پیام ها</h3>
          <div className="flex mt-5 flex-col gap-y-3">
            {data?.data?.data.tickets.map(
              ({ title, description, _id: id }, index) => (
                <SmsCart
                  title={title}
                  description={description}
                  id={id}
                  key={index}
                />
              ),
            )}
          </div>
          <div>
            <Pagination
              onChange={changePage}
              style={{ direction: "ltr" }}
              align="center"
              current={data?.data.data.currentPage}
              total={data?.data.data.totalTickets}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
