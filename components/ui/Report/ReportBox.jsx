import React, { useState, useEffect } from "react";
import CustomButton from "../../modules/CustomButton";
import { MdDelete, MdModeEdit } from "react-icons/md";
import CustomTextArea from "../../modules/CustomTextArea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { textAria } from "../../../yup/yup";
import useGetReport from "../../../hooks/useGetReport";

const ReportBox = ({ title, project }) => {
  const [edit, setEdit] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm({ mode: "onChange", resolver: yupResolver(textAria) });

  useEffect(() => {
    if (edit) {
      setFocus("text");
    }
  }, [edit, setFocus]);

  const showEditor = () => {
    setEdit(true);
  };
  const { data } = useGetReport();
  return (
    <section className="border-2  bg-white rounded-custom  border-custom-primary-color p-4 md:px-6 md:py-5 ">
      <div className="flex justify-between">
        <div className=" flex gap-2 items-center">
          <h5 className="text-14 md:text-16 font-medium">{project}</h5>
          <h5 className="text-12 md:text-16 font-medium">{title}</h5>
        </div>
        <div className=" flex  gap-2 ">
          <CustomButton
            onClick={showEditor}
            className="bg-white hover:text-white  w-9 h-9  p-2 text-custom-primary-color border-2 border-custom-primary-color border-solid rounded-full"
          >
            <span className="flex items-center justify-center   text-24 ">
              <MdModeEdit />
            </span>
          </CustomButton>

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
        {edit ? (
          <CustomTextArea
            control={control}
            name="text"
            error={errors["text"]}
            placeholder="گزارش خود  را وارد کنید"
            rows={5}
            onBlur={() => setEdit(false)}
          />
        ) : (
          <p className="text-pretty">
            {" "}
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد.{" "}
          </p>
        )}
      </div>
    </section>
  );
};

export default ReportBox;
