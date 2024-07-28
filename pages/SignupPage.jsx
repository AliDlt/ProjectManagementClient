import { useRef, useState } from "react";
import SignupForm from "../components/ui/auth/SignupForm";
import OTPForm from "../components/ui/auth/OTPForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../yup/yup";
import { otpVerify } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../Context/ToastContext";

function SignupPage() {
  const [step, setStep] = useState(1); // 1 => SignupForm | 2 => OTPForm
  const [otpLoading, setOtpLoading] = useState(false);
  const { showToast } = useToast();
  const otpCode = useRef("");
  const navigate = useNavigate();

  const formData = useForm({
    mode: "onChange",
    resolver: yupResolver(signupSchema),
  });
  const { getValues } = formData;

  // OTP Submit
  const otpSubmitHandler = async (e) => {
    e.preventDefault();
    if (otpCode.current.length < 4) return toast.error("لطفا کد را وارد کنید");
    setOtpLoading(true);
    const userData = {
      phonenumber: getValues("phonenumber"),
      otpCode: otpCode.current,
    };
    try {
      const data = await otpVerify(userData);
      showToast(data.message, "success");
      navigate("/auth/login", { replace: true });
    } catch (error) {
      showToast(error.response.data.message, "error");
    } finally {
      setOtpLoading(false);
    }
  };

  switch (step) {
    case 1:
      return <SignupForm formData={formData} setStep={setStep} />;
    case 2:
      return (
        <OTPForm
          phonenumber={getValues("phonenumber")}
          onSubmitOTP={otpSubmitHandler}
          otpCodeRef={otpCode}
          loading={otpLoading}
        />
      );
    default:
      break;
  }
}

export default SignupPage;
