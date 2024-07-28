import { useState } from "react";
import SignupForm from "../components/ui/auth/SignupForm";
import OTPForm from "../components/ui/auth/OTPForm";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../yup/yup";
import toast from "react-hot-toast";
import { sendCode, signup } from "../services/auth";

function SignupPage() {
  const [step, setStep] = useState(1); // 1 => SignupForm | 2 => OTPForm
  const [loading, setLoading] = useState(false);

  const formData = useForm({
    mode: "onChange",
    resolver: yupResolver(signupSchema),
  });
  const [otpData, setOtpData] = useState({});


  const onSubmitHandler = async (values) => {
    setLoading(true);
    const { name, phonenumber, username, password, nationalCode } = values;
    const userData = {
      name,
      phonenumber,
      username,
      password,
      nationalCode,
      userRole: 2,
    };
    setOtpData({ phonenumber, username });
    try {
      const data = await signup(userData);
      console.log(data);
      toast.success(data.message);
      setStep(2);
      console.log(data);
      try {
        const resp = await sendCode({ phonenumber });
        console.log(resp);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  switch (step) {
    case 1:
      return (
        <SignupForm
          onSubmitHandler={onSubmitHandler}
          loading={loading}
          formData={formData}
        />
      );
    case 2:
      return <OTPForm otpData={otpData} loading = {loading} setLoading={setLoading} />;
    default:
      break;
  }
}

export default SignupPage;
