import React from "react";
import CustomInput from "../../modules/CustomInput";
import CustomDatePicker from "../../modules/CustomDatePicker";
import CustomTextAria from "../../modules/CustomTextAria";
import { useForm } from "react-hook-form";
import CustomButton from "../../modules/CustomButton";

function AddApplicantForm() {
  const { control } = useForm();

  return (
    <form className="grid grid-cols-1 gap-x-10 gap-y-5 mt-5 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col gap-2">
        <label htmlFor="name">نام :</label>
        <CustomInput className=" px-3 py-1.5" control={control} name="name" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="lastName">نام خانوادگی :</label>
        <CustomInput
          className=" px-3 py-1.5"
          control={control}
          name="lastName"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="nationalCode">کد ملی :</label>
        <CustomInput
          className="px-3 py-1.5"
          control={control}
          name="nationalCode"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phoneNumber">شماره تماس :</label>
        <CustomInput
          className=" px-3 py-1.5"
          control={control}
          name="phoneNumber"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phoneNumber">تاریخ تولد :</label>
        <CustomDatePicker
          className="px-3 py-1.5"
          control={control}
          name="phoneNumber"
          placeholder=""
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="province">استان :</label>
        <CustomInput
          className=" px-3 py-1.5"
          control={control}
          name="province"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="city">شهر :</label>
        <CustomInput className=" px-3 py-1.5" control={control} name="city" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="postalCode">کد پستی :</label>
        <CustomInput
          className=" px-3 py-1.5"
          control={control}
          name="postalCode"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="addressDetail"> آدرس کامل :</label>
        <CustomInput
          className=" px-3 py-1.5"
          control={control}
          name="addressDetail"
        />
      </div>
      <div className="flex flex-col gap-2 col-span-full lg:col-span-2">
        <label htmlFor="additionalNotes">توضیحات اضافه :</label>
        <CustomTextAria control={control} rows={4} name="additionalNotes" />
      </div>
      <CustomButton type="submit" className="mt-5 col-span-full w-44">
        اضافه کردن متقاضی
      </CustomButton>
    </form>
  );
}

export default AddApplicantForm;
