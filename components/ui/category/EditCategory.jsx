import React, { useState } from "react";
import CustomButton from "../../modules/CustomButton";
import { MdModeEdit } from "react-icons/md";
import CustomInput from "../../modules/CustomInput";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../modules/CustomModal";
import CustomConfirm from "../../modules/CustomConfirm";
import CategoryColor from "./CategoryColor";
import ShowCustomCategoryFields from "./ShowCustomCategoryFields";

function EditCategory({ editHandler }) {
  const [isEditCategoryNameModalOpen, setIsEditCategoryNameModalOpen] =
    useState(false);
  const [isDeleteFieldNameConfirmOpen, setIsDeleteFieldNameConfirmOpen] =
    useState(false);
  const [category, setCategory] = useState({
    fields: [
      { fieldName: "Test", fieldType: "text" },
      { fieldName: "Test", fieldType: "number" },
      { fieldName: "Test", fieldType: "bool" },
      { fieldName: "Test", fieldType: "textArea" },
      { fieldName: "Test", fieldType: "date" },
    ],
    name: "ماشین آلات",
    color: {
      customColor: "",
      color: "#3C81F5",
    },
  });

  const navigate = useNavigate();

  return (
    <section className="px-5 lg:px-0 lg:col-span-9 2xl:col-span-10 flex flex-col">
      <div className="flex items-center gap-5">
        <h1 className="text-2xl">تغییر دسته بندی</h1>
        <CustomButton
          className=" flex justify-center items-center ring-2 ring-custom-primary-color bg-white rounded-full size-9 p-0 hover:bg-custom-primary-color group"
          onClick={() => setIsEditCategoryNameModalOpen(true)}
        >
          <MdModeEdit
            size={23}
            className="text-custom-primary-color rounded-full group-hover:text-white"
          />
        </CustomButton>
      </div>
      <CustomButton
        className="mt-10 w-40 py-5"
        style={{
          background: category.color.color || category.color.customColor,
        }}
      >
        {category.name}
      </CustomButton>
      {/* Fields */}
      <div className="bg-white rounded-custom p-5 flex flex-col gap-3 mt-5 shadow-custom">
        <ShowCustomCategoryFields
          fields={category.fields}
          deleteField={() => setIsDeleteFieldNameConfirmOpen(true)}
        />
      </div>
      {/* Add Or Cancel Buttons */}
      <div className="my-10 flex justify-center items-center gap-3 sm:w-80">
        <CustomButton
          className="flex-1 py-5 border border-custom-primary-color"
          type="submit"
          onClick={editHandler}
        >
          ثبت تغییرات
        </CustomButton>
        <CustomButton
          className="flex-1 py-5 bg-transparent text-gray-500 border border-gray-500 hover:bg-gray-100"
          onClick={() => navigate(-1)}
        >
          انصراف
        </CustomButton>
      </div>
      {/* Edit Category Name & Color */}
      <CustomModal
        title="تغییر دسته بندی"
        open={isEditCategoryNameModalOpen}
        onCancel={() => setIsEditCategoryNameModalOpen(false)}
      >
        <CustomInput
          placeholder="نام دسته بندی "
          className="px-3.5 py-1.5"
          value={category.name}
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
        />
        <div className="mt-5">
          <CategoryColor
            categoryColor={category.color}
            setCategoryColor={(color) => {
              console.log(color);
              setCategory({ ...category, color });
            }}
          />
        </div>
      </CustomModal>
      {/* Confirm Delete Field */}
      <CustomConfirm
        title="حذف فیلد"
        description="آیا از حذف این فیلد مطمئن هستید ؟"
        open={isDeleteFieldNameConfirmOpen}
        onCancel={() => setIsDeleteFieldNameConfirmOpen(false)}
        okText="بله"
        cancelText="خیر"
      />
    </section>
  );
}

export default EditCategory;
