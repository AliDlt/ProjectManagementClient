import { useState } from "react";
import { useToast } from "../../Context/ToastContext";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import CustomTextAria from "./CustomTextAria";
import CustomDatePicker from "./CustomDatePicker";

function RequestForm({ formData }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formData;

  const onSubmitHandler = (values) => {
    try {
      console.log(values);
    } catch (error) {
      toast(error.response.data.message, "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-7 px-2 mt-10"
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">اطلاعات شخصی</h3>
        <div className="flex flex-wrap gap-4 gap-y-6">
          <CustomInput
            error={errors.firstName}
            control={control}
            name="firstName"
            className="w-full h-[50px] text-16 px-5 bg-transparent md:text-18"
            placeholder="نام"
          />
          <CustomInput
            control={control}
            error={errors.lastName}
            name="lastName"
            className="w-full h-[50px] text-16 px-5 bg-transparent md:text-18"
            placeholder="نام خانوادگی"
          />

          <CustomDatePicker
            control={control}
            type="date"
            error={errors.birthDate}
            name="birthDate"
            className="h-[50px] text-16 px-5 bg-transparent md:text-18"
            placeholder="تاریخ تولد"
          />

          <CustomInput
            control={control}
            type="tel"
            error={errors.nationalCode}
            name="nationalCode"
            className="h-[50px] text-16 px-5 bg-transparent md:text-18"
            placeholder="کد ملی"
          />
          <CustomInput
            control={control}
            type="tel"
            error={errors.phoneNumber}
            name="phoneNumber"
            className="h-[50px] text-16 px-5 bg-transparent md:text-18"
            placeholder="شماره موبایل"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">جزئیات آدرس</h3>
        <div className="flex flex-wrap gap-4 gap-y-6">
          <CustomInput
            control={control}
            error={errors.province}
            name="province"
            className="h-[50px] text-16 px-5 bg-transparent md:text-18"
            placeholder="استان"
          />
          <CustomInput
            control={control}
            error={errors.city}
            name="city"
            className="h-[50px] text-16 px-5 bg-transparent md:text-18"
            placeholder="شهر"
          />
          <CustomInput
            control={control}
            error={errors.addressDetail}
            name="addressDetail"
            className="h-[50px] text-16 px-5 bg-transparent md:text-18"
            placeholder="آدرس"
          />
          <CustomInput
            control={control}
            error={errors.postalCode}
            name="postalCode"
            className="h-[50px] text-16 px-5 bg-transparent md:text-18"
            placeholder="کد پستی"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">جزئیات درخواست</h3>
        <div className="flex flex-wrap gap-4 gap-y-6">
          <CustomInput
            control={control}
            error={errors.requestType}
            name="requestType"
            className="h-[50px] text-16 px-5 bg-transparent md:text-18"
            placeholder="نوع درخواست"
          />
          <CustomInput
            control={control}
            error={errors.requestSubject}
            name="requestSubject"
            className="h-[50px] text-16 px-5 bg-transparent md:text-18"
            placeholder="عنوان درخواست"
          />
        </div>
      </div>

      <CustomTextAria
        control={control}
        error={errors.requestMessage}
        name="requestMessage"
        className="h-[100px] text-16  px-5 bg-transparent md:text-18"
        placeholder="پیام درخواست"
        // Needs to be define to prevent error
        onBlur={() => {}}
      />
      <CustomTextAria
        control={control}
        error={errors.additionalNote}
        name="additionalNotes"
        className="h-[70px] text-16 px-5 bg-transparent md:text-18"
        placeholder="توضیحات بیشتر"
        // Needs to be define to prevent error
        onBlur={() => {}}
      />

      <CustomButton
        loading={loading}
        className="h-[60px] w-48 mx-auto text-20 md:w-56 md:mt-5"
        type="submit"
      >
        <span className="text-white">ثبت درخواست</span>
      </CustomButton>
    </form>
  );
}

export default RequestForm;
