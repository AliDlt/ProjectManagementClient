import { createContext } from "react";
import toast, { Toaster } from "react-hot-toast";

export const ToastMessageContext = createContext();

const ToastMessageProvider = ({ children }) => {
  const showToast = (message, type) => {
    toast[type](message, { position: "left-bottom" });
  };
  return (
    <ToastMessageContext.Provider value={{showToast}}>
      {children}
      <Toaster />
    </ToastMessageContext.Provider>
  );
};
export default ToastMessageProvider;
