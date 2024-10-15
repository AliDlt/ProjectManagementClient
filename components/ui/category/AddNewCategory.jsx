import { useState } from "react";
import BackButton from "../../modules/BackButton";
import CustomInput from "../../modules/CustomInput";
import CustomButton from "../../modules/CustomButton";
import { IoMdAdd } from "react-icons/io";
import CustomModal from "../../modules/CustomModal";
import AddCustomCategoryField from "./AddCustomCategoryField";
import { useNavigate } from "react-router-dom";
import ShowCustomCategoryFields from "./ShowCustomCategoryFields";
import CategoryColor from "./CategoryColor";

function AddNewCategory({ addCategoryHandler }) {
  const [isCustomFieldModalOpen, setIsCustomFieldModalOpen] = useState(false);
  const [category, setCategory] = useState({
    fields: [],
    name: "",
    color: {
      customColor: "",
      color: "",
    },
  });
  const navigate = useNavigate();

  // Add Category Handler
  const addCategoryHandlerFn = (e) => {
    e.preventDefault();
    addCategoryHandler({
      categoryName: category.name,
      fields: category.fields,
      color: category.color.color || category.color.customColor,
    });
  };

  // Remove Field
  const removeFieldHandler = (fieldName) => {
    const cloneCategoryFields = [...category.fields];
    const selectedFieldIndex = category.fields.findIndex(
      (field) => field.fieldName === fieldName,
    );
    cloneCategoryFields.splice(selectedFieldIndex, 1);
    setCategory({ ...category, fields: cloneCategoryFields });
  };

  return (
    <section className="px-5 lg:px-0 lg:col-span-9 2xl:col-span-10 flex flex-col">
      <div className=" flex items-center gap-5">
        <BackButton />
        <h1 className="text-24">دسته بندی جدید</h1>
      </div>
      <form onSubmit={addCategoryHandlerFn}>
        <CustomInput
          placeholder="نام دسته بندی "
          className="px-3.5 py-1.5 mt-10"
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
          value={category.name}
        />
        {/* Category Color */}
        <div className="mt-10">
          <CategoryColor
            categoryColor={category.color}
            setCategoryColor={(color) => setCategory({ ...category, color })}
          />
        </div>
        {/* Category Custom Filed */}
        <div className="mt-10">
          <span>بخش های دسته بندی</span>
          <CustomButton
            className="text-sm flex items-center mt-3 gap-10"
            onClick={() => setIsCustomFieldModalOpen(true)}
          >
            فیلد جدید
            <IoMdAdd size={18} />
          </CustomButton>
        </div>
        <div>
          <ShowCustomCategoryFields
            fields={category.fields}
            deleteField={removeFieldHandler}
          />
        </div>
        {/* Add Or Cancel Buttons */}
        <div className="my-10 flex justify-center items-center gap-3 sm:w-80">
          <CustomButton
            className="flex-1 py-5 border border-custom-primary-color"
            type="submit"
          >
            ثبت دسته بندی
          </CustomButton>
          <CustomButton
            className="flex-1 py-5 bg-transparent text-gray-500 border border-gray-500 hover:bg-gray-100"
            onClick={() => navigate(-1)}
          >
            انصراف
          </CustomButton>
        </div>
      </form>
      <CustomModal
        open={isCustomFieldModalOpen}
        onCancel={() => setIsCustomFieldModalOpen(false)}
        title="ایجاد فیلد جدید"
      >
        <AddCustomCategoryField
          setFields={(field) =>
            setCategory({ ...category, fields: [...category.fields, field] })
          }
        />
      </CustomModal>
    </section>
  );
}

export default AddNewCategory;
