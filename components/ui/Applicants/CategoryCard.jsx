import React, { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useDeleteCategory from "../../../hooks/applicants/useDeleteCategory";
import CustomConfirm from "../../modules/CustomConfirm";
import useUser from "../../../hooks/useUser";

const CategoryCard = ({ category, onEdit, setCurrentPage }) => {
  const { user, isLoading } = useUser();
  const { name, description, _id } = category;
  const { deleteCategoryFn, deleteCategoryPending } = useDeleteCategory();
  const [openDeleteCategoryConfirm, setOpenDeleteCategoryConfirm] =
    useState(false);
  const navigate = useNavigate();

  // Delete Category Handler
  const deleteCategoryHandler = async () => {
    try {
      await deleteCategoryFn(_id);
      setOpenDeleteCategoryConfirm(false);
      navigate("/applicants");
      setCurrentPage(undefined);
    } catch (error) {}
  };

  return (
    <>
      <Link
        to={`/applicants/${_id}`}
        className=" bg-white rounded-custom shadow p-4 flex flex-col justify-between border-2 transition-all border-white hover:border-custom-primary-color"
      >
        {/* Card Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold ">{name}</h3>
            {!isLoading &&
              user &&
              (user.userRole === 0 || category?.createdBy === user._id) && (
                <div className="flex gap-2">
                  <span
                    className="text-custom-primary-color transition-all bg-white size-10 rounded-full flex justify-center items-center border-2 border-custom-primary-color cursor-pointer z-10 hover:bg-custom-primary-color hover:text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpenDeleteCategoryConfirm(true);
                    }}
                  >
                    <FaTrash />
                  </span>
                  <span
                    className="text-custom-primary-color bg-white size-10 rounded-full flex justify-center items-center border-2 border-custom-primary-color cursor-pointer z-10 hover:bg-custom-primary-color hover:text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onEdit(category);
                    }}
                  >
                    <MdModeEdit size={25} />
                  </span>
                </div>
              )}
          </div>
          <p className="text-sm text-gray-600 break-words line-clamp-1">
            {description}
          </p>
        </div>
      </Link>
      <CustomConfirm
        title="حذف دسته بندی"
        description="آیا از حذف این دسته بندی مطمئن هستید ؟"
        okText="بله"
        cancelText="خیر"
        open={openDeleteCategoryConfirm}
        onCancel={() => setOpenDeleteCategoryConfirm(false)}
        loading={deleteCategoryPending}
        okHandler={deleteCategoryHandler}
      />
    </>
  );
};

export default CategoryCard;
