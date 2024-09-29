import { useRef, useState } from "react";
import SignupForm from "../components/ui/auth/SignupForm";
import OTPForm from "../components/ui/auth/OTPForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../yup/yup";
import { otpVerify, signup } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../Context/ToastContext";
import { convertToInternational } from "../utils/tools";

function SignupPage() {
  const [step, setStep] = useState(2); 
  const [otpLoading, setOtpLoading] = useState(false);
  const toast = useToast();
  const otpCode = useRef("");
  const navigate = useNavigate();

  const formData = useForm({
    defaultValues: {
      isForeign: false,
    },
    mode: "onChange",
    resolver: yupResolver(signupSchema),
  });
  const { getValues, watch } = formData;

  // OTP Submit
  const otpSubmitHandler = async (e) => {
    e.preventDefault();
    if (otpCode.current.length < 4)
      return toast("لطفا کد را وارد کنید", "error");
    setOtpLoading(true);
    const userData = {
      phoneNumber: convertToInternational(getValues("phoneNumber")),
      otpCode: otpCode.current,
    };

    try {
      await otpVerify(userData);
      const { phoneNumber, nationalCode, isForeign, ...rest } = watch();
      const userDataSignup = {
        phoneNumber: convertToInternational(phoneNumber),
        ...(isForeign ? {} : { nationalCode }),
        isForeign,
        ...rest,
      };
      const data = await signup(userDataSignup);
      toast(data.message, "success");
      navigate("/auth/login", { replace: true });
    } catch (error) {
      toast(error.response.data.message, "error");
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
          phoneNumber={getValues("phoneNumber")}
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
