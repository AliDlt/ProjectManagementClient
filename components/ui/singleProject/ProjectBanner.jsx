import { MdOutlineEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { Empty } from "antd";
import { CiImageOff } from "react-icons/ci";
import CustomButton from "../../modules/CustomButton";

function ProjectBanner() {
  return (
    <div className="relative rounded-custom mt-5 h-36 overflow-hidden lg:h-40">
      <Empty
        className="bg-gray-200 rounded-custom h-full w-full m-0 flex items-center justify-center"
        image={<CiImageOff className="size-12 text-gray-400" />}
        imageStyle={{
          display: "flex",
        }}
        description={false}
        style={{
          display: "none",
        }}
      />
      <img
        className="object-cover w-full h-full rounded-custom"
        src="/images/5.png"
        alt="project image"
      />
      <CustomButton className="absolute flex justify-center items-center ring-2 ring-custom-primary-color bg-white rounded-full size-10 left-5 top-5  lg:top-5 p-0 hover:bg-custom-primary-color group">
        <MdOutlineEdit
          size={25}
          className="text-custom-primary-color group-hover:text-white"
        />
      </CustomButton>
      <CustomButton className="absolute flex justify-center items-center ring-2 ring-custom-primary-color bg-white rounded-full size-10 left-20 top-5  lg:top-5 p-0 hover:bg-custom-primary-color group">
        <FaTrash
          size={20}
          className="text-custom-primary-color group-hover:text-white"
        />
      </CustomButton>
      <span className="absolute bg-white flex rounded-lg top-5 right-5 px-3 py-1 border-2 border-custom-primary-color text-12">
        پروژه 1
      </span>
    </div>
  );
}

export default ProjectBanner;
