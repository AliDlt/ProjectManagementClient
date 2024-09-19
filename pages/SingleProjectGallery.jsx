import React, { useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CustomLoading from "../components/modules/CustomLoading";
import useProjectFiles from "../hooks/projects/useProjectFiles";
import { Image } from "antd";
import CustomPagination from "../components/modules/CustomPagination";
import useProject from "../hooks/projects/useProject";
import { FaTrash } from "react-icons/fa6";
import CustomConfirm from "../components/modules/CustomConfirm";
import useDeleteProjectFile from "../hooks/projects/useDeleteProjectFile";
import { IoEyeSharp } from "react-icons/io5";
import CustomModal from "../components/modules/CustomModal";
import BackButton from "../components/modules/BackButton";
import cn from "../utils/cn";
import ImageVideoSlide from "../components/ui/ImageVideoSlide";

function SingleProjectGallery() {
  const projectInfo = useRef(null);
  const { projectId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDeleteFileModal, setOpenDeleteFileModal] = useState(false);
  const [openFileInfoModal, setOpenFileInfoModal] = useState(false);
  const { project } = useProject(projectId);
  const {
    deleteFile,
    isPending: deleteFileLoading,
    isSuccess,
  } = useDeleteProjectFile(projectId);
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") || undefined,
  );
  const { projectFile, isPending, error } = useProjectFiles(
    {
      id: +projectId,
      fileFormats: ["image", "video"],
      page: currentPage,
      limit: 12,
    },
    isSuccess,
  );

  // Delete File Handler
  const deleteFileHandler = async () => {
    try {
      await deleteFile({
        fileName: projectInfo.current.fileName,
        id: projectId,
      });
      setOpenDeleteFileModal(false);
    } catch (error) {}
  };

  if (!isPending && error)
    return (
      <div className="flex flex-col gap-5 justify-center items-center container lg:col-span-9 2xl:col-span-10 lg:px-0 h-[30rem]">
        {error?.response?.data?.errors
          ? error?.response?.data?.errors[0]
          : error.response.data.message}
        <BackButton />
      </div>
    );

  return (
    <section className="container lg:col-span-9 2xl:col-span-10 lg:p-0">
      <div className="flex items-center gap-5">
        <BackButton />
        <h1 className=" text-24">نام پروژه : {project?.name}</h1>
      </div>
      {isPending && (
        <div className="flex justify-center items-center container lg:col-span-9 2xl:col-span-10 lg:px-0 h-96">
          <CustomLoading />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-5 mt-10">
        {!isPending &&
          projectFile.files?.map((file) => (
            <ImageVideoSlide
              deleteFilePending={deleteFileLoading}
              deleteFileMutate={deleteFile}
              file={file}
              key={file.fileName}
            />
          ))}
      </div>
      {!isPending && projectFile?.files?.length !== 0 && (
        <CustomPagination
          rootClassName="!mt-16"
          align="center"
          current={currentPage}
          total={projectFile?.totalFiles}
          pageSize={12}
          onChange={(page) => {
            setSearchParams({
              page,
            });
            setCurrentPage(page);
          }}
        />
      )}
      {/* Delete File */}
      <CustomConfirm
        title="حذف فایل"
        open={openDeleteFileModal}
        onCancel={() => setOpenDeleteFileModal(false)}
        description="آیا از حذف این فایل اطمینان دارید ؟"
        okText="حذف"
        cancelText="لغو"
        okHandler={deleteFileHandler}
        loading={deleteFileLoading}
      />
      {/* Modal Project Info */}
      <CustomModal
        open={openFileInfoModal}
        onCancel={() => setOpenFileInfoModal(false)}
      >
        {projectInfo?.current?.fileFormat === "image" && (
          <Image
            className="object-cover w-full h-full rounded-custom"
            src={projectInfo?.current?.fileURL}
            alt={projectInfo?.current?.description}
            rootClassName="w-full h-[220px] rounded-custom"
            preview={{
              mask: "بزرگ نمایی",
            }}
            fallback="/images/download.png"
          />
        )}
        {projectInfo?.current?.fileFormat === "video" && (
          <video
            className="bg-custom-primary-color-300/50 w-full h-[220px] rounded-custom "
            controls
            src={projectInfo?.current?.fileURL}
            alt={projectInfo?.current?.description}
            crossOrigin="anonymous"
          />
        )}
        <p
          className={cn(
            "text-justify",
            projectInfo?.current?.fileFormat === "video" && "mt-2.5",
          )}
        >
          {projectInfo?.current?.description}
        </p>
      </CustomModal>
    </section>
  );
}

export default SingleProjectGallery;
