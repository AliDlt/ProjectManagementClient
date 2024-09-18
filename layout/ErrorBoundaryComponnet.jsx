import React, { useEffect, useState } from "react";
import CustomModal from "../components/modules/CustomModal";
import CustomButton from "../components/modules/CustomButton";
import { useNavigate } from "react-router-dom";

const ErrorBoundaryComponent = (props) => {
  console.log(props);
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(true);

  useEffect(() => {
    if (!hasError) {
      navigate("/dashboard", { replace: true });
    }
  }, [hasError, navigate]);

  const handleNavigate = () => {
    setHasError(false);
  };

  if (!hasError) return null;

  return (
    <CustomModal title={"مشکلی پیش آمده"} notClose={true} open={true}>
      <div className="flex justify-center flex-col items-center gap-5">
        <div className="font-bold text-20 mt-5">
        مشکلی در برقراری ارتباط به وجود آمده است
        </div>
        <CustomButton
          className="hover:!text-custom-primary-color transition-all hover:!bg-white text-white bg-custom-primary-color hover:!border-custom-primary-color"
          onClick={handleNavigate}
        >
          <a href="/dashboard">بارگزاری مجدد</a>
        </CustomButton>
      </div>
    </CustomModal>
  );
};

export default ErrorBoundaryComponent;
