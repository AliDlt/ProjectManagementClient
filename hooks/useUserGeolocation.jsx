import { useState } from "react";
import { useToast } from "../Context/ToastContext";

function useUserGeolocation() {
  const [location, setLocation] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const getLocation = () => {
    if (!navigator.geolocation)
      return toast("مرورگر شما از مکان پشتیبانی نمیکند", "error");
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        if (error.code === 1)
          return toast(
            "دسترسی داده نشد ، لطفا دسترسی به موقعیت مکانی دهید",
            "error",
          );
        toast(
          "متاسفانه موقعیت مکانی تان را دریافت نکردیم ، لطفا دوباره تلاش کنید.",
          "error",
        );
      },
    );
  };

  return { location, loading, getLocation };
}

export default useUserGeolocation;
