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

const ReportBox = ({  description }) => {
  return (
    <form>
      <section className="border-2  bg-white rounded-custom  border-custom-primary-color p-4 md:px-6 md:py-5 ">
        <div className="flex justify-between">
          <div className=" flex gap-2 items-center">
            <div className="text-10 md:text-16 mt-2 ">
              <span className="font-semibold ">نویسنده : </span>
              <span className="font-semibold"> زهرا کریمی </span>
            </div>
          </div>
          <div className=" flex  gap-2 ">
          
          </div>
        </div>

        <div className="mt-2 text-10 md:text-16">
          <p>{description}</p>
        </div>
      </section>
    </form>
  );
};

export default ReportBox;
