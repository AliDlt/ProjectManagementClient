import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

function Gallery(data) {
  return (
    <div>
      <div className="mt-5">
        {/* <Empty description="عکسی وجود ندارد" className="my-20" /> */}
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
          pagination={{}}
        >
          <SwiperSlide className="rounded-custom overflow-hidden !h-[220px] ">
            <img
              className="object-cover w-full h-full"
              src="/images/5.png"
              alt="project image"
            />
          </SwiperSlide>
          <SwiperSlide className="rounded-custom overflow-hidden !h-[220px] ">
            <img
              className="object-cover w-full h-full "
              src="/images/6.png"
              alt="project image"
            />
          </SwiperSlide>
          <SwiperSlide className="rounded-custom overflow-hidden !h-[220px] ">
            <img
              className="object-cover w-full h-full"
              src="/images/8.jpg"
              alt="project image"
            />
          </SwiperSlide>
          <SwiperSlide className="rounded-custom overflow-hidden !h-[220px] ">
            <img
              className="object-cover w-full h-full "
              src="/images/7.jpg"
              alt="project image"
            />
          </SwiperSlide>
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
      </div>
    </div>
  );
}

export default Gallery;
