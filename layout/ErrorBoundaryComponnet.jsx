import React, { useEffect, useState } from "react";
import CustomModal from "../components/modules/CustomModal";
import CustomButton from "../components/modules/CustomButton";
import { useNavigate } from "react-router-dom";

const ErrorBoundaryComponent = (props) => {
  console.log(props)
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
    <CustomModal title={"مشکلی پیش آمده"} open={true}>
      <div className="flex justify-center flex-col items-center gap-5">
        <div className="font-bold text-20 mt-5">
          مثل اینکه مشکلی در اتصال به وجود آمده است
        </div>
        <CustomButton
          className="hover:!text-custom-primary-color transition-all hover:!bg-white text-white bg-custom-primary-color hover:!border-custom-primary-color"
          onClick={handleNavigate}
        >
          بازگشت به داشبورد
        </CustomButton>
      </div>
    </CustomModal>
  );
};

export default ErrorBoundaryComponent;
