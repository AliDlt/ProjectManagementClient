import React, { useState } from "react";
import CustomInput from "../../modules/CustomInput";
import CustomSelectInput from "../../modules/CustomSelectInput";
import CustomButton from "../../modules/CustomButton";

const fieldsType = [
  {
    value: "Text",
    label: "متن",
  },
  {
    value: "Number",
    label: "عدد",
  },
  {
    value: "Date",
    label: "تاریخ",
  },
  {
    value: "Boolean",
    label: "شرط",
  },
  {
    value: "textArea",
    label: "متن طولانی",
  },
];

function AddCustomCategoryField({ setFields }) {
  const [fieldType, setFieldType] = useState(null);
  const [fieldSlug, setFieldSlug] = useState("");

  // Add Field Handler
  const addFieldHandlerFn = (e) => {
    e.preventDefault();
    setFields({
      fieldName: fieldSlug,
      fieldType,
    });
    setFieldSlug("");
    setFieldType(null);
  };

  return (
    <form className="flex flex-col" onSubmit={addFieldHandlerFn}>
      <CustomInput
        placeholder="عنوان فیلد"
        className="px-3.5 py-1.5"
        value={fieldSlug}
        onChange={(e) => setFieldSlug(e.target.value)}
      />
      <CustomSelectInput
        options={fieldsType}
        placeholder="نوع فیلد"
        containerClassName="w-32 mt-5"
        onChange={(type) => setFieldType(type)}
        value={fieldType}
      />
      <CustomButton
        type="submit"
        className="mr-auto mt-10"
        disabled={!fieldType || !fieldSlug}
      >
        افزودن فیلد
      </CustomButton>
    </form>
  );
}

export default AddCustomCategoryField;
