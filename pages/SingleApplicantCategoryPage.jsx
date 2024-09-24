import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useCategory from "../hooks/applicants/useCategory";
import CustomInput from "../components/modules/CustomInput";
import CustomButton from "../components/modules/CustomButton";
import { GrSearch } from "react-icons/gr";
import MetaTag from "../components/modules/MetaTag";
import CustomModal from "../components/modules/CustomModal";
import BackButton from "../components/modules/BackButton";
import AddApplicantForm from "../components/ui/Applicants/AddApplicantForm";
import UsersTable from "../components/ui/users/UsersTable";
import useAllApplicants from "../hooks/applicants/useAllApplicants";
import Column from "antd/es/table/Column";
import { convertFromInternational } from "../utils/tools";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import CustomConfirm from "../components/modules/CustomConfirm";
import useDeleteApplicant from "../hooks/applicants/useDeleteApplicant";
import CustomLoading from "../components/modules/CustomLoading";
import { useDebounce } from "use-debounce";
import { Empty } from "antd";

function SingleApplicantCategoryPage() {
  const { applicantId } = useParams();
  const [open, setOpen] = useState(false);
  const applicantInfo = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openCategoryDescription, setOpenCategoryDescription] = useState(false);
  const [openAddApplicantModal, setOpenAddApplicantModal] = useState(false);
  const [applicantSearchValue, setApplicantSearchValue] = useState(
    searchParams.get("search" || ""),
  );
  const [value] = useDebounce(applicantSearchValue, 500);
  const [userAction, setUserAction] = useState(false);
  const { deleteApplicantFn, deleteApplicantPending } =
    useDeleteApplicant(applicantId);
  const { allApplicants, allApplicantsLoading } = useAllApplicants(
    undefined,
    undefined,
    applicantId,
    value,
  );
  const { categoryData, categoryLoading } = useCategory(applicantId);
  const category = categoryData?.data;
  const applicants = allApplicants?.applicants || [];

  const deleteApplicantHandler = async () => {
    try {
      await deleteApplicantFn(applicantInfo.current.key);
      setOpen(false);
    } catch (error) {}
  };

  // Loading
  if (categoryLoading)
    return (
      <section className="container lg:col-span-9 lg:p-0 2xl:col-span-10 flex flex-col justify-center items-center h-96 gap-5">
        <CustomLoading />
      </section>
    );

  // No Category
  if (!categoryLoading && !category)
    return (
      <section className="container lg:col-span-9 lg:p-0 2xl:col-span-10 flex flex-col justify-center items-center h-[30rem] gap-5">
        <Empty className="text-14" description="دسته بندی یافت نشد" />
        <BackButton />
      </section>
    );

  return (
    <section className="container lg:col-span-9 lg:p-0 2xl:col-span-10">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-5">
        <BackButton customPath="/applicants" />
        <h1 className="text-2xl py-4">دسته بندی {category?.name}</h1>
      </div>
      <div className="flex justify-between items-center gap-3 mb-10 mt-2">
        <p className="line-clamp-1">{category?.description}</p>
        {category?.description?.length > 150 && (
          <CustomButton
            className="px-10 py-0"
            onClick={() => setOpenCategoryDescription(true)}
          >
            بیشتر
          </CustomButton>
        )}
      </div>
      <div className="flex justify-between items-center flex-wrap mt-5 gap-5">
        <CustomInput
          className=" py-1 rounded-custom  sm:w-72  md:flex lg:py-2.5 "
          placeholder="جستجو"
          value={applicantSearchValue}
          onChange={(e) => {
            setSearchParams({
              search: e.target.value,
            });
            setApplicantSearchValue(e.target.value);
          }}
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
      {/* Applicants Table */}
      <div className="mt-8 lg:bg-white lg:rounded-custom lg:py-8 lg:shadow-custom lg:border-b-4 lg:border-custom-primary-color-300 ">
        <UsersTable loading={allApplicantsLoading} users={applicants}>
          <Column
            title="نام و نام خانوادگی"
            dataIndex="fullName"
            key="fullName"
            width={100}
          />
          <Column
            title="شماره تماس "
            dataIndex="phoneNumber"
            key="phoneNumber"
            width={100}
            render={(phoneNumber) => convertFromInternational(phoneNumber)}
          />
          <Column
            title="کد ملی"
            dataIndex="nationalCode"
            key="nationalCode"
            width={100}
          />
          <Column
            responsive={["lg"]}
            title="کد پستی"
            dataIndex={["address", "postalCode"]}
            key="postalCode"
            width={100}
          />
          <Column
            responsive={["lg"]}
            title="آدرس کامل"
            dataIndex={["address", "addressDetail"]}
            key="addressDetail"
            width={100}
            render={(value, record) => <p className="line-clamp-2">{value}</p>}
          />
          <Column
            title="تغییرات"
            dataIndex="edit"
            key="edit"
            width={100}
            render={(_, record) => (
              <div className="flex items-center justify-center gap-2">
                <MdModeEdit
                  className="text-custom-primary-color cursor-pointer"
                  size={23}
                  onClick={() => {
                    const selectedApplicant = applicants?.find(
                      (applicant) =>
                        applicant.nationalCode === record.nationalCode,
                    );
                    setUserAction({
                      isEdit: true,
                      applicant: selectedApplicant,
                    });
                    setOpenAddApplicantModal(true);
                  }}
                />
                <IoEyeSharp
                  className="text-custom-primary-color cursor-pointer"
                  size={25}
                  onClick={() => {
                    const selectedApplicant = applicants?.find(
                      (applicant) =>
                        applicant.nationalCode === record.nationalCode,
                    );
                    setUserAction({
                      isEdit: false,
                      applicant: selectedApplicant,
                    });
                    setOpenAddApplicantModal(true);
                  }}
                />
                <FaTrash
                  className="text-custom-primary-color cursor-pointer"
                  size={20}
                  onClick={() => {
                    applicantInfo.current = record;
                    setOpen(true);
                  }}
                />
              </div>
            )}
          />
        </UsersTable>
      </div>
      {/* Applicant Form */}
      <CustomModal
        title={
          !userAction
            ? "افزودن متقاضی"
            : userAction?.isEdit
              ? "ویرایش متقاضی"
              : "اطلاعات متقاضی"
        }
        open={openAddApplicantModal}
        onCancel={() => {
          setOpenAddApplicantModal(false);
          setUserAction(false);
        }}
        width={1000}
        headerClassName="sticky top-0"
      >
        <AddApplicantForm
          applicantInfo={userAction}
          applicantId={applicantId}
          setOpenAddApplicantModal={() => {
            setOpenAddApplicantModal(false);
            setUserAction(false);
          }}
        />
      </CustomModal>
      <MetaTag
        title={`دسته بندی ${category?.name}`}
        description={category?.description}
      />
      <CustomConfirm
        title="حذف متقاضی"
        open={open}
        onCancel={() => setOpen(false)}
        okText="حذف"
        cancelText="لغو"
        okHandler={deleteApplicantHandler}
        description="آیا از حذف این متقاضی اطمینان دارید ؟"
        loading={deleteApplicantPending}
      />
      <CustomModal
        open={openCategoryDescription}
        onCancel={() => setOpenCategoryDescription(false)}
      >
        <p className="lg:text-16 text-justify max-h-[530px] overflow-auto pl-2">
          {category?.description}
        </p>
      </CustomModal>
    </section>
  );
}

export default SingleApplicantCategoryPage;
