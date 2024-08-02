import React from "react";
import CustomButton from "../../modules/CustomButton";
import Message from "./Message";
import useDashboardReports from "../../../hooks/useDashboardReports";

const messages = [
  {
    name: "علی محمدی",
    message: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
  },
  {
    name: "علی محمدی",
    message: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
  },
  {
    name: "علی محمدی",
    message: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
  },
];

const Messages = () => {
  const { data } = useDashboardReports();

  return (
    <div className="flex  items-end h-full ">
      <div className="bg-white w-full flex flex-col  align gap-8 rounded-custom p-7 h-[95%] border-custom-primary-color/50 border-l-4  border-t-4">
        {data?.length ? (
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-lg">پیام ها</h3>
              <CustomButton className="">همه پیام ها</CustomButton>
            </div>
            <div className="flex flex-col  gap-3 h-full ">
              {data.map(({ name, message }, index) => {
                return <Message key={index} name={name} message={message} />;
              })}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            {" "}
            پیامی برای شما وجود ندارد{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
