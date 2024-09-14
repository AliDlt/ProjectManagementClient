import { useState } from "react";
import CustomInput from "../../../modules/CustomInput";
import { GrSearch } from "react-icons/gr";
import useProjectsReports from "../../../../hooks/Report/useProjectsReports";
import { useNavigate, useParams } from "react-router-dom";
import CustomLoading from "../../../modules/CustomLoading";
import CustomPagination from "../../../modules/CustomPagination";
import CustomButton from "../../../modules/CustomButton";
import { useDebounce } from "use-debounce";
import { Empty } from "antd";

function ProjectsReportsModal() {
  const { id } = useParams();
  const [reportSearchValue, setReportSearchValue] = useState("");
  const [value] = useDebounce(reportSearchValue, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const { projectsReports, projectsReportsError, projectsReportsLoading } =
    useProjectsReports(id, value, 5, currentPage);
  const navigate = useNavigate();

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
          className="hidden py-1 rounded-custom w-72 ml-auto md:flex mt-5"
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
        <div className="flex flex-col mt-5 gap-[1px] bg-black">
          {!projectsReports ? (
            <Empty
              className="bg-white m-0 h-80 flex flex-col justify-center items-center"
              description="گزارشی وجود ندارد"
            />
          ) : (
            projectsReports?.reports?.map((report) => (
              <div
                key={report._id}
                className="flex justify-start items-center py-4 bg-white flex-wrap"
              >
                <span className="font-bold">{report.name} : </span>&nbsp;
                <p className="flex-1 text-16 truncate ml-2.5">
                  {report.description}
                </p>
                <CustomButton
                  className="text-sm py-1.5 px-3 h-auto"
                  onClick={() => navigate(`/reports/${report._id}`)}
                >
                  مشاهده گزارش
                </CustomButton>
              </div>
            ))
          )}
        </div>
      )}
      {projectsReports && projectsReports?.reports?.length !== 0 && (
        <CustomPagination
          onChange={(page) => setCurrentPage(page)}
          total={projectsReports?.totalReports}
          pageSize={5}
        />
      )}
    </>
  );
}

export default ProjectsReportsModal;
