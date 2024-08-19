import React from "react";
import CustomButton from "../modules/CustomButton";
import useLogout from "../../hooks/useLogout";
import { useToast } from "../../Context/ToastContext";
import { useNavigate } from "react-router-dom";

const Logout = ({ close }) => {
  const { mutate } = useLogout();
  const toast = useToast();
  const logoutAccount = () => {
    mutate({}, { onError: errorLogout, onSuccess: successLogout });
  };
  const navigate = useNavigate();
  const successLogout = (e) => {
    toast(e.message, "success");
    navigate ('/auth/login')

    window.location.reload();
  };
  const errorLogout = (e) => {
    toast("مشکلی پیش آمده است", "success");
  };
  return (
    <div className="mt-4">
      <p className="text-18">ایا میخواهید از حساب خارج شوید ؟</p>
      <div className="mt-5 flex flex-row-reverse gap-3">
        <CustomButton
          onClick={logoutAccount}
          className="px-7  h-10 !text-18 text-black bg-white border-custom-primary-color border-2 border-solid hover:text-white"
        >
          بله
        </CustomButton>
        <CustomButton
          onClick={() => {
            close(false);
          }}
          className="px-7 bg-red-500 h-10 hover:bg-red-400 !text-18 text-white"
        >
          خیر
        </CustomButton>
      </div>
    </div>
  );
};

export default Logout;
