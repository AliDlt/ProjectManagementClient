import { useEffect, useState } from "react";
import { useToast } from "../Context/ToastContext";

function useUserGeolocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const toast = useToast();

  const refresh = () => {
    setLocation(null);
    setError(null);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      toast("موقعیت جغرافیایی توسط این مرورگر پشتیبانی نمی شود", "", "⚠️");
      return;
    }

    function handleSuccess(position) {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    }

    function handleError(error) {
      setError(error.message);
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { location, error, refresh };
}

export default useUserGeolocation;
