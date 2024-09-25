import { useState } from "react";
import CustomInput from "../../../modules/CustomInput";
import { GrSearch } from "react-icons/gr";
import useProjectsReports from "../../../../hooks/Report/useProjectsReports";
import { Link, useParams } from "react-router-dom";
import CustomLoading from "../../../modules/CustomLoading";
import CustomPagination from "../../../modules/CustomPagination";
import { useDebounce } from "use-debounce";
import { Empty } from "antd";
import dayjs from "dayjs";
import { convertToLocalDate } from "../../../../utils/tools";

function ProjectsReportsModal() {
  const { id } = useParams();
  const [reportSearchValue, setReportSearchValue] = useState("");
  const [value] = useDebounce(reportSearchValue, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const { projectsReports, projectsReportsError, projectsReportsLoading } =
    useProjectsReports(id, value, 3, currentPage);

  // Error
  if (!projectsReportsLoading && projectsReportsError)
    return (
      <div className="h-80 flex justify-center items-center">
        <div className="text-16">
          {projectsReportsError?.response?.data?.message}
        </div>
      </div>
    );

  return (
    <>
      {projectsReports && (
        <CustomInput
          className="hidden py-1 rounded-custom w-72 ml-auto md:flex"
          placeholder="جستجو"
          value={reportSearchValue}
          onChange={(e) => setReportSearchValue(e.target.value)}
          icon={
            <GrSearch className="-scale-x-100 text-custom-primary-color w-5 h-5 ml-2" />
          }
        />
      )}
      {projectsReportsLoading ? (
        <div className="h-80">
          <CustomLoading />
        </div>
      ) : (
        <div className="flex flex-col mt-10 gap-5">
          {!projectsReports ? (
            <Empty
              className="bg-white m-0 h-80 flex flex-col justify-center items-center"
              description="گزارشی وجود ندارد"
            />
          ) : (
            projectsReports?.reports?.map((report) => (
              <ProjectsReportItem key={report._id} {...report} />
            ))
          )}
        </div>
      )}
      {projectsReports && projectsReports?.reports?.length !== 0 && (
        <CustomPagination
          onChange={(page) => setCurrentPage(page)}
          total={projectsReports?.totalReports}
          pageSize={3}
        />
      )}
    </>
  );
}

export default ProjectsReportsModal;

// Project's Report Item
const ProjectsReportItem = ({ name, description, _id, createdBy, date }) => {
  return (
    <Link
      to={`/reports/${_id}`}
      className="flex flex-col gap-3 py-4 bg-white border-2 border-custom-primary-color rounded-custom px-4 hover:bg-custom-primary-color/5"
    >
      <div className="flex justify-between items-center flex-wrap">
        <span>
          نویسنده : {createdBy?.name} {createdBy?.surName}
        </span>
        <span>تاریخ : {convertToLocalDate(dayjs(date))}</span>
      </div>
      <div className="truncate ml-2.5 flex-1 flex">
        <span className="font-bold">{name} : </span>&nbsp;
        <p className="flex-1 text-16 truncate">{description}</p>
      </div>
    </Link>
  );
};
