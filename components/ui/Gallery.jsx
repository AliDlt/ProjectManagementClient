import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Empty, Image } from "antd";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { CiImageOff } from "react-icons/ci";
import { FaTrash } from "react-icons/fa6";
import CustomConfirm from "../modules/CustomConfirm";
import { useState } from "react";

function Gallery({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <div className="mt-7">
          {data?.length === 0 ? (
            <Empty
              description="عکسی وجود ندارد"
              className="my-20"
              image={
                <CiImageOff className="size-12 lg:size-20 text-gray-400" />
              }
              imageStyle={{
                height: "auto",
              }}
            />
          ) : (
            <Swiper
              className="h-[270px]"
              modules={[Navigation, Pagination]}
              breakpoints={{
                0: {
                  spaceBetween: 10,
                  slidesPerView: 1,
                },
                400: {
                  spaceBetween: 10,
                  slidesPerView: 1.2,
                },
                450: {
                  spaceBetween: 10,
                  slidesPerView: 1.3,
                },
                500: {
                  spaceBetween: 10,
                  slidesPerView: 1.4,
                },
                580: {
                  spaceBetween: 10,
                  slidesPerView: 1.8,
                },
                768: {
                  spaceBetween: 10,
                  slidesPerView: 2,
                },
                1024: {
                  spaceBetween: 10,
                  slidesPerView: 2.3,
                },
                1280: {
                  spaceBetween: 10,
                  slidesPerView: 2.5,
                },
                1496: {
                  spaceBetween: 10,
                  slidesPerView: 4,
                },
              }}
              navigation={{
                prevEl: ".prev-btn",
                nextEl: ".next-btn",
              }}
            >
              {data?.map((file) => (
                <SwiperSlide
                  key={file.fileName}
                  className="rounded-custom overflow-hidden !h-[220px] relative"
                >
                  <span
                    className="absolute top-2 right-2 text-custom-primary-color bg-white size-10 rounded-full flex justify-center items-center border-2 border-custom-primary-color cursor-pointer z-10"
                    onClick={() => setOpen(true)}
                  >
                    <FaTrash />
                  </span>
                  {file.fileFormat === "image" && (
                    <Image
                      className="object-cover w-full h-full"
                      src={file.fileURL}
                      alt={file.description}
                      crossOrigin="anonymous"
                      rootClassName="w-full h-full"
                      preview={{
                        mask: "بزرگ نمایی",
                      }}
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
              <div className="prev-btn absolute top-24 right-5 z-10 cursor-pointer">
                <FaChevronRight className="text-custom-primary-color size-7 z-50 " />
              </div>
              <div className="next-btn absolute top-24 left-5 z-10 cursor-pointer">
                <FaChevronLeft className="text-custom-primary-color size-7 z-50 " />
              </div>
            </Swiper>
          )}
        </div>
      </div>
      <CustomConfirm
        title="حذف فایل"
        open={open}
        onCancel={() => setOpen(false)}
        description="آیا از حذف این فایل اطمینان دارید ؟"
        okText="حذف"
        cancelText="لغو"
      />
    </>
  );
}

export default Gallery;
