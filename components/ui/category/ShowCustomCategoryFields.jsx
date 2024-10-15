import React from "react";
import CustomInput from "../../modules/CustomInput";
import CustomTextAria from "../../modules/CustomTextAria";
import CustomDatePicker from "../../modules/CustomDatePicker";
import { Switch } from "antd";
import { FaTrash } from "react-icons/fa6";

function ShowCustomCategoryFields({ fields, deleteField }) {
  return (
    <div className="grid grid-cols-1 gap-5 mt-5">
      {fields.map((field) => {
        switch (field.fieldType) {
          case "text":
            return (
              <div className="flex items-center gap-3">
                <FaTrash
                  onClick={() => deleteField(field.fieldName)}
                  size={18}
                  className="text-custom-primary-color cursor-pointer"
                />
                <CustomInput
                  placeholder={field.fieldName}
                  className="px-3.5 py-1.5"
                />
              </div>
            );
          case "number":
            return (
              <div className="flex items-center gap-3">
                <FaTrash
                  onClick={() => deleteField(field.fieldName)}
                  size={18}
                  className="text-custom-primary-color cursor-pointer"
                />
                <CustomInput
                  placeholder={field.fieldName}
                  className="px-3.5 py-1.5"
                  type="number"
                />
              </div>
            );
          case "bool":
            return (
              <div className="flex items-center gap-3">
                <FaTrash
                  onClick={() => deleteField(field.fieldName)}
                  size={18}
                  className="text-custom-primary-color cursor-pointer"
                />
                <Switch />
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
                  placeholder={field.fieldName}
                  className="px-3.5 py-1.5"
                />
              </div>
            );
          case "date":
            return (
              <div className="flex items-center gap-3">
                <FaTrash
                  onClick={() => deleteField(field.fieldName)}
                  size={18}
                  className="text-custom-primary-color cursor-pointer"
                />
                <CustomDatePicker
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
