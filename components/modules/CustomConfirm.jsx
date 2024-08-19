import CustomModal from "./CustomModal";
import CustomButton from "./CustomButton";

function CustomConfirm({
  title,
  open,
  onCancel,
  okText,
  cancelText,
  okHandler,
  description,
}) {
  return (
    <CustomModal title={title} open={open} onCancel={onCancel}>
      <div className="mt-5 flex flex-col gap-3">
        <p className=" text-16">{description}</p>
        <div className="flex items-center gap-2 mr-auto">
          <CustomButton
            className="bg-red-500 hover:bg-red-400 px-5 py-1 h-auto border-2 border-red-500 w-20"
            onClick={okHandler}
          >
            {okText}
          </CustomButton>
          <CustomButton
            className="bg-transparent hover:bg-custom-primary-color-300/25 px-5 py-1 h-auto border-2 border-custom-primary-color w-20 text-black"
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
