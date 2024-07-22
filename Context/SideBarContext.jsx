import React, { createContext, useState } from "react";

export const SideBarContext = createContext(null);

const SideBarContextProvider = ({ children }) => {
  const [show, toggle] = useState(false);
  return (
    <SideBarContext.Provider value={{ show, toggle }}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarContextProvider;
