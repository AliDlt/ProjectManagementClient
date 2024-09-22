import React, { useEffect } from "react";
import CustomInput from "../../modules/CustomInput";
import CustomDatePicker from "../../modules/CustomDatePicker";
import CustomTextAria from "../../modules/CustomTextAria";
import { useForm } from "react-hook-form";
import CustomButton from "../../modules/CustomButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { applicant } from "../../../yup/yup";
import useAddApplicant from "../../../hooks/applicants/useAddApplicant";
import {
  convertFromInternational,
  convertToInternational,
} from "../../../utils/tools";
import useUpdateApplicant from "../../../hooks/applicants/useUpdateApplicant";

function AddApplicantForm({
  applicantId,
  setOpenAddApplicantModal,
  applicantInfo,
}) {
  const { isEdit, applicant: applicantData } = applicantInfo;
  const { addApplicantFn, addApplicantLoading } = useAddApplicant(applicantId);
  const { updateApplicantFn, updateApplicantPending } =
    useUpdateApplicant(applicantId);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
  } = useForm({
    resolver: yupResolver(applicant),
    mode: "onChange",
  });

  // Set Edit Category Value To Form
  useEffect(() => {
    if (applicantInfo) {
      clearErrors();
      setValue("firstName", applicantData?.firstName);
      setValue("lastName", applicantData?.lastName);
      setValue("nationalCode", applicantData?.nationalCode);
      setValue(
        "phoneNumber",
        convertFromInternational(applicantData?.phoneNumber),
      );
      setValue("birthDate", applicantData?.birthDate);
      setValue("additionalNotes", applicantData?.additionalNotes);
      setValue("postalCode", applicantData?.address?.postalCode);
      setValue("city", applicantData?.address?.city);
      setValue("province", applicantData?.address?.province);
      setValue("addressDetail", applicantData?.address?.addressDetail);
    } else {
      setValue("firstName", "");
      setValue("lastName", "");
      setValue("nationalCode", "");
      setValue("phoneNumber", "");
      setValue("birthDate", "");
      setValue("additionalNotes", "");
      setValue("postalCode", "");
      setValue("city", "");
      setValue("province", "");
      setValue("addressDetail", "");
    }
  }, [applicantInfo]);

  // Add Applicant Handler
  const addApplicantHandler = async (values) => {
    const { city, addressDetail, postalCode, province, phoneNumber, ...rest } =
      values;
    const data = {
      ...rest,
      address: {
        city,
        addressDetail,
        postalCode,
        province,
      },
      phoneNumber: convertToInternational(phoneNumber),
      category: applicantId,
    };

    try {
      await addApplicantFn(data);
      reset();
      setOpenAddApplicantModal();
    } catch (error) {}
  };

  // Update Applicant Handler
  const updateApplicantHanler = async (values) => {
    const { city, addressDetail, postalCode, province, phoneNumber, ...rest } =
      values;
    const data = {
      ...rest,
      address: {
        city,
        addressDetail,
        postalCode,
        province,
      },
      phoneNumber: convertToInternational(phoneNumber),
      category: applicantId,
    };

    try {
      await updateApplicantFn({ id: applicantData._id, applicantData: data });
      reset();
      setOpenAddApplicantModal();
    } catch (error) {}
  };

  return (
    <form
      onSubmit={handleSubmit(
        !applicantInfo ? addApplicantHandler : updateApplicantHanler,
      )}
      className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="firstName">نام :</label>
        <CustomInput
          className=" px-3 py-1.5"
          control={control}
          name="firstName"
          error={errors.firstName}
          disabled={applicantInfo && !isEdit}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="lastName">نام خانوادگی :</label>
        <CustomInput
          className=" px-3 py-1.5"
          control={control}
          name="lastName"
          error={errors.lastName}
          disabled={applicantInfo && !isEdit}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="nationalCode">کد ملی :</label>
        <CustomInput
          className="px-3 py-1.5"
          control={control}
          name="nationalCode"
          error={errors.nationalCode}
          disabled={applicantInfo && !isEdit}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phoneNumber">شماره تماس :</label>
        <CustomInput
          className=" px-3 py-1.5"
          control={control}
          name="phoneNumber"
          error={errors.phoneNumber}
          disabled={applicantInfo && !isEdit}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="birthDate">تاریخ تولد :</label>
        <CustomDatePicker
          className="px-3 py-1.5"
          control={control}
          name="birthDate"
          placeholder=""
          disabled={applicantInfo && !isEdit}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="province">استان :</label>
        <CustomInput
          className=" px-3 py-1.5"
          control={control}
          name="province"
          disabled={applicantInfo && !isEdit}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="city">شهر :</label>
        <CustomInput
          className=" px-3 py-1.5"
          control={control}
          name="city"
          disabled={applicantInfo && !isEdit}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="postalCode">کد پستی :</label>
        <CustomInput
          className=" px-3 py-1.5"
          control={control}
          name="postalCode"
          error={errors.postalCode}
          disabled={applicantInfo && !isEdit}
        />
      </div>
      <div className="flex flex-col gap-5 lg:flex-row lg:gap-10 col-span-full">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="addressDetail"> آدرس کامل :</label>
          <CustomTextAria
            className=" px-3 py-1.5"
            rows={4}
            control={control}
            name="addressDetail"
            disabled={applicantInfo && !isEdit}
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="additionalNotes">توضیحات بیشتر :</label>
          <CustomTextAria
            control={control}
            rows={4}
            name="additionalNotes"
            disabled={applicantInfo && !isEdit}
          />
        </div>
      </div>
      {(applicantInfo && !isEdit) || (
        <CustomButton
          type="submit"
          className="mt-5 col-span-full w-44"
          loading={applicantInfo ? updateApplicantPending : addApplicantLoading}
        >
          {isEdit ? "ویرایش متقاضی" : "افزودن متقاضی"}
        </CustomButton>
      )}
    </form>
  );
}

export default AddApplicantForm;
