import { Empty, Image } from "antd";
import { useEffect, useState } from "react";
import { CiImageOff } from "react-icons/ci";
import CustomLoading from "../../../modules/CustomLoading";

function ProjectBanner({ projectBannerData }) {
  const { _id, files } = projectBannerData;
  const [firstImage, setFirstImage] = useState(false);

  // Select First Image
  useEffect(() => {
    if (files.length !== 0) {
      files
        .toReversed()
        .map((file) => file.fileFormat === "image" && setFirstImage(file));
    } else {
      setFirstImage(false);
    }
  }, [files, setFirstImage]);

  return (
    <div className="relative rounded-custom mt-5 h-36 overflow-hidden lg:h-40 xl:h-56">
      {!firstImage ? (
        <Empty
          className="bg-gray-200 rounded-custom h-full w-full m-0 flex items-center justify-center"
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
          src={firstImage.fileURL}
          alt={firstImage.description}
          fallback="/images/download.png"
          placeholder={<CustomLoading />}
        />
      )}
      <span className="absolute bg-white flex rounded-lg top-5 right-5 px-3 py-1 border-2 border-custom-primary-color text-12">
        شماره پروژه : {_id}
      </span>
    </div>
  );
}

export default ProjectBanner;
