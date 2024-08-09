import React from "react";
import CustomButton from "../components/modules/CustomButton";
import SmsCart from "../components/modules/MessageCart";
import CustomInput from "../components/modules/CustomInput";
import { GrSearch } from "react-icons/gr";
import SendMessage from "../components/ui/messages/SendMessage";

const Messages = () => {
  const constantMessages = [
    {
      id: 1,
      authorName: "امیر سحرخیز",
      message:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است",
    },
    {
      id: 2,
      authorName: "مرتضی روحی",
      message:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است",
    },
    {
      id: 3,
      authorName: "زهرا کریمی",
      message:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است",
    },
  ];


  return (
    <div className="p-5">
      <section>
        <h3 className="text-24">پیام ها</h3>
        <div className="flex mt-5 flex-col gap-y-3">
          {constantMessages.map((messageData,index) => (
            <SmsCart data={messageData} key={index} />
          ))}
        </div>
      </section>

      <section className="mt-4">
        <p className="text-16">پیام جدید</p>
      </section>

      <section className="mt-10">
        <div className="flex items-center gap-x-10 justify-between">
          <p className="text-16 whitespace-nowrap">لیست کاربران</p>
          <CustomInput
            placeholder={"جستجو"}
            className={"px-3 py-1 text-14"}
            icon={
              <GrSearch className="-scale-x-100 text-custom-primary-color w-5 h-5 ml-2" />
            }
          />
        </div>
      </section>
      <SendMessage />
    </div>
  );
};

export default Messages;
