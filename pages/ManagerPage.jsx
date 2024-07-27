import React from "react";
import { useParams } from "react-router-dom";

function ManagerPage() {
  const { managerId } = useParams();

  console.log(managerId);

  return (
    <div className="container grid grid-cols-1 gap-10 lg:gap-5 lg:p-0 lg:grid-cols-7 2xl:grid-cols-11 lg:col-span-9 2xl:col-span-10">
      <h3 className="text-24">اطلاعات کاربر</h3>
      <div className="border-2 border-custom-primary-color rounded-custom p-4 space-y-3">
        <h5>لاله شیرپور</h5>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <span>مدیر کل</span>
          <div>
            <span>شماره تماس : </span>
            <span>09927758674</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerPage;
