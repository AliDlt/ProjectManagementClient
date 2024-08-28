import { IoClose } from "react-icons/io5";
import { Image, Popover } from "antd";
import { BsExclamationLg } from "react-icons/bs";
import { useRef, useState } from "react";
import { FaVideo, FaImage, FaTrash } from "react-icons/fa6";
import { SwiperSlide } from "swiper/react";
import CustomButton from "../../../modules/CustomButton";
import CustomModal from "../../../modules/CustomModal";
import CustomUpload from "../../../modules/CustomUpload";
import Gallery from "../../Gallery";
import CustomConfirm from "../../../modules/CustomConfirm";
import useDeleteProjectFile from "../../../../hooks/projects/useDeleteProjectFile";
import CustomTextAria from "../../../modules/CustomTextAria";
import { useToast } from "../../../../Context/ToastContext";
import useUploadProjectFile from "../../../../hooks/projects/useUploadProjectFile";
import { useNavigate } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

function ProjectGallery({ projectGalleryData, projectId }) {
  const [fileDescription, setFileDescription] = useState("");
  const [openAddFileModal, setOpenAddFileModal] = useState(false);
  const [openDeleteFileModal, setOpenDeleteFileModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(false);
  const { deleteFile, isPending } = useDeleteProjectFile(projectId);
  const { uploadProjectFileFn, uploadProjectFilePending } =
    useUploadProjectFile(projectId);
  const projectInfo = useRef(null);
  const toast = useToast();
  const navigate = useNavigate();

  // Popover Content
  const popoverContent = (
    <div className="flex flex-col gap-2 text-12">
      <p>ویدئو ها تا حجم 30 مگابایت</p>
      <p>عکس ها تا حجم 10 مگابایت</p>
    </div>
  );

  // Custom Uploader Request
  const customUploaderRequest = (info) => {
    // check file size
    if (info.filename === "image" && info.file.size > 10485760)
      return toast("حجم تصویر باید کمتر از 10 مگابایت باشد", "error");
    if (info.filename === "video" && info.file.size > 31457280)
      return toast("حجم ویدئو باید کمتر از 30 مگابایت باشد", "error");

    // set preview
    if (info.filename === "image") {
      setSelectedImage(info.file);
    }
    if (info.filename === "video") {
      setSelectedVideo(info.file);
    }
  };

  // Upload Image / Video
  const uploadFile = async (file, fileFormat) => {
    return uploadProjectFileFn({
      id: projectId,
      description: fileDescription,
      fileFormat,
      file,
    });
  };

  // Upload Image / Video Handler
  const uploadFileHandler = async (e) => {
    e.preventDefault();
    const promises = [];
    if (selectedImage) promises.push(uploadFile(selectedImage, "image"));
    if (selectedVideo) promises.push(uploadFile(selectedVideo, "video"));

    try {
      await Promise.all(promises);
      toast("فایل بارگزاری شد", "success");
      setFileDescription("");
      setSelectedImage(false);
      setSelectedVideo(false);
      setOpenAddFileModal(false);
    } catch (error) {
      toast(error.response.data.message, "error");
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
    } catch (error) {}
  };

  return (
    <>
      <div className="flex justify-between items-center mt-10">
        <div className="flex justify-between w-full items-center gap-3 flex-wrap">
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
            onClick={() => setOpenAddFileModal(true)}
            className="mr-auto"
          >
            بارگزاری عکس / ویدئو
          </CustomButton>
        </div>
        {/* Modal */}
        <CustomModal
          title="بارگزاری عکس و فیلم"
          open={openAddFileModal}
          onCancel={() => setOpenAddFileModal(false)}
        >
          <form>
            <div className="flex flex-col justify-center sm:items-center gap-5 mt-5 sm:flex-row">
              {/* Image */}
              <div className="flex flex-col flex-1 gap-2">
                <span>عکس ها با حجم 2 مگابایت</span>
                <CustomUpload
                  title="بارگزاری تصویر"
                  className="w-full"
                  icon={<FaImage size={25} />}
                  accept="image/png , image/jpg , image/jpeg"
                  name="image"
                  customRequest={customUploaderRequest}
                  preview={
                    selectedImage && (
                      <div
                        className=" w-[90%] h-20  relative flex justify-center items-center z-50"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <img
                          className="object-cover w-full h-full rounded-lg"
                          src={URL.createObjectURL(selectedImage)}
                          alt="image preview"
                        />
                        <span
                          className="absolute bg-white rounded-full border-2 border-custom-primary-color top-1 right-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(false);
                          }}
                        >
                          <IoClose />
                        </span>
                      </div>
                    )
                  }
                />
              </div>
              {/* Video */}
              <div className="flex flex-col flex-1 gap-2 ">
                <span>ویدئو ها با حجم 10 مگابایت</span>
                <CustomUpload
                  title="بارگزاری ویدئو"
                  className="w-full"
                  icon={<FaVideo size={25} />}
                  accept="video/mp4 , video/mpeg"
                  name="video"
                  customRequest={customUploaderRequest}
                  preview={
                    selectedVideo && (
                      <div
                        className=" w-[90%] h-20 relative flex justify-center items-center z-50"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <video
                          controls
                          className="w-full h-full rounded-lg"
                          src={URL.createObjectURL(selectedVideo)}
                        />
                        <span
                          className="absolute bg-white rounded-full border-2 border-custom-primary-color top-1 right-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVideo(false);
                          }}
                        >
                          <IoClose />
                        </span>
                      </div>
                    )
                  }
                />
              </div>
            </div>
            <div>
              <CustomTextAria
                className="mt-5"
                placeholder="توضیحات فایل ( اجباری )"
                rows={3}
                onChange={(e) => setFileDescription(e.target.value)}
                value={fileDescription}
              />
            </div>
            <CustomButton
              className="mt-5"
              onClick={uploadFileHandler}
              disabled={(!selectedImage && !selectedVideo) || !fileDescription}
              loading={uploadProjectFilePending}
              type="submit"
            >
              بارگزاری
            </CustomButton>
          </form>
        </CustomModal>
      </div>
      {/* Slider */}
      <Gallery data={projectGalleryData}>
        {projectGalleryData?.slice(0, 7)?.map((file) => (
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
        {projectGalleryData?.length > 7 && (
          <span
            className="absolute top-4 left-4 z-20 bg-white text-black px-2 py-0.5 rounded-custom border-2 border-custom-primary-color cursor-pointer hover:bg-custom-primary-color hover:text-white text-14"
            onClick={() => navigate(`/projects/gallery/${projectId}`)}
          >
            مشاهده همه
          </span>
        )}
      </Gallery>
    </>
  );
}

export default ProjectGallery;
