import React, { useEffect, useState } from "react";
import CategoryCard from "../components/ui/Applicants/CategoryCard";
import MetaTag from "../components/modules/MetaTag";
import CustomInput from "../components/modules/CustomInput";
import CustomButton from "../components/modules/CustomButton";
import { GrSearch } from "react-icons/gr";
import useAllCategories from "../hooks/applicants/useAllCategories";
import CustomLoading from "../components/modules/CustomLoading";
import CustomModal from "../components/modules/CustomModal";
import CustomTextAria from "../components/modules/CustomTextAria";
import CustomPagination from "../components/modules/CustomPagination";
import { useForm } from "react-hook-form";
import useAddCategory from "../hooks/applicants/useAddCategory";
import { useDebounce } from "use-debounce";
import { useNavigate, useSearchParams } from "react-router-dom";
import useUpdateCategory from "../hooks/applicants/useUpdateCategory";

const ApplicantsCategoryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [applicantSearchValue, setApplicantSearchValue] = useState(
    searchParams.get("search") || "",
  );
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") || undefined,
  );
  const [value] = useDebounce(applicantSearchValue, 500);
  const { categoriesData, categoriesDataError, categoriesDataLoading } =
    useAllCategories(value, 12, currentPage);
  const { addCategoryFn, addCategoryPending } = useAddCategory();
  const { updateCategoryFn, updateCategoryPending } = useUpdateCategory();
  const categories = categoriesData?.data?.categories;
  const navigate = useNavigate();
  const { control, watch, handleSubmit, reset, setValue } = useForm();

  // Set Edit Category Value To Form
  useEffect(() => {
    if (editCategory) {
      setValue("name", editCategory.name);
      setValue("description", editCategory.description);
    } else {
      setValue("name", "");
      setValue("description", "");
    }
  }, [editCategory]);

  // Edit Handler
  const handleEdit = (category) => {
    setEditCategory(category);
    setOpenCategoryModal(true);
  };

  // Search Handler
  const searchHandler = (e) => {
    const value = e.target.value.trim();
    setApplicantSearchValue(value);
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries()),
    );

    if (value) {
      currentParams.set("search", value);
    } else {
      currentParams.delete("search");
    }

    const search = currentParams.toString();

    const query = search ? `?${search}` : "";
    navigate(`/applicants${query}`);
  };

  //   Add Category Handler
  const addCategoryHandler = async (values) => {
    try {
      await addCategoryFn(values);
      reset();
      setOpenCategoryModal(false);
    } catch (error) {}
  };

  //   Edit Category Handler
  const editCategoryHandler = async (values) => {
    try {
      await updateCategoryFn({ id: editCategory._id, categoryData: values });
      reset();
      setOpenCategoryModal(false);
    } catch (error) {}
  };

  //   Render Categories
  const RenderCategories = () => {
    // Loading
    if (categoriesDataLoading)
      return (
        <div className="h-96 flex justify-center items-center">
          <CustomLoading />
        </div>
      );
    // Error
    if (!categoriesDataLoading && categoriesDataError) {
      <div className="h-96 flex justify-center items-center">
        {categoriesDataError.response.data.errors
          ? categoriesDataError.response.data.errors[0]
          : categoriesDataError.response.data.message}
      </div>;
    }

    // Categories
    if (
      !categoriesDataLoading &&
      categoriesData &&
      categoriesData?.length !== 0
    )
      return (
        <div className="grid grid-cols-1 mt-10 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              category={category}
              key={category._id}
              onEdit={handleEdit}
            />
          ))}
        </div>
      );

    return (
      <div className="h-96 flex justify-center items-center">
        <p>دسته بندی وجود ندارد</p>
      </div>
    );
  };

  // Component Render
  return (
    <section className="container lg:col-span-9 lg:p-0 2xl:col-span-10">
      {/* Header */}
      <h1 className="text-2xl w-full  py-4">دسته بندی متقاضیان</h1>
      <div className="flex justify-between items-center flex-wrap mt-5 gap-5">
        <CustomInput
          className=" py-1 rounded-custom  sm:w-72  md:flex lg:py-2.5 "
          placeholder="جستجو"
          value={applicantSearchValue}
          onChange={searchHandler}
          icon={
            <GrSearch className="-scale-x-100 text-custom-primary-color w-5 h-5 ml-2" />
          }
        />
        <CustomButton
          className="mr-auto"
          onClick={() => setOpenCategoryModal(true)}
        >
          ایجاد دسته بندی جدید
        </CustomButton>
      </div>
      {/* Categories */}
      <RenderCategories />
      {/* Add/Edit Category */}
      <CustomModal
        title={editCategory ? "ویرایش دسته بندی" : " ایجاد دسته بندی جدید"}
        open={openCategoryModal}
        onCancel={() => {
          setOpenCategoryModal(false);
          setEditCategory(false);
        }}
      >
        <form
          onSubmit={handleSubmit(
            editCategory ? editCategoryHandler : addCategoryHandler,
          )}
          className="mt-5 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="lg:text-base">
              نام دسته بندی :
            </label>
            <CustomInput
              control={control}
              name="name"
              className="w-56 px-3 py-1.5"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="lg:text-base">
              توضیحات دسته بندی :
            </label>
            <CustomTextAria
              name="description"
              control={control}
              className="px-3 py-1.5 "
              rows={5}
            />
          </div>
          <CustomButton
            className="w-44"
            disabled={!watch("name") || !watch("description")}
            type="submit"
            loading={editCategory ? updateCategoryPending : addCategoryPending}
          >
            {editCategory ? "ویرایش دسته بندی" : " اضافه کردن دسته بندی"}
          </CustomButton>
        </form>
      </CustomModal>
      {categories && (
        <CustomPagination
          current={categoriesData?.data?.currentPage}
          onChange={(page) => {
            setSearchParams({
              page,
            });
            setCurrentPage(page);
          }}
          total={categoriesData?.data?.totalCategories}
          pageSize={12}
        />
      )}
      <MetaTag title={"متقاضیان"} description="متقاضیان" />
    </section>
  );
};

export default ApplicantsCategoryPage;
