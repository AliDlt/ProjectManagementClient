import { Empty, Image } from "antd";
import { useEffect, useState } from "react";
import { CiImageOff } from "react-icons/ci";

function ProjectBanner({ projectBannerData }) {
  const { name, files } = projectBannerData;
  const [firstImage, setFirstImage] = useState(false);

  // Select First Image
  useEffect(() => {
    files.map((file) => file.fileFormat === "image" && setFirstImage(file));
  }, [files]);

  return (
    <div className="relative rounded-custom mt-5 h-36 overflow-hidden lg:h-40 xl:h-56">
      {!firstImage ? (
        <Empty
          className="bg-gray-200 rounded-custom h-full w-full m-0 flex items-center justify-center"
          image={<CiImageOff className="size-12 lg:size-20 text-gray-400" />}
          imageStyle={{
            display: "flex",
          }}
          description={false}
        />
      ) : (
        <Image
          preview={{
            mask: "بزرگ نمایی",
          }}
          rootClassName="w-full h-full"
          className="object-cover w-full h-full rounded-custom"
          src={firstImage.fileURL}
          alt={firstImage.description}
          crossOrigin="anonymous"
          // fallback="/images/5.png"
        />
      )}
      <span className="absolute bg-white flex rounded-lg top-5 right-5 px-3 py-1 border-2 border-custom-primary-color text-12">
        {name}
      </span>
    </div>
  );
}

export default ProjectBanner;
