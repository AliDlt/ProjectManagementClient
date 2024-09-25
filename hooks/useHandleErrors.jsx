import { useEffect } from "react";
import { useToast } from "../Context/ToastContext";

function useHandleErrors(loading, error) {
  const toast = useToast();

  useEffect(() => {
    if (!loading && error) {
      if (error.response.data.errors?.length > 0) {
        toast(error?.response?.data?.errors[0], "error");
        return;
      }
      if (error.response.data.message) {
        toast(error?.response?.data?.message, "error");
        return;
      }
    }
  }, [loading, error]);

  return null;
}

export default useHandleErrors;
