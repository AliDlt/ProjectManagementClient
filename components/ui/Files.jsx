import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Grid, Navigation, Pagination } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Empty } from "antd";

export default function Files({ children }) {
  return (
    <>
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
          1080: {
            grid: { rows: 1 },
            slidesPerView: 4,
          },
        }}
        spaceBetween={30}
        modules={[Grid, Pagination, Navigation]}
        className="mySwiper "
      >
        {children}

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
    </>
  );
}
