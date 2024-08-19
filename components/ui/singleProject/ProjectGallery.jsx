import CustomButton from "../../modules/CustomButton";
import { IoAddOutline } from "react-icons/io5";
import { Popover } from "antd";
import { BsExclamationLg } from "react-icons/bs";
import CustomUpload from "../../modules/CustomUpload";
import { useState } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Gallery from "../Gallery";
import CustomModal from "../../modules/CustomModal";
import { FaVideo, FaImage } from "react-icons/fa6";
import CustomTextAria from "../../modules/CustomTextAria";
import { useQueryClient } from "@tanstack/react-query";

function ProjectGallery({ projectGalleryData, projectId }) {
  const [open, setOpen] = useState(false);
  const [fileDescription, setFileDescription] = useState("");
  const queryClient = useQueryClient();

  // Popover Content
  const popoverContent = (
    <div className="flex flex-col gap-2 text-12">
      <p>ویدئو ها با حجم 10 مگابایت</p>
      <p>عکس ها با حجم 2 مگابایت</p>
    </div>
  );

  // Uploaders Change Handlers
  const uploadersChangeHandler = (info) => {
    if (info.file.status === "done") {
      queryClient.invalidateQueries("project", projectId);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mt-10">
        <div className="flex items-center gap-3">
          <h3 className="text-20 font-extrabold">گالری عکس ها</h3>
          <Popover
            content={popoverContent}
            arrow={false}
            overlayInnerStyle={{
              borderRadius: "8px",
              border: "2px solid rgb(var(--primary-color))",
            }}
          >
            <span className="flex justify-center items-center ring-2 ring-custom-primary-color rounded-full cursor-pointer">
              <BsExclamationLg className="text-custom-primary-color rounded-full group-hover:text-white" />
            </span>
          </Popover>
        </div>
        <CustomButton
          className="flex justify-center items-center ring-2 ring-custom-primary-color bg-white rounded-full size-10 p-0 hover:bg-custom-primary-color group"
          onClick={() => setOpen(true)}
        >
          <IoAddOutline
            size={25}
            className="text-custom-primary-color rounded-full group-hover:text-white"
          />
        </CustomButton>
        {/* Modal */}
        <CustomModal
          title="آپلود عکس و فیلم"
          open={open}
          onCancel={() => setOpen(false)}
        >
          <div className="flex flex-col justify-center items-center gap-5 mt-5 md:flex-row">
            {/* Image */}
            <CustomUpload
              action="/api/project/uploadFile"
              title="آپلود تصویر"
              className="w-full"
              icon={<FaImage size={25} />}
              accept="image/png , image/jpg , image/jpeg"
              data={{
                id: projectId,
                description: fileDescription,
                fileFormat: "image",
              }}
              disabled={!fileDescription}
              onChange={uploadersChangeHandler}
            />
            {/* Video */}
            <CustomUpload
              action="/api/project/uploadFile"
              title="آپلود ویدئو"
              className="w-full"
              icon={<FaVideo size={25} />}
              accept="video/mp4 , video/mpeg"
              data={{
                id: projectId,
                description: fileDescription,
                fileFormat: "video",
              }}
              disabled={!fileDescription}
              onChange={uploadersChangeHandler}
            />
          </div>
          <div>
            <CustomTextAria
              className="mt-5"
              placeholder="توضیحات فایل ( اجباری )"
              rows={3}
              onChange={(e) => setFileDescription(e.target.value)}
            />
          </div>
        </CustomModal>
      </div>
      <Gallery data={projectGalleryData} />
    </>
  );
}

export default ProjectGallery;
