import { Slider } from "antd";
import React from "react";
import { MdOutlineEdit } from "react-icons/md";

function ProjectInfo() {
  return (
    <div className="flex flex-wrap bg-white p-5 border-2 border-custom-primary-color rounded-custom mt-10 gap-5 ">
      <div className="grid grid-cols-1 text-14 gap-3">
        <div className="flex flex-wrap">
          <span>تاریخ شروع پروژه : </span>
          <span>1400/4/5</span>
        </div>
        <div className="flex flex-wrap">
          <span>تاریخ پایان پروژه :</span>
          <span>1402/6/5</span>
        </div>
        <div className="flex flex-wrap">
          <span>محل پروژه : </span>
          <span>تهران</span>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end gap-8 flex-[1_1_100px]">
        <span className=" flex justify-center items-center ring-2 ring-custom-primary-color bg-white rounded-full size-10 ">
          <MdOutlineEdit
            size={25}
            className="text-custom-primary-color rounded-full "
          />
        </span>
        <div className="w-full flex flex-col gap-2">
          <Slider
            className="m-0"
            classNames={{
              track: "h-[10px] rounded-tl-full rounded-bl-full",
              rail: "h-[10px] rounded-full",
              handle: "after:bg-custom-secondary-color-300  mt-[3px]",
            }}
            defaultValue={72}
            disabled
            tooltip={{
              className: "ant-slider-tooltip",
              open: true,
              color: "white",
              overlayInnerStyle: {
                color: "rgba(var(--secondary-color))",
                boxShadow: "none",
                border: "1px solid rgba(var(--secondary-color))",
                padding: "4px",
              },
              formatter: (value) => value + "%",
              zIndex: "0",
            }}
          />
          <span className="text-12 mr-auto">درصد پیشرفت پروژه</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectInfo;
