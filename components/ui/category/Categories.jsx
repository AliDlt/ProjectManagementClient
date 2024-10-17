import React from "react";
import CustomButton from "../../modules/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

function Categories({ selectHandler, categories }) {
  const navigate = useNavigate();
  console.log(categories)

  return (
    <div className="flex flex-col gap-5">
      {categories?.map(category => {
        return <div className="flex justify-between items-center">
          <CustomButton onClick={()=>selectHandler(category)} style={{ backgroundColor: category.color ? category.color : 'rgb(var(--primary-color))', }}>
            {category?.name}
          </CustomButton>
          <Link
            className="text-custom-primary-color flex justify-center items-center"
            to="edit-category"
          >
            <MdModeEdit size={25} />
          </Link>
        </div>
      })}



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
