import CustomButton from "../../modules/CustomButton";
import { useNavigate } from "react-router-dom";
import { Empty, Image, Progress } from "antd";
import styled from "styled-components";
import { FaMoneyCheck } from "react-icons/fa";
import { CiImageOff } from "react-icons/ci";
import CustomLoading from "../../modules/CustomLoading";

const StyledProgress = styled(Progress)`
  & .ant-progress-layout-bottom .ant-progress-text {
    color: ${({ color }) => color};
  }
`;

function ProjectItem({
  progress,
  id,
  projectName,
  surName,
  name,
  address,
  bannerImage,
}) {
  const navigate = useNavigate();

  return (
    <div className="rounded-custom border-2 border-custom-primary-color p-5 bg-white">
      {/* Banner */}
      <div className="relative h-[160px]">
        {!bannerImage ? (
          <Empty
            className="bg-gray-200 rounded-custom w-full m-0 flex items-center justify-center h-[160px]"
            image={<CiImageOff className="size-12 lg:size-20 text-gray-400" />}
            description={false}
            imageStyle={{
              display: "flex",
            }}
          />
        ) : (
          <Image
            preview={false}
            className="object-contain"
            rootClassName="rounded-custom overflow-hidden h-full"
            src={bannerImage.fileURL}
            alt={bannerImage.description}
            fallback="/images/download.png"
            placeholder={<CustomLoading />}
            loading="lazy"
          />
        )}
        {/* Progress */}
        <div className="absolute bottom-4 left-5 right-5">
          <StyledProgress
            className="project-item-progress"
            percent={progress}
            percentPosition={{ align: "center", type: "outer" }}
            size={[300, 12]}
            style={{
              direction: "ltr",
            }}
            color="#1578FB"
            trailColor="#f0effe"
          />
        </div>
      </div>
      {/* Project Info */}
      <div className="mt-5 flex gap-10">
        <div className="flex flex-col gap-2 flex-1 truncate">
          <h3 className="font-bold truncate">{projectName}</h3>
          <div className="flex items-center gap-1 text-nowrap truncate">
            <span className="font-bold">عنوان پروژه : </span>
            <span className="truncate">{projectName}</span>
          </div>
          <div className="flex items-center gap-1 truncate">
            <span className="font-bold">مدیر پروژه : </span>
            <span className="truncate">
              {name} {surName}
            </span>
          </div>
          <div className="flex items-center gap-1  truncate">
            <span className="font-bold">آدرس پروژه : </span>
            <span className="truncate">{address}</span>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          {/* Price */}
          <div>
            <div className="flex items-center gap-2 text-sm">
              <FaMoneyCheck size={30} className="text-custom-primary-color" />
              هزینه ها
            </div>
            <span className="text-xs">25.000.000 میلیون تومان</span>
          </div>
          {/* See Button */}
          <CustomButton
            className="text-14 mr-auto mt-2 px-7"
            onClick={() => navigate(`/projects/${id}`)}
          >
            <span className="text-white"> مشاهده</span>
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default ProjectItem;
