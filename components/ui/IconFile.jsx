import React from "react";
import { FaFileArchive } from "react-icons/fa";
import { FaFilePdf, FaFileWord } from "react-icons/fa6";
import { MdTextSnippet } from "react-icons/md";

const IconFile = ({ type }) => {
  switch (type) {
    case "application/pdf":
      return <FaFilePdf className />;
    case "text/plain":
      return <MdTextSnippet />;
    case "application/zip":
    case "application/vnd.rar":
      return <FaFileArchive />;
    case "application/msword":
      return <FaFileWord />;
  }
};
export default IconFile;
