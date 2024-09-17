import React, { useEffect, useState } from "react";
import CustomModal from "../components/modules/CustomModal";
import CustomButton from "../components/modules/CustomButton";
import { useNavigate } from "react-router-dom";

const ErrorBoundaryComponent = () => {
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(true);

  useEffect(() => {
    // اگر کامپوننت دوباره رندر شد و به صفحه داشبورد رفت، وضعیت ارور را ریست کن
    if (!hasError) {
      navigate("/dashboard", { replace: true });
    }
  }, [hasError, navigate]);

  const handleNavigate = () => {
    // ابتدا وضعیت ارور را ریست می‌کنیم و سپس هدایت انجام می‌شود
    setHasError(false);
  };

  if (!hasError) return null; // زمانی که ارور ریست شد، کامپوننت ارور رندر نمی‌شود

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
