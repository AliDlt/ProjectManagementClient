import { Image } from "antd";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import CustomModal from "../modules/CustomModal";
import CustomConfirm from "../modules/CustomConfirm";
import cn from "../../utils/cn";
import { IoMdDownload } from "react-icons/io";
import CustomLoading from "../modules/CustomLoading";

function ImageVideoSlide({ file, deleteFileMutate, deleteFilePending }) {
  const [openDeleteFileModal, setOpenDeleteFileModal] = useState(false);
  const [openFileInfoModal, setOpenFileInfoModal] = useState(false);

  // Delete File Handler
  const deleteFileHandler = async () => {
    try {
      await deleteFileMutate({
        fileName: file.fileName,
        id: file.sectionId,
      });
      setOpenDeleteFileModal(false);
    } catch (error) {}
  };

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-20 flex gap-2 ">
        <span
          className="text-custom-primary-color bg-white size-10 rounded-full flex justify-center items-center border-2 border-custom-primary-color cursor-pointer z-10 hover:bg-custom-primary-color hover:text-white"
          onClick={() => setOpenDeleteFileModal(true)}
        >
          <FaTrash />
        </span>
        <span
          className=" text-custom-primary-color bg-white size-10 rounded-full flex justify-center items-center border-2 border-custom-primary-color cursor-pointer z-10 hover:bg-custom-primary-color hover:text-white"
          onClick={() => setOpenFileInfoModal(true)}
        >
          <IoEyeSharp size={25} />
        </span>
        <a
          href={file.fileURL}
          download
          className=" text-custom-primary-color bg-white size-10 rounded-full flex justify-center items-center border-2 border-custom-primary-color cursor-pointer z-10 hover:bg-custom-primary-color hover:text-white"
        >
          <IoMdDownload size={25} />
        </a>
      </div>
      {file.fileFormat === "image" && (
        <>
          <Image
            className="object-cover w-full h-[220px] rounded-custom"
            src={file.fileURL}
            alt={file.description}
            rootClassName="w-full rounded-custom"
            preview={{
              mask: "بزرگ نمایی",
            }}
            fallback="/images/download.png"
            placeholder={<CustomLoading />}
          />
          <p className="truncate">{file.description}</p>
        </>
      )}
      {file.fileFormat === "video" && (
        <>
          <video
            className="bg-custom-primary-color-300/50 w-full h-[220px] rounded-custom "
            controls
            src={file.fileURL}
            alt={file.description}
            crossOrigin="anonymous"
          />
          <p className="truncate mt-2.5">{file.description}</p>
        </>
      )}
      <CustomConfirm
        title="حذف فایل"
        open={openDeleteFileModal}
        onCancel={() => setOpenDeleteFileModal(false)}
        description="آیا از حذف این فایل اطمینان دارید ؟"
        okText="حذف"
        cancelText="لغو"
        okHandler={deleteFileHandler}
        loading={deleteFilePending}
      />
      {/* Modal Project Info */}
      <CustomModal
        open={openFileInfoModal}
        onCancel={() => setOpenFileInfoModal(false)}
      >
        {file.fileFormat === "image" && (
          <Image
            className="object-cover w-full h-full rounded-custom"
            src={file.fileURL}
            alt={file.description}
            rootClassName="w-full h-[220px] rounded-custom"
            preview={{
              mask: "بزرگ نمایی",
            }}
            fallback="/images/download.png"
          />
        )}
        {file.fileFormat === "video" && (
          <video
            className="bg-custom-primary-color-300/50 w-full h-[220px] rounded-custom "
            controls
            src={file.fileURL}
            alt={file.description}
            crossOrigin="anonymous"
          />
        )}
        <p
          className={cn(
            "text-justify",
            file.fileFormat === "video" && "mt-2.5",
          )}
        >
          {file.description}
        </p>
      </CustomModal>
    </div>
  );
}

export default ImageVideoSlide;
