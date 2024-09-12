import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useCategory from "../hooks/applicants/useCategory";
import CustomInput from "../components/modules/CustomInput";
import CustomButton from "../components/modules/CustomButton";
import { GrSearch } from "react-icons/gr";
import MetaTag from "../components/modules/MetaTag";
import CustomModal from "../components/modules/CustomModal";
import AddApplicantForm from "../components/ui/Applicants/AddApplicantForm";
import UsersTable from "../components/ui/users/UsersTable";

function SingleApplicantCategoryPage() {
  const { applicantId } = useParams();
  const [openAddApplicantModal, setOpenAddApplicantModal] = useState(false);
  const { categoryData, categoryError, categoryLoading } =
    useCategory(applicantId);
  const category = categoryData?.data;

  return (
    <section className="container lg:col-span-9 lg:p-0 2xl:col-span-10">
      {/* Header */}
      <h1 className="text-2xl w-full  py-4">دسته بندی {category?.name}</h1>
      <div className="flex justify-between items-center flex-wrap mt-5 gap-5">
        <CustomInput
          className=" py-1 rounded-custom w-72  md:flex"
          placeholder="جستجو"
          //   value={applicantSearchValue}
          //   onChange={(e) => {
          //     setApplicantSearchValue(e.target.value);
          //   }}
          icon={
            <GrSearch className="-scale-x-100 text-custom-primary-color w-5 h-5 ml-2" />
          }
        />
        <CustomButton
          className="mr-auto"
          onClick={() => setOpenAddApplicantModal(true)}
        >
          افزودن متقاضی
        </CustomButton>
      </div>
      <div>
        <UsersTable />
      </div>
      <CustomModal
        title="اضافه کردن متقاضی"
        open={openAddApplicantModal}
        onCancel={() => setOpenAddApplicantModal(false)}
        width={1000}
      >
        <AddApplicantForm />
      </CustomModal>
      <MetaTag
        title={`دسته بندی ${category?.name}`}
        description={category?.description}
      />
    </section>
  );
}

export default SingleApplicantCategoryPage;
