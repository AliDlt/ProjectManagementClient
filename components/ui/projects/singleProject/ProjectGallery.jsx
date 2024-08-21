import { IoAddOutline } from "react-icons/io5";
import { Image, Popover } from "antd";
import { BsExclamationLg } from "react-icons/bs";
import { useRef, useState } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { FaVideo, FaImage, FaTrash } from "react-icons/fa6";
import { useQueryClient } from "@tanstack/react-query";
import { SwiperSlide } from "swiper/react";
import CustomButton from "../../../modules/CustomButton";
import CustomModal from "../../../modules/CustomModal";
import CustomUpload from "../../../modules/CustomUpload";
import Gallery from "../../Gallery";
import CustomConfirm from "../../../modules/CustomConfirm";
import useDeleteProjectFile from "../../../../hooks/projects/useDeleteProjectFile";
import CustomTextAria from "../../../modules/CustomTextAria";

function ProjectGallery({ projectGalleryData, projectId }) {
  const [fileDescription, setFileDescription] = useState("");
  const [openAddFileModal, setOpenAddFileModal] = useState(false);
  const [openDeleteFileModal, setOpenDeleteFileModal] = useState(false);
  const queryClient = useQueryClient();
  const projectInfo = useRef(null);
  const { deleteFile, isPending } = useDeleteProjectFile();

  // Popover Content
  const popoverContent = (
    <div className="flex flex-col gap-2 text-12">
      <p>ویدئو ها با حجم 10 مگابایت</p>
      <p>عکس ها با حجم 2 مگابایت</p>
    </div>
  );

  // Uploaders Change Handlers
  const uploadersChangeHandler = (info) => {
    if (info.file.status === "done") {
      queryClient.invalidateQueries("project", projectId);
    }
  };

  // Delete File Handler
  const deleteFileHandler = async () => {
    try {
      await deleteFile({
        fileName: projectInfo.current.fileName,
        id: projectId,
      });
      setOpenDeleteFileModal(false);
      queryClient.invalidateQueries("project", projectId);
    } catch (error) {}
  };

  return (
    <>
      <div className="flex justify-between items-center mt-10">
        <div className="flex items-center gap-3">
          <h3 className="text-20 font-extrabold">گالری عکس ها</h3>
          <Popover
            content={popoverContent}
            arrow={false}
            overlayInnerStyle={{
              borderRadius: "8px",
              border: "2px solid rgb(var(--primary-color))",
            }}
          >
            <span className="flex justify-center items-center ring-2 ring-custom-primary-color rounded-full cursor-pointer">
              <BsExclamationLg className="text-custom-primary-color rounded-full group-hover:text-white" />
            </span>
          </Popover>
        </div>
        <CustomButton
          className="flex justify-center items-center ring-2 ring-custom-primary-color bg-white rounded-full size-10 p-0 hover:bg-custom-primary-color group"
          onClick={() => setOpenAddFileModal(true)}
        >
          <IoAddOutline
            size={25}
            className="text-custom-primary-color rounded-full group-hover:text-white"
          />
        </CustomButton>
        {/* Modal */}
        <CustomModal
          title="آپلود عکس و فیلم"
          open={openAddFileModal}
          onCancel={() => setOpenAddFileModal(false)}
        >
          <div className="flex flex-col justify-center items-center gap-5 mt-5 md:flex-row">
            {/* Image */}
            <CustomUpload
              action="/api/project/uploadFile"
              title="آپلود تصویر"
              className="w-full"
              icon={<FaImage size={25} />}
              accept="image/png , image/jpg , image/jpeg"
              data={{
                id: projectId,
                description: fileDescription,
                fileFormat: "image",
              }}
              disabled={!fileDescription}
              onChange={uploadersChangeHandler}
              multiple
            />
            {/* Video */}
            <CustomUpload
              action="/api/project/uploadFile"
              title="آپلود ویدئو"
              className="w-full"
              icon={<FaVideo size={25} />}
              accept="video/mp4 , video/mpeg"
              data={{
                id: projectId,
                description: fileDescription,
                fileFormat: "video",
              }}
              disabled={!fileDescription}
              onChange={uploadersChangeHandler}
            />
          </div>
          <div>
            <CustomTextAria
              className="mt-5"
              placeholder="توضیحات فایل ( اجباری )"
              rows={3}
              onChange={(e) => setFileDescription(e.target.value)}
            />
          </div>
        </CustomModal>
      </div>
      <Gallery data={projectGalleryData}>
        {projectGalleryData?.map((file) => (
          <SwiperSlide
            key={file.fileName}
            className="rounded-custom overflow-hidden !h-[220px] relative"
          >
            <span
              className="absolute top-2 right-2 text-custom-primary-color bg-white size-10 rounded-full flex justify-center items-center border-2 border-custom-primary-color cursor-pointer z-10"
              onClick={() => {
                setOpenDeleteFileModal(true);
                projectInfo.current = file;
              }}
            >
              <FaTrash />
            </span>
            {file.fileFormat === "image" && (
              <Image
                className="object-cover w-full h-full"
                src={file.fileURL}
                alt={file.description}
                rootClassName="w-full h-full"
                preview={{
                  mask: "بزرگ نمایی",
                }}
                fallback="/images/download.png"
              />
            )}
            {file.fileFormat === "video" && (
              <video
                className="bg-custom-primary-color-300/50 w-full h-full"
                controls
                src={file.fileURL}
                alt={file.description}
                crossOrigin="anonymous"
              />
            )}
          </SwiperSlide>
        ))}
        <CustomConfirm
          title="حذف فایل"
          open={openDeleteFileModal}
          onCancel={() => setOpenDeleteFileModal(false)}
          description="آیا از حذف این فایل اطمینان دارید ؟"
          okText="حذف"
          cancelText="لغو"
          okHandler={deleteFileHandler}
          loading={isPending}
        />
      </Gallery>
    </>
  );
}

export default ProjectGallery;
