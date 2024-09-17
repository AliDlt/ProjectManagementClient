import React, { useState } from "react";
import CustomButton from "../../modules/CustomButton";
import { Empty, Popover } from "antd";
import { BsExclamationLg } from "react-icons/bs";
import CustomUpload from "../../modules/CustomUpload";
import Files from "../Files";
import { IoAddOutline } from "react-icons/io5";
import { FaFile } from "react-icons/fa6";
import CustomModal from "../../modules/CustomModal";
import CustomTextAria from "../../modules/CustomTextAria";
import { SwiperSlide } from "swiper/react";
import CustomSlideFIle from "../../modules/CustomSlideFIle";
import useDeleteReportFile from "../../../hooks/Report/useDeleteReportFile";
import { useToast } from "../../../Context/ToastContext";
import IconFile from "../IconFile";
import useUploadReportFile from "../../../hooks/Report/useUploadReportFile";
import { useParams } from "react-router-dom";
import { filterFile, imageTypes, videoFormats } from "../../../utils/tools";
import { useQueryClient } from "@tanstack/react-query";
const popoverContent = (
  <div className="flex flex-col gap-2 text-12">
    <p>اسناد با حجم حد اکثر 5 مگابایت</p>
  </div>
);

const Preview = (file) => {
  return (
    <div className="max-w-full">
      <div className=" flex flex-col gap-3 items-center w-full  ">
        <IconFile size={32} type={file.file.type} />
        <p className=" line-clamp-1 w-full px-2"> {file.file.name}</p>
      </div>
    </div>
  );
};

const ShowFiles = ({ data, isEditable }) => {
  console.log(isEditable);
  const [description, setDescription] = useState();
  const [show, setShow] = useState();
  const [selectedFile, selectFile] = useState();
  const changeValue = (e) => {
    setDescription(e.target.value);
  };
  const { id } = useParams();

  const toast = useToast();
  const { mutate: upload, isPending: loading } = useUploadReportFile();
  const customUploadFile = (file) => {
    const checkImage = imageTypes.includes(file.file.type);
    const videoFormat = videoFormats.includes(file.file.type);
    console.log(checkImage);
    if (checkImage || videoFormat) {
      return toast("تصاویر و ویدیو را نمیتوان بارگزاری کرد", "error");
    }

    const fileSizeInMB = (file.file.size / (1024 * 1024)).toFixed(2);
    console.log(file);
    if (file.filename !== "file") {
      return toast("لطفا یک فایل را انتخاب کنید", "error");
    } else if (fileSizeInMB > 20) {
      return toast("فایل انختابی شما حد اکثر باید 10 مگابایت باشد", "error");
    } else {
      selectFile(file);
    }
  };
  const queryClient = useQueryClient();
  const successUpload = (e) => {
    toast(e?.data?.message, "success");
    setShow(false);
    selectFile("");
    setDescription("");
    queryClient.invalidateQueries("get-report", id);
  };
  const uploadFile = () => {
    console.log(selectedFile.file.fileFormat);

    upload(
      {
        file: selectedFile.file,
        fileFormat: "file",
        id,
        description,
      },
      { onError: (e) => console.log(e), onSuccess: successUpload },
    );
  };

  const { mutate, isPending } = useDeleteReportFile();
  return (
    <div className="my-6 ">
      <div className="my-6 flex justify-between px-4">
        <div className="flex w-full gap-2 text-20 items-center">
          <h4 className="text-base">اسناد</h4>
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
        {isEditable && (
          <div className="flex justify-center items-center ">
            <CustomButton
              onClick={() => setShow(true)}
              className=" rounded-xl  p-3  transition border-2 border-custom-primary-color "
            >
              افزودن فایل
            </CustomButton>
          </div>
        )}
      </div>
      {filterFile(data.file, "file")?.length ? (
        <Files>
          <>
            {data?.file?.map((item, key) => {
              return (
                <div key={key}>
                  {item.fileFormat !== "image" &&
                    item.fileFormat !== "video" && (
                      <SwiperSlide
                        key={key}
                        className="flex items-center justify-center"
                      >
                        <CustomSlideFIle
                          mutate={mutate}
                          isPending={isPending}
                          item={item}
                        />
                      </SwiperSlide>
                    )}
                </div>
              );
            })}
          </>
        </Files>
      ) : (
        <div>
          <Empty description="سندی وجود ندارد" />
        </div>
      )}

      <CustomModal onCancel={setShow} open={show} title="بارگزاری فایل">
        <div className="flex gap-4 flex-col">
          <CustomUpload
            // action={action}
            customRequest={customUploadFile}
            preview={selectedFile && Preview(selectedFile)}
            data={{
              ...data,
              fileFormat: "application/pdf",
              description: description,
            }}
            className="mt-4  text-black/50 !text-20 "
            accept="application/pdf,text/plain,application/zip,application/msword,application/vnd.rar"
            title="بارگزاری فایل"
            onChange={(e) => console.log(e)}
            icon={<FaFile />}
          />
          <div>
            <CustomTextAria
              placeholder={"توضیحات (الزامی)"}
              value={description}
              onChange={changeValue}
            />
          </div>
          <div>
            <CustomButton
              disabled={!description || !selectedFile}
              loading={loading}
              onClick={uploadFile}
            >
              بارگزاری فایل
            </CustomButton>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default ShowFiles;
