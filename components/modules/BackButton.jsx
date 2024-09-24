import React from "react";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

function BackButton({ customPath, title }) {
  const navigate = useNavigate();

  return (
    <CustomButton
      onClick={() => (customPath ? navigate(customPath) : navigate(-1))}
      className="text-sm border-2 border-custom-primary-color py-1 h-8 hover:bg-white rounded-custom bg-custom-primary-color text-white hover:bg-custom-primary-color/90 px-4 "
    >
      {!title ? <FaArrowRightLong /> : null}
      {title || "بازگشت"}
    </CustomButton>
  );
}

export default BackButton;
