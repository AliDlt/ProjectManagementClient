import React from "react";
import CustomButton from "../../modules/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import CustomLoading from "../../modules/CustomLoading";
import useCategories from "../../../hooks/Categories/useCategories";
import { Empty } from "antd";

function Categories({ selectHandler, sectionType }) {
  const navigate = useNavigate();
  const { categoriesData, categoriesError, categoriesLoading } =
    useCategories(sectionType);
  const categories = categoriesData?.categories;

  if (categoriesLoading)
    return (
      <div className="h-44">
        <CustomLoading />
      </div>
    );

  if (!categoriesLoading && categoriesError)
    return (
      <div className="h-44 flex justify-center items-center">
        {(categoriesError.response.data.errors
          ? categoriesError.response.data.errors[0]
          : categoriesError.response.data.message) ||
          "خطایی در ارتباط با سرور به وجود آمد."}
      </div>
    );

  return (
    <div className="flex flex-col gap-5">
      {!categories ? (
        <Empty
          className="w-full h-44 flex flex-col justify-center items-center"
          description=" دسته بندی ای وجود ندارد"
        />
      ) : (
        categories?.map((category) => {
          return (
            <div
              className="flex justify-between items-center"
              key={category._id}
            >
              <CustomButton
                onClick={() => selectHandler(category)}
                style={{
                  backgroundColor: category.color
                    ? category.color
                    : "rgb(var(--primary-color))",
                }}
              >
                {category?.name}
              </CustomButton>
              <Link
                className="text-custom-primary-color flex justify-center items-center"
                to="edit-category"
              >
                <MdModeEdit size={25} />
              </Link>
            </div>
          );
        })
      )}
      <CustomButton
        className="mr-auto mt-5"
        onClick={() => navigate("add-new-category")}
      >
        <IoMdAdd size={20} />
        دسته بندی جدید
      </CustomButton>
    </div>
  );
}

export default Categories;
