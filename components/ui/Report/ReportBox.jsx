import React, { useState, useEffect } from "react";
import CustomButton from "../../modules/CustomButton";
import { MdDelete, MdModeEdit } from "react-icons/md";
import CustomTextAria from "../../modules/CustomTextAria";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetReport from "../../../hooks/useGetReport";
import { messageSchema } from "../../../yup/yup";
import { Link } from "react-router-dom";
import CustomModal from "../../modules/CustomModal";

const ReportBox = ({ title, project, description }) => {

  return (
    <form>
      <section className="border-2  bg-white rounded-custom  border-custom-primary-color p-4 md:px-6 md:py-5 ">
        <div className="flex justify-between">
          <div className=" flex gap-2 items-center">
            <h5 className="text-14 md:text-16 font-medium">{project}</h5>
          </div>
          <div className=" flex  gap-2 ">
            <CustomButton className="bg-white hover:text-white  w-9 h-9  p-2 text-custom-primary-color border-2 border-custom-primary-color border-solid rounded-full">
              <span className="flex items-center justify-center   text-24">
                <MdDelete />
              </span>
            </CustomButton>
          </div>
        </div>
        <div className="text-10 md:text-16 mt-2 ">
          <span className="font-semibold ">نویسنده : </span>
          <span className="font-semibold"> زهرا کریمی </span>
        </div>
        <div className="mt-2 text-10 md:text-16">
          <p>{description}</p>
        </div>
      </section>
     
    </form>
  );
};

export default ReportBox;
