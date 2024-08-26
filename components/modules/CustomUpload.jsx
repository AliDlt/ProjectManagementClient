import { Upload } from "antd";
import CustomLoading from "./CustomLoading";
import cn from "../../utils/cn";

const CustomUpload = ({
  onChange,
  accept,
  icon,
  className,
  title,
  loading,
  preview,
  ...rest
}) => {
  return (
    <Upload
      onChange={onChange}
      action={false}
      accept={accept}
      listType="picture-card"
      showUploadList={false}
      className={cn([
        "border-2 border-custom-primary-color-300 border-dashed bg-transparent hover:border-custom-primary-color rounded-2xl p-0 [&_.ant-upload-select]:w-full",
        className,
      ])}
      {...rest}
    >
      <button
        className="flex flex-col justify-center items-center gap-2 w-full "
        type="button"
      >
        {loading ? (
          <CustomLoading size={30} className="p-0" />
        ) : preview ? (
          preview
        ) : (
          <>
            {icon}
            <div>{title}</div>
          </>
        )}
      </button>
    </Upload>
  );
};

export default CustomUpload;