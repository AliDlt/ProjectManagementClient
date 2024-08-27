import React from "react";
import { FaFileArchive } from "react-icons/fa";
import { FaFilePdf, FaFileWord } from "react-icons/fa6";
import { MdTextSnippet } from "react-icons/md";

const IconFile = ({ type, size }) => {
  switch (type) {
    case "application/pdf":
      return <FaFilePdf size={size && size} />;
    case "text/plain":
      return <MdTextSnippet size={size && size} />;
    case "application/zip":
      return <FaFileArchive size={size && size} />;

    case "application/vnd.rar":
      return <FaFileArchive size={size && size} />;
    case "application/msword":
      return <FaFileWord size={size && size} />;
  }
};
export default IconFile;
