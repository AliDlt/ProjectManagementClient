import React from "react";
import CustomInput from "../../modules/CustomInput";
import CustomTextAria from "../../modules/CustomTextAria";
import CustomDatePicker from "../../modules/CustomDatePicker";
import { Switch } from "antd";
import { FaTrash } from "react-icons/fa6";

function ShowCustomCategoryFields({ fields, deleteField }) {
  console.log(fields);
  return (
    <div className="grid grid-cols-1 gap-5 mt-5">
      {fields.map((field) => {
        switch (field.fieldType) {
          case "Text":
            return (
              <div className="flex items-center gap-3">
                <FaTrash
                  onClick={() => deleteField(field.fieldName)}
                  size={18}
                  className="text-custom-primary-color cursor-pointer"
                />
                <CustomInput
                  disabled
                  placeholder={field.fieldName}
                  className="px-3.5 py-1.5"
                />
              </div>
            );
          case "Number":
            return (
              <div className="flex items-center gap-3">
                <FaTrash
                  onClick={() => deleteField(field.fieldName)}
                  size={18}
                  className="text-custom-primary-color cursor-pointer"
                />
                <CustomInput
                  disabled
                  placeholder={field.fieldName}
                  className="px-3.5 py-1.5"
                  type="number"
                />
              </div>
            );
          case "Boolean":
            return (
              <div className="flex items-center gap-3">
                <FaTrash
                  onClick={() => deleteField(field.fieldName)}
                  size={18}
                  className="text-custom-primary-color cursor-pointer"
                />
                <Switch disabled />
              </div>
            );
          case "textArea":
            return (
              <div className="flex items-center gap-3">
                <FaTrash
                  onClick={() => deleteField(field.fieldName)}
                  size={18}
                  className="text-custom-primary-color cursor-pointer"
                />
                <CustomTextAria
                  disabled
                  placeholder={field.fieldName}
                  className="px-3.5 py-1.5"
                />
              </div>
            );
          case "Date":
            return (
              <div className="flex items-center gap-3">
                <FaTrash
                  onClick={() => deleteField(field.fieldName)}
                  size={18}
                  className="text-custom-primary-color cursor-pointer"
                />
                <CustomDatePicker
                  disabled
                  placeholder={field.fieldName}
                  className="px-3.5 py-1.5"
                />
              </div>
            );
          default:
            break;
        }
      })}
    </div>
  );
}

export default ShowCustomCategoryFields;
