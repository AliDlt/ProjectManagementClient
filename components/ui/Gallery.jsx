import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Empty } from "antd";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { CiImageOff } from "react-icons/ci";

function Gallery({ data, children }) {
  return (
    <div>
      <div className="mt-7">
        {data?.length === 0 ? (
          <Empty
            description="عکسی وجود ندارد"
            className="my-20"
            image={<CiImageOff className="size-12 lg:size-20 text-gray-400" />}
            imageStyle={{
              height: "auto",
            }}
          />
        ) : (
          <Swiper
            className="h-[310px]"
            modules={[Navigation, Pagination]}
            pagination={{
              clickable: true,
            }}
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
                spaceBetween: 25,
                slidesPerView: 4,
              },
            }}
            navigation={{
              prevEl: ".prev-btn",
              nextEl: ".next-btn",
            }}
          >
            {children}
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
  );
}

export default Gallery;
