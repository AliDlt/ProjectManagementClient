import CustomButton from "../../modules/CustomButton";
import { useNavigate } from "react-router-dom";
import ProjectProgress from "./ProjectProgress";

function ProjectItem({
  projectIndex,
  progress,
  id,
  projectName,
  surName,
  name,
  description,
  progressClassName,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between flex-wrap items-end gap-2 p-7  bg-white rounded-custom">
      <div className="flex flex-col gap-5 min-[375px]:flex-row w-full">
        <ProjectProgress
          projectIndex={projectIndex}
          className={progressClassName}
          progress={progress}
        />
        <div className="flex flex-col gap-1.5 text-14 lg:text-16">
          <div className="flex items-center gap-1">
            <span className="font-bold">پروژه</span>
            <span>{id}</span>
          </div>
          <div className="flex items-center gap-1 text-nowrap">
            <span className="font-bold">عنوان پروژه : </span>
            <span className="truncate max-w-16">{projectName}</span>
          </div>
          <div className="flex items-center gap-1 truncate">
            <span className="font-bold">مدیر پروژه : </span>
            <span>
              {name} {surName}
            </span>
          </div>
          <div className="flex items-center gap-1 text-nowrap">
            <span className="font-bold">توضیحات پروژه : </span>
            <span className="truncate max-w-16">{description}</span>
          </div>
        </div>
      </div>
      <CustomButton
        className="text-14 mr-auto"
        onClick={() => navigate(`/projects/${id}`)}
      >
        <span className="text-white"> مشاهده</span>
      </CustomButton>
    </div>
  );
}

export default ProjectItem;