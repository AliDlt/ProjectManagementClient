import React, { createContext, useContext, useState } from "react";

export const SideBarContext = createContext(null);

const SideBarContextProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  return (
    <SideBarContext.Provider value={{ show, setShow }}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarContextProvider;

export const useSideBar = () => {
  const context = useContext(SideBarContext);
  if (context === undefined) {
    throw new Error("useSideBar must be used within a SideBarContextProvider");
  }
  return context;
};
