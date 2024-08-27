import { Input } from "antd";
import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import cn from "../../utils/cn";
import CustomButton from "./CustomButton";
import useSendOtpCode from "../../hooks/useSendOtpCode";
import useUser from "../../hooks/useUser";
import { useToast } from "../../Context/ToastContext";

const CustomOtpRequest = ({ control, name, error, className, placeholder }) => {
  const { mutate, isPending } = useSendOtpCode();
  const { user } = useUser();
  const toast = useToast();
  const [timer, setTimer] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const successSendCode = (e) => {
    toast(e.message, "success");
    setIsButtonDisabled(true);
    setTimer(120);
  };

  const sendOtp = () => {
    mutate(user.phoneNumber, {
      onSuccess: successSendCode,
      onError: (e) => console.log(e),
    });
  };

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setIsButtonDisabled(false);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className={cn(["flex flex-col gap-2"])}>
            <div
              className={cn([
                " flex rounded-custom border-2 border-custom-primary-color bg-white px-2 py-1",
                error && "border-red-500",
                className,
              ])}
            >
              <Input
                type="number"
                {...field}
                classNames={{
                  input: "placeholder:text-black/50 font-medium",
                }}
                dir="rtl"
                placeholder={placeholder}
                status={error && "error"}
              />
              <div>
                <CustomButton
                  onClick={sendOtp}
                  loading={isPending}
                  disabled={isButtonDisabled}
                >
                  {isButtonDisabled
                    ? `ارسال مجدد (${formatTime(timer)})`
                    : "ارسال کد"}
                </CustomButton>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </div>
        )}
      />
    </div>
  );
};

export default CustomOtpRequest;
