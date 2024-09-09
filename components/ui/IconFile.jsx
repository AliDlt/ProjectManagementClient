import React from "react";
import { FaFileArchive } from "react-icons/fa";
import { FaFilePdf, FaFileWord } from "react-icons/fa6";
import { MdTextSnippet } from "react-icons/md";

const IconFile = ({ type, size }) => {
  console.log(type);
  switch (type) {
    case "application/pdf":
    case "pdf":
      return <FaFilePdf size={size} />;
      
    case "text/plain":
    case "txt":
      return <MdTextSnippet size={size} />;
      
    case "application/zip":
    case "zip":
      return <FaFileArchive size={size} />;
      
    case "application/vnd.rar":
    case "rar":
      return <FaFileArchive size={size} />;
      
    case "application/msword":
    case "msword":
      return <FaFileWord size={size} />;
      
    default:
      // در صورتی که هیچ شرطی برقرار نباشد، یک آیکون پیش‌فرض یا پیام مناسب نمایش دهید
      return <div>نوع فایل نامشخص است</div>;
  }
};

export default IconFile;
