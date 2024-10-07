import React, { useState, memo } from "react";
import Gallery from "../Gallery";
import CustomUpload from "../../modules/CustomUpload";
import { BsExclamationLg } from "react-icons/bs";
import { Empty, Popover } from "antd";
import CustomButton from "../../modules/CustomButton";
import CustomTextAria from "../../modules/CustomTextAria";
import { FaImage, FaVideo } from "react-icons/fa6";
import CustomModal from "../../modules/CustomModal";
import { SwiperSlide } from "swiper/react";
import { useToast } from "../../../Context/ToastContext";
import useUploadReportFile from "../../../hooks/Report/useUploadReportFile";
import useDeleteReportFile from "../../../hooks/Report/useDeleteReportFile";
import { useQueryClient } from "@tanstack/react-query";
import { filterFile, imageTypes, videoFormats } from "../../../utils/tools";
import ImageVideoSlide from "../ImageVideoSlide";
import { IoClose } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
const popoverContent = (
  <div className="flex flex-col gap-2 text-12">
    <p>ویدئو ها با حجم 50 مگابایت</p>
    <p>عکس ها با حجم 50 مگابایت</p>
  </div>
);

const PreviewVideo = memo(({ video, closeVideo }) => {
  return (
    <div className="w-[90%] h-20 relative flex justify-center items-center z-50">
      <video
        controls
        className="w-full h-full rounded-lg"
        src={URL.createObjectURL(video)}
      />

      <span
        className="absolute bg-white rounded-full border-2 border-custom-primary-color top-1 right-1"
        onClick={(e) => {
          e.stopPropagation();
          closeVideo(false);
        }}
      >
        <IoClose />
      </span>
    </div>
  );
});

const PreviewImage = memo(({ file, closeImage }) => {
  return (
    <div
      className="w-[90%] h-20 relative flex justify-center items-center z-50"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <img
        className="object-cover w-full h-full rounded-lg"
        src={URL.createObjectURL(file)}
        alt="image preview"
      />

      <span
        className="absolute bg-white rounded-full border-2 border-custom-primary-color top-1 right-1"
        onClick={(e) => {
          e.stopPropagation();
          closeImage(false);
        }}
      >
        <IoClose />
      </span>
    </div>
  );
});
const ReportGallery = ({ id, data, isEditable, userRole }) => {
  const [show, setShow] = useState();
  const toast = useToast();
  const [selectedImage, selectImage] = useState();
  const [selectedVideo, selectVideo] = useState();
  const [description, setDescription] = useState("");
  const changeValue = (e) => {
    setDescription(e.target.value);
  };
  const { mutate, isPending } = useUploadReportFile();
  const successUpload = (e) => {
    toast("با موفقیت بارگزاری شد", "success");
    selectImage("");
    selectVideo("");
    setDescription("");
    setShow(false);
    queryClient.invalidateQueries("get-report", id);
  };
  const uploadFile = (file, fileFormat) => {
    mutate(
      {
        id,
        description,
        fileFormat,
        file,
      },
      {
        onSuccess: successUpload,
        onError: (e) => {
          return toast("مشکلی پیش آمده", "error");
        },
      },
    );
  };

  const uploadCustomFile = (info) => {
    const videoFormat = videoFormats.includes(info.file.type);
    const imageFormat = imageTypes.includes(info.file.type);
    if (!videoFormat && !imageFormat) {
      return toast("فایل را در این قسمت نمیتوانید وارد کنید", "error");
    }
    if (
      (info.file.type === "image/jpeg" ||
        info.file.type === "image/jpg" ||
        info.file.type === "image/png") &&
      info.file.size > 5197152 //
    ) {
      return toast("حجم تصویر باید کمتر از 50 مگابایت باشد", "error");
    }

    if (
      (info.file.type === "video/mp4" || info.file.type === "video/mpeg") &&
      info.file.size > 51485760 //
    ) {
      return toast("حجم ویدئو باید کمتر از 50 مگابایت باشد", "error");
    }

    if (info.file.type.includes("image")) {
      selectImage(info.file);
    }

    if (info.file.type.includes("video")) {
      selectVideo(info.file);
    }
  };

  const queryClient = useQueryClient();

  const uploadFileHandler = async () => {
    const promises = [];
    selectedImage && promises.push(uploadFile(selectedImage, "image"));
    selectedVideo && promises.push(uploadFile(selectedVideo, "video"));
    await Promise.all(promises);
  };
  const { mutate: deleteFiles, isPending: loading } = useDeleteReportFile();
  const deleteMediaSuccess = (e) => {
    toast(e.message, "success");
    setShow(false);
    queryClient.invalidateQueries("get-report", id);
  };
  const deleteFile = (e) => {
    deleteFiles(
      {
        id,
        fileName: e.fileName,
      },
      { onSuccess: deleteMediaSuccess },
    );
  };
  return (
    <div>
      <div className="mt-6 flex justify-between px-4">
        <div className="flex w-full gap-2 text-20 items-center my-4">
          <h4 className="text-base">گالری عکس ها</h4>
          <Popover
            content={popoverContent}
            arrow={false}
            overlayInnerStyle={{
              borderRadius: "8px",
              border: "2px solid rgb(var(--primary-color))",
            }}
          >
            <span className="flex justify-center items-center ring-2   ring-custom-primary-color rounded-full cursor-pointer">
              <BsExclamationLg className="text-custom-primary-color  group-hover:text-white" />
            </span>
          </Popover>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex justify-center items-center  ">
            {(isEditable || userRole === 0) && (
              <CustomButton
                onClick={() => setShow(true)}
                className=" rounded-full w-10 h-10 p-3 transition border-2 border-custom-primary-color  "
              >
                <IoMdAdd />
              </CustomButton>
            )}
            <CustomModal onCancel={setShow} open={show} title="بارگزاری فایل">
              <div className="flex flex-col justify-center items-center gap-5 mt-5 md:flex-row">
                {/* Image */}
                <CustomUpload
                  customRequest={uploadCustomFile}
                  title="آپلود تصویر"
                  preview={
                    selectedImage && (
                      <PreviewImage
                        file={selectedImage}
                        closeImage={selectImage}
                      />
                    )
                  }
                  className="w-full text-black/50"
                  icon={<FaImage size={25} />}
                  accept="image/png , image/jpg , image/jpeg"
                />
                {/* Video */}
                <CustomUpload
                  customRequest={uploadCustomFile}
                  preview={
                    selectedVideo && (
                      <PreviewVideo
                        video={selectedVideo}
                        closeVideo={selectVideo}
                      />
                    )
                  }
                  title="آپلود ویدئو"
                  className="w-full text-black/50"
                  icon={<FaVideo size={25} />}
                  accept="video/mp4 , video/mpeg"
                />
              </div>
              <div>
                <CustomTextAria
                  className="mt-5"
                  value={description}
                  placeholder="توضیحات  ( اجباری )"
                  rows={3}
                  onChange={changeValue}
                />
              </div>
              <div className="mt-2">
                <CustomButton
                  loading={isPending}
                  disabled={(!selectedImage && !selectedVideo) || !description}
                  onClick={uploadFileHandler}
                  className="p-4 rounded-xl"
                >
                  بارگزاری
                </CustomButton>
              </div>
            </CustomModal>
          </div>
        </div>
      </div>

      {filterFile(data, "gallery")?.length ? (
        <Gallery>
          {data?.map(
            (file) =>
              (file.fileFormat === "video" || file.fileFormat === "image") && (
                <SwiperSlide
                  key={file.fileName}
                  className="overflow-hidden relative"
                >
                  <ImageVideoSlide
                    file={file}
                    deleteFilePending={loading}
                    deleteFileMutate={deleteFile}
                  />
                </SwiperSlide>
              ),
          )}
        </Gallery>
      ) : (
        <div>
          <Empty description="محتوایی وجود ندارد" />
        </div>
      )}
    </div>
  );
};

export default ReportGallery;
