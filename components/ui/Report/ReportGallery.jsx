import React, { useState, memo } from "react";
import Gallery from "../Gallery";
import { IoAddOutline } from "react-icons/io5";
import CustomUpload from "../../modules/CustomUpload";
import { BsExclamationLg } from "react-icons/bs";
import { Empty, Image, Popover } from "antd";
import CustomButton from "../../modules/CustomButton";
import CustomTextAria from "../../modules/CustomTextAria";
import { FaImage, FaTrash, FaVideo } from "react-icons/fa6";
import CustomModal from "../../modules/CustomModal";
import { SwiperSlide } from "swiper/react";
import { useToast } from "../../../Context/ToastContext";
import useUploadReportFile from "../../../hooks/Report/useUploadReportFile";
import { useParams } from "react-router-dom";
import useDeleteReportFile from "../../../hooks/Report/useDeleteReportFile";
import CustomConfirm from "../../modules/CustomConfirm";
import { useQueryClient } from "@tanstack/react-query";
import { filterFile } from "../../../utils/tools";
const popoverContent = (
  <div className="flex flex-col gap-2 text-12">
    <p>ویدئو ها با حجم 10 مگابایت</p>
    <p>عکس ها با حجم 2 مگابایت</p>
  </div>
);

const PreviewVideo = memo(({ video }) => {
  return (
    <div className="w-[90%] h-20 relative flex justify-center items-center z-50">
      <video
        controls
        className="w-full h-full rounded-lg"
        src={URL.createObjectURL(video)}
      />
    </div>
  );
});

const PreviewImage = memo(({ file }) => {
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
    </div>
  );
});
const ReportGallery = ({ id, data }) => {
  const [show, setShow] = useState();
  const toast = useToast();
  const [selectedImage, selectImage] = useState();
  const [selectedVideo, selectVideo] = useState();
  const [description, setDescription] = useState("");
  const [modalDeleteFile, ShowModalDeleteFile] = useState(false);
  const changeValue = (e) => {
    setDescription(e.target.value);
  };
  const { mutate, isPending } = useUploadReportFile();
  const successUpload = (e) => {
    console.log(e);
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
          console.log(e);
          return toast("مشکلی پیش آمده", "error");
        },
      },
    );
  };

  const uploadCustomFile = (info) => {
    if (
      info.file.type === ("image/jpeg" || "image/jpg" || "image/png") &&
      info.file.size > 2097152
    )
      return toast("حجم تصویر باید کمتر از 2 مگابایت باشد", "error");
    if (
      info.file.type === ("video/mp4" || "video/mpeg") &&
      info.file.size > 10485760
    )
      return toast("حجم ویدئو باید کمتر از 10 مگابایت باشد", "error");
    if (info.file.type.includes("image")) {
      selectImage(info.file);
    }

    if (info.file.type.includes("video")) {
      selectVideo(info.file);
    }
  };
  const uploadFileHandler = async () => {
    const promises = [];
    selectedImage && promises.push(uploadFile(selectedImage, "image"));
    selectedVideo && promises.push(uploadFile(selectedVideo, "video"));
    await Promise.all(promises);
  };
  const queryClient = useQueryClient();
  const { mutate: deleteFiles, isPending: loading } = useDeleteReportFile();
  const deleteFile = (e) => {
    deleteFiles(
      {
        id,
        fileName: e.fileName,
      },
      { onSuccess: (e) => console.log(e), onError: (e) => console.log(e) },
    );
  };
  return (
    <div>
      <div className="mt-6 flex justify-between px-4">
        <div className="flex w-full gap-2 text-20 items-center">
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
            <CustomButton
              onClick={() => setShow(true)}
              className="hover:bg-custom-primary-color w-10 rounded-full  h-10 p-1 text-custom-primary-color bg-transparent hover:text-white transition border-2 border-custom-primary-color "
            >
              <IoAddOutline className="text-24" />
            </CustomButton>

            <CustomModal onCancel={setShow} open={show} title="بارگزاری فایل">
              <div className="flex flex-col justify-center items-center gap-5 mt-5 md:flex-row">
                {/* Image */}
                <CustomUpload
                  customRequest={uploadCustomFile}
                  title="آپلود تصویر"
                  preview={
                    selectedImage && <PreviewImage file={selectedImage} />
                  }
                  className="w-full text-black/50"
                  icon={<FaImage size={25} />}
                  accept="image/png , image/jpg , image/jpeg"
                />
                {/* Video */}
                <CustomUpload
                  customRequest={uploadCustomFile}
                  preview={
                    selectedVideo && <PreviewVideo video={selectedVideo} />
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
          <>
            {data?.map((file) => {
              return (
                <>
                  {(file.fileFormat === "image" ||
                    file.fileFormat === "video") && (
                    <SwiperSlide
                      key={file.fileName}
                      className="rounded-custom overflow-hidden !h-[220px] relative"
                    >
                      <span
                        onClick={() => ShowModalDeleteFile(true)}
                        className="absolute top-2 right-2 text-custom-primary-color bg-white size-10 rounded-full flex justify-center items-center border-2 border-custom-primary-color cursor-pointer z-10"
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
                      <CustomConfirm
                        onCancel={() => ShowModalDeleteFile(false)}
                        cancelText={"خیر"}
                        loading={loading}
                        okHandler={() => deleteFile(file)}
                        okText={"بله"}
                        description={"آیا از حذف فایل مطمعن هستید"}
                        open={modalDeleteFile}
                        title="حذف فایل "
                      />
                    </SwiperSlide>
                  )}
                </>
              );
            })}
          </>
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
