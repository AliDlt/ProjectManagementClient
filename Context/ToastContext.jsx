import { createContext, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

export const ToastMessageContext = createContext();

const ToastMessageProvider = ({ children }) => {
  const showToast = (message, type, icon) => {
    if (type) return toast[type](message, { position: "left-bottom" });

    return toast(message, { position: "left-bottom", icon });
  };
  return (
    <ToastMessageContext.Provider value={{ showToast }}>
      {children}
      <Toaster />
    </ToastMessageContext.Provider>
  );
};
export default ToastMessageProvider;

export const useToast = () => {
  const { showToast } = useContext(ToastMessageContext);
  if (showToast === undefined) {
    throw new Error("useToast must be used within a ToastMessageProvider");
  }
  return showToast;
};
