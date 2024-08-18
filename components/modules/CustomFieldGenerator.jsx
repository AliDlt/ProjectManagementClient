import { useFieldArray } from "react-hook-form";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import cn from "../../utils/cn";
import { CloseOutlined } from "@ant-design/icons";

function CustomFieldGenerator({
  className,
  placeholder,
  control,
  error = false,
  type,
  icon,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields",
  });

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold">توضیحات اضافه</h3>
      <div className="flex flex-wrap gap-4 gap-y-6">
        {fields.map((item, index) => (
          <div className="flex gap-4 items-center" key={item.id}>
            <CustomInput
              control={control}
              error={error}
              name={`customFields[${index}].value`}
              className={cn(
                `h-[50px] text-16 px-5 bg-transparent md:text-18`,
                className,
              )}
              type={type}
              icon={icon}
              placeholder={`${placeholder} ${index + 1}`}
            />
            <CustomButton
              type="button"
              onClick={() => remove(index)}
              className="p-2 bg-red-500 text-white flex-shrink-0"
            >
              <CloseOutlined />
            </CustomButton>
          </div>
        ))}
      </div>

      <CustomButton
        onClick={() => append({ value: "" })}
        className="h-[50px] w-full mx-auto text-20 md:w-full md:mt-5"
        type="button"
      >
        <span className="text-white">افزودن فیلد</span>
      </CustomButton>
    </div>
  );
}

export default CustomFieldGenerator;
