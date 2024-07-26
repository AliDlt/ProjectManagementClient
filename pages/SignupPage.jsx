import { useState } from "react";
import SignupForm from "../components/ui/auth/SignupForm";
import OTPForm from "../components/ui/auth/OTPForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../yup/yup";

function SignupPage() {
  const [step, setStep] = useState(1); // 1 => SignupForm | 2 => OTPForm

  const formData = useForm({
    mode: "onChange",
    resolver: yupResolver(signupSchema),
  });

  switch (step) {
    case 1:
      return <SignupForm formData={formData} setStep={setStep} />;
    case 2:
      return <OTPForm />;
    default:
      break;
  }
}

export default SignupPage;