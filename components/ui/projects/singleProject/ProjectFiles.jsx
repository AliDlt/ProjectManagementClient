import CustomButton from "../../../modules/CustomButton";
import CustomModal from "../../../modules/CustomModal";
import CustomUpload from "../../../modules/CustomUpload";
import CustomTextAria from "../../../modules/CustomTextAria";
import { useState } from "react";
import { FaFile } from "react-icons/fa6";
import useUploadProjectFile from "../../../../hooks/projects/useUploadProjectFile";
import useDeleteProjectFile from "../../../../hooks/projects/useDeleteProjectFile";
import { useToast } from "../../../../Context/ToastContext";
import IconFile from "../../IconFile";
import Files from "../../Files";
import { SwiperSlide } from "swiper/react";
import { filterFile } from "../../../../utils/tools";
import { Empty } from "antd";
import CustomSlideFIle from "../../../modules/CustomSlideFIle";

const Preview = (file) => {
  return (
    <div className="max-w-full">
      <div className=" flex flex-col gap-3 items-center w-full  ">
        <IconFile size={32} type={file.file.type} />
        <p className=" line-clamp-1 w-full px-2"> {file.file.name}</p>
      </div>
    </div>
  );
};

function ProjectFiles({ projectId, files }) {
  const [fileDescription, setFileDescription] = useState("");
  const [openAddFileModal, setOpenAddFileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const { uploadProjectFileFn, uploadProjectFilePending } =
    useUploadProjectFile(projectId);
  const { deleteFile, isPending } = useDeleteProjectFile(projectId);
  const toast = useToast();

  //   Custom Upload File
  const customUploadFile = (file) => {
    const fileSizeInMB = (file.file.size / (1024 * 1024)).toFixed(2);

    if (file.filename !== "file")
      return toast("لطفا یک فایل را انتخاب کنید", "error");
    if (fileSizeInMB > 5)
      return toast("فایل انتخابی شما حد اکثر باید 5 مگابایت باشد", "error");

    setSelectedFile(file);
  };

  //   Upload File Handler
  const uploadFile = async (e) => {
    e.preventDefault();
    try {
      await uploadProjectFileFn({
        file: selectedFile.file,
        fileFormat: selectedFile.file.type,
        id: projectId,
        description: fileDescription,
      });
      toast("فایل بارگزاری شد", "success");
      setFileDescription("");
      setSelectedFile(false);
      setOpenAddFileModal(false);
    } catch (error) {
      toast(error.response.data.message, "error");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mt-10 mb-5">
        <div className="flex justify-between w-full items-center gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <h3 className="text-20 font-extrabold">اسناد</h3>
          </div>
          <CustomButton
            onClick={() => setOpenAddFileModal(true)}
            className="mr-auto"
          >
            بارگزاری اسناد
          </CustomButton>
        </div>
      </div>
      {/* File Slider */}
      <div>
        {filterFile(files, "file")?.length ? (
          <Files>
            <>
              {files?.map(
                (file) =>
                  file.fileFormat !== "image" &&
                  file.fileFormat !== "video" && (
                    <SwiperSlide
                      className="flex items-center justify-center"
                      key={file.createdAt}
                    >
                      <CustomSlideFIle
                        mutate={deleteFile}
                        isPending={isPending}
                        item={file}
                      />
                    </SwiperSlide>
                  ),
              )}
            </>
          </Files>
        ) : (
          <div>
            <Empty description="سندی وجود ندارد" />
          </div>
        )}
      </div>
      {/* Modal */}
      <CustomModal
        title="بارگزاری فایل"
        open={openAddFileModal}
        onCancel={() => setOpenAddFileModal(false)}
      >
        <form>
          <div className="flex flex-col justify-center sm:items-center gap-5 mt-5 sm:flex-row">
            {/* File */}
            <div className="flex flex-col flex-1 gap-2">
              <div className="flex flex-col flex-1 gap-2">
                <p>اسناد با حجم حد اکثر 5 مگابایت</p>
                <CustomUpload
                  customRequest={customUploadFile}
                  preview={selectedFile && Preview(selectedFile)}
                  className=" text-black/50 text-18"
                  accept="application/pdf,text/plain,application/zip,application/msword,application/vnd.rar"
                  title="بارگزاری فایل"
                  icon={<FaFile />}
                />
              </div>
            </div>
          </div>
          <div>
            <CustomTextAria
              className="mt-5"
              placeholder="توضیحات فایل ( اجباری )"
              rows={3}
              onChange={(e) => setFileDescription(e.target.value)}
              value={fileDescription}
            />
          </div>
          <CustomButton
            className="mt-5"
            onClick={uploadFile}
            disabled={!selectedFile || !fileDescription}
            loading={uploadProjectFilePending}
            type="submit"
          >
            بارگزاری
          </CustomButton>
        </form>
      </CustomModal>
    </>
  );
}
export default ProjectFiles;