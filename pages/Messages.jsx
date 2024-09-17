import React, { useState } from "react";
import SmsCart from "../components/modules/MessageCart";
import useGetMessages from "../hooks/useGetMessages";
import CustomLoading from "../components/modules/CustomLoading";
import { Link, Navigate } from "react-router-dom";
import { Empty, Pagination } from "antd";
import MetaTag from "../components/modules/MetaTag";
import CustomButton from "../components/modules/CustomButton";

const Messages = () => {
  const [page, setPage] = useState(1);

  const changePage = (e) => {
    setPage(e);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const { data, error, isPending } = useGetMessages(page);
  if (!isPending && !data?.data.data.tickets) {
    return (
      <div className="container-grid ">
        <div className="col-span-1 lg:col-span-11 mt-60 flex-col gap-5  flex items-center justify-center">
          <Empty description="پیامی وجود ندارد" />
          <CustomButton>
            <Link to="/add-ticket">ارسال پیام جدید</Link>
          </CustomButton>
        </div>
      </div>
    );
  }
  if (error) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="container-grid">
      {isPending ? (
        <div className="lg:col-span-11">
          <CustomLoading />
        </div>
      ) : (
        <div className="lg:col-span-11">
          <div className="flex justify-between">
            <h3 className="text-24">پیام ها</h3>
            <CustomButton className=" rounded-xl border-2 text-14 border-solid border-custom-primary-color !p-4 text-white ">
              <Link to="/add-ticket">افزودن پیغام</Link>
            </CustomButton>
          </div>
          <div className=" mt-5 grid md:grid-cols-2 grid-cols-1 gap gap-5">
            {data?.data?.data.tickets.map(
              ({ title, _id: id, messages }, index) => (
                <>
                  <SmsCart
                    title={title}
                    description={messages[0]?.content}
                    id={id}
                    key={index}
                  />
                </>
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
      <MetaTag title={"پیام ها "} description="پیام ها" />
    </div>
  );
};

export default Messages;
