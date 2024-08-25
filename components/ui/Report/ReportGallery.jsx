import React, { useState } from "react";
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
const popoverContent = (
  <div className="flex flex-col gap-2 text-12">
    <p>ویدئو ها با حجم 10 مگابایت</p>
    <p>عکس ها با حجم 2 مگابایت</p>
  </div>
);

const ReportGallery = ({ id, data }) => {
  const [show, setShow] = useState();
  const changeValue = (e) => {
    setDescription(e.target.value);
  };

  const [description, setDescription] = useState("");
  const changeFile = (e)=>{
    console.log(e)
    
  }
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
                  action="/api/report/uploadImage"
                  title="آپلود تصویر"
                  className="w-full text-black/50"
                  icon={<FaImage size={25} />}
                  accept="image/png , image/jpg , image/jpeg"
                  data={{
                    id,
                    description,
                    fileFormat: "image",
                  }}
                  disabled={!description}
                />
                {/* Video */}
                <CustomUpload
                  action="/api/report/uploadVideo"
                  title="آپلود ویدئو"
                  className="w-full text-black/50"
                  icon={<FaVideo size={25} />}
                  accept="video/mp4 , video/mpeg"
                  disabled={!description}
                  data={{
                    id,
                    description,
                    fileFormat: "video",
                  }}
                  onChange={changeFile}
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
            </CustomModal>
          </div>
        </div>
      </div>

      <Gallery>
        {data?.length ? (
          <>
            {data?.map((file) => {
              return (
                <SwiperSlide
                  key={file.fileName}
                  className="rounded-custom overflow-hidden !h-[220px] relative"
                >
                  <span className="absolute top-2 right-2 text-custom-primary-color bg-white size-10 rounded-full flex justify-center items-center border-2 border-custom-primary-color cursor-pointer z-10">
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
              );
            })}
          </>
        ) : (
          <div>
            <Empty description="محتوایی وجود ندارد" />
          </div>
        )}
      </Gallery>
    </div>
  );
};

export default ReportGallery;
