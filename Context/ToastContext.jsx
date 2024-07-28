import { createContext, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

export const ToastMessageContext = createContext();

const ToastMessageProvider = ({ children }) => {
  const showToast = (message, type) => {
    toast[type](message, { position: "left-bottom" });
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
  const context = useContext(ToastMessageContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastMessageProvider");
  }
  return context;
};
