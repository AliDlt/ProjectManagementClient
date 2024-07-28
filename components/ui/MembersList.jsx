import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../modules/CustomButton";

function MembersList({ members, title }) {
  return (
    <>
      <h3 className="text-24">{title}</h3>

      <div className="flex flex-col gap-5 mt-5">
        {members.map(({ name, phone }, index) => (
          <Link
            key={index}
            to="1"
            className="p-5 border-2 border-custom-primary-color-300 rounded-custom bg-white space-y-3"
          >
            <h4>{name}</h4>
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div className=" flex items-center">
                <span>شماره تماس : </span>
                <span>{phone}</span>
              </div>
              <CustomButton className="text-12 mr-auto">
                <span className="text-white">پروژه ها و گزارشات</span>
              </CustomButton>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default MembersList;
