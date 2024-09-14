import React from "react";
import { FaFile, FaFileArchive } from "react-icons/fa";
import { FaFilePdf, FaFileWord, FaRegFileExcel } from "react-icons/fa6";
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

    case "application/xslx":
    case "xslx":
      return <FaRegFileExcel size={size} />;

    default:
      return <FaFile size={size} /> 
  }
};

export default IconFile;
