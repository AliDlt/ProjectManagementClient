import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Grid, Navigation, Pagination } from "swiper/modules";
import CustomButton from "../modules/CustomButton";
import { MdDelete, MdOutlineFileDownload } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import IconFile from "./Report/IconFile";

export default function Files({ items }) {
  return (
    <Swiper
      grid={{ rows: 2, fill: "row" }}
      navigation={{
        prevEl: ".prev-btn",
        nextEl: ".next-btn",
      }}
      breakpoints={{
        0: {
          grid: { rows: 2 },
          slidesPerView: 2,
        },
        768: {
          grid: { rows: 1 },
          slidesPerView: 3,
        },
      }}
      spaceBetween={30}
      modules={[Grid, Pagination, Navigation]}
      className="mySwiper md:h-[200px] min-h-[150px]"
    >
      {items?.map((item, key) => {
        return (
          <SwiperSlide key={key} className="flex items-center justify-center">
            <div className="h-full flex justify-center items-center flex-col gap-2">
              <div className="relative w-full  rounded-custom  bg-black bg-opacity-5 h-[150px] flex flex-col justify-center items-center  border-2 border-custom-primary-color ">
                <CustomButton className="absolute bg-white hover:text-white  p-1 h-8 border-2 border-custom-primary-color border-solid w-8 rounded-full text-20 text-custom-primary-color  left-4 top-4">
                  <MdDelete />
                </CustomButton>
                <span className="text-4xl text-black text-opacity-50">
                  <IconFile type={item.fileFormat} />
                </span>
              </div>
              <p className="text-14">اسم فایل </p>
            </div>
          </SwiperSlide>
        );
      })}
      <div
        className="prev-btn absolute top-1/2 right-5 -translate-y-1/2 z-10 cursor-pointer 
"
      >
        <FaChevronRight className="text-custom-primary-color size-7 z-50 " />
      </div>
      <div className="next-btn absolute top-1/2 left-5 -translate-y-1/2 z-10 cursor-pointer ">
        <FaChevronLeft className="text-custom-primary-color size-7 z-50 " />
      </div>
    </Swiper>
  );
}
