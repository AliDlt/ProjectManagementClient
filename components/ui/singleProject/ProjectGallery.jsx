import CustomButton from "../../modules/CustomButton";
import { IoAddOutline } from "react-icons/io5";
import { Popover, Progress } from "antd";
import { BsExclamationLg } from "react-icons/bs";
import CustomUpload from "../../modules/CustomUpload";
import { useState } from "react";
import { useToast } from "../../../Context/ToastContext";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Gallery from "../Gallery";

function ProjectGallery() {
  const [percentUpload, setPercentUpload] = useState(0);
  const [uploadStatus, setSploadStatus] = useState(false);
  const toast = useToast();

  // Popover Content
  const popoverContent = (
    <div className="flex flex-col gap-2 text-12">
      <p>ویدئو ها با حجم 10 مگابایت</p>
      <p>عکس ها با حجم 2 مگابایت</p>
    </div>
  );

  // Upload Handler
  const uploadHandler = (e) => {
    switch (e?.file?.status) {
      case "uploading":
        setSploadStatus(0);
        break;
      case "done":
        setSploadStatus(1);
        break;
      case "error":
        setSploadStatus(2);
        break;
      default:
        break;
    }
    setPercentUpload(Math.floor(e?.event?.percent));
    if (e?.file?.status === "error")
      return toast(e?.file?.response?.message, "error");
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
        <CustomUpload
          action={'/api/project/uploadImage"'}
          uploadHandler={uploadHandler}
        >
          <CustomButton className=" flex justify-center items-center ring-2 ring-custom-primary-color bg-white rounded-full size-10 p-0 hover:bg-custom-primary-color group">
            {uploadStatus !== 0 ? (
              <IoAddOutline
                size={25}
                className="text-custom-primary-color rounded-full group-hover:text-white"
              />
            ) : (
              <Progress
                size={30}
                percent={percentUpload}
                type="circle"
                status="normal"
              />
            )}
          </CustomButton>
        </CustomUpload>
      </div>
      <Gallery />
    </>
  );
}

export default ProjectGallery;
