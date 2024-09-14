import React from "react";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

function BackButton() {
  const navigate = useNavigate();

  return (
    <CustomButton
      onClick={() => navigate(-1)}
      className="text-sm bg-white text-black border-2 border-custom-primary-color py-1 h-8 hover:bg-white"
    >
      <FaArrowRightLong />
      بازگشت
    </CustomButton>
  );
}

export default BackButton;
