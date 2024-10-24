import CustomModal from "./CustomModal";
import CustomButton from "./CustomButton";
import CustomLoading from "./CustomLoading";
import cn from "../../utils/cn";

function CustomConfirm({
  title,
  open,
  onCancel,
  okText,
  cancelText,
  okHandler,
  description,
  loading = false,
  okClassName,
}) {
  return (
    <CustomModal title={title} open={open} onCancel={onCancel}>
      <div className="flex flex-col gap-3">
        <p className=" text-16">{description}</p>
        <div className="flex items-center gap-2 mr-auto">
          <CustomButton
            className={cn([
              "  px-5 py-1 border-2 border-custom-primary-color w-20 h-[33px] flex justify-center items-center",
              okClassName,
            ])}
            onClick={okHandler}
          >
            {loading ? (
              <CustomLoading
                size={20}
                className={cn([
                  "p-0 flex justify-center items-center size-5 [&_span_span]:!border-white",
                ])}
              />
            ) : (
              okText
            )}
          </CustomButton>
          <CustomButton
            className="bg-custom-primary-color hover:bg-gray-100 bg-transparent text-gray-500  px-5 py-1 h-[33px] border-2 border-gray-500 w-20 "
            onClick={onCancel}
          >
            {cancelText}
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  );
}

export default CustomConfirm;
