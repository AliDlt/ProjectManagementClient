import { Empty, Image } from "antd";
import { useState } from "react";
import { CiImageOff } from "react-icons/ci";
import CustomLoading from "../../../modules/CustomLoading";
import useUser from "../../../../hooks/useUser";
import CustomButton from "../../../modules/CustomButton";
import { MdModeEdit } from "react-icons/md";
import { FaImage, FaTrash } from "react-icons/fa6";
import CustomModal from "../../../modules/CustomModal";
import CustomUpload from "../../../modules/CustomUpload";
import { IoClose } from "react-icons/io5";
import useUploadProjectFile from "../../../../hooks/projects/useUploadProjectFile";
import { imageTypes } from "../../../../utils/tools";
import { filesSize } from "../../../../utils/uploadFileInfo";
import { useToast } from "../../../../Context/ToastContext";
import useDeleteProjectFile from "../../../../hooks/projects/useDeleteProjectFile";
import CustomConfirm from "../../../modules/CustomConfirm";

function ProjectBanner({ projectBannerData }) {
  const { _id, bannerImage } = projectBannerData;
  const { user, isLoading } = useUser();
  const [openAddBannerModal, setOpenAddBannerModal] = useState(false);
  const [openDeleteBannerModal, setOpenDeleteBannerModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const { deleteFile, isPending } = useDeleteProjectFile(_id);
  const { uploadProjectFileFn, uploadProjectFilePending } =
    useUploadProjectFile(_id);
  const toast = useToast();

  // Custom Uploader Request
  const customUploaderRequest = (info) => {
    const fileSize = info.file.size;
    const imageFormat = imageTypes.includes(info.file.type);

    if (!imageFormat) {
      return toast("فایل را در این قسمت نمیتوانید وارد کنید", "error");
    }

    // check file size
    if (fileSize > filesSize.image)
      return toast("حجم تصویر باید کمتر از 50 مگابایت باشد", "error");

    // set preview
    setSelectedImage(info.file);
  };

  // Upload Image / Video Handler
  const uploadFileHandler = async (e) => {
    e.preventDefault();

    try {
      await uploadProjectFileFn({
        id: _id,
        fileFormat: "image",
        file: selectedImage,
        isBannerImage: true,
      });
      toast("فایل بارگزاری شد", "success");
      setSelectedImage(false);
      setOpenAddBannerModal(false);
    } catch (error) {
      toast(error?.response?.data?.message || error?.response?.data, "error");
    }
  };

  // Delete Banner Image Handler
  const deleteBanner = async () => {
    try {
      await deleteFile({
        fileName: bannerImage.fileName,
        id: _id,
        isBannerImage: true,
      });
      setOpenDeleteBannerModal(false);
    } catch (error) {}
  };

  return (
    <div className="relative rounded-custom mt-5 h-36 overflow-hidden lg:h-40 xl:h-56">
      {!isLoading && user.userRole !== 2 && (
        <>
          <CustomButton
            className="flex justify-center items-center ring-2 ring-custom-primary-color bg-white rounded-full size-9 p-0 hover:bg-custom-primary-color group absolute top-4 left-4 z-10"
            onClick={() => setOpenAddBannerModal(true)}
          >
            <MdModeEdit
              size={23}
              className="text-custom-primary-color rounded-full group-hover:text-white"
            />
          </CustomButton>
          {bannerImage && (
            <CustomButton
              className=" flex justify-center items-center ring-2 ring-custom-primary-color bg-white rounded-full size-9 p-0 hover:bg-custom-primary-color group absolute top-4 left-[4.2rem] z-10"
              onClick={() => setOpenDeleteBannerModal(true)}
            >
              <FaTrash className="text-custom-primary-color group-hover:text-white" />
            </CustomButton>
          )}
        </>
      )}
      {!bannerImage ? (
        <Empty
          className="bg-gray-200 rounded-custom h-full w-full m-0 flex items-center justify-center "
          image={<CiImageOff className="size-12 lg:size-20 text-gray-400" />}
          description={false}
          imageStyle={{
            display: "flex",
          }}
        />
      ) : (
        <Image
          preview={{
            mask: "بزرگ نمایی",
          }}
          rootClassName="w-full h-full"
          src={bannerImage.fileURL}
          alt={bannerImage.description}
          fallback="/images/download.png"
          placeholder={<CustomLoading />}
          loading="lazy"
          onLoad={() => console.log(5)}
        />
      )}
      <span className="absolute bg-white flex rounded-lg top-5 right-5 px-3 py-1 border-2 border-custom-primary-color text-12">
        شماره پروژه : {_id}
      </span>
      <CustomModal
        title="بارگزاری بنر پروژه"
        open={openAddBannerModal}
        onCancel={() => setOpenAddBannerModal(false)}
      >
        <form>
          <div className="flex flex-col justify-center sm:items-center gap-5 sm:flex-row">
            {/* Image */}
            <div className="flex flex-col flex-1 gap-2">
              <span>عکس ها با حجم 50 مگابایت</span>
              <CustomUpload
                title="بارگزاری تصویر"
                className="w-full"
                icon={<FaImage size={25} />}
                accept={imageTypes}
                name="image"
                customRequest={customUploaderRequest}
                preview={
                  selectedImage && (
                    <div
                      className=" w-[90%] h-20  relative flex justify-center items-center z-50"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <img
                        className="object-cover w-full h-full rounded-lg"
                        src={URL.createObjectURL(selectedImage)}
                        alt="image preview"
                      />
                      <span
                        className="absolute bg-white rounded-full border-2 border-custom-primary-color top-1 right-1 size-5 flex justify-center items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(false);
                        }}
                      >
                        <IoClose />
                      </span>
                    </div>
                  )
                }
              />
            </div>
          </div>
          <CustomButton
            className="mt-5"
            onClick={uploadFileHandler}
            disabled={!selectedImage}
            loading={uploadProjectFilePending}
            type="submit"
          >
            بارگزاری
          </CustomButton>
        </form>
      </CustomModal>
      <CustomConfirm
        title="حذف بنر"
        open={openDeleteBannerModal}
        onCancel={() => setOpenDeleteBannerModal(false)}
        description="آیا از حذف این عکس اطمینان دارید ؟"
        okText="حذف"
        cancelText="انصراف"
        okHandler={deleteBanner}
        loading={isPending}
      />
    </div>
  );
}

export default ProjectBanner;
