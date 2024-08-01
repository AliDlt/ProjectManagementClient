import React from "react";
import { Outlet } from "react-router-dom";
import SideBarContextProvider from "../../Context/SideBarContext";
import Header from "../../layout/Header";
import SideBar from "../../layout/SideBar";

export default function AppContainer() {
  return (
    <SideBarContextProvider>
      <section className="lg:container grid grid-cols-1 gap-5 lg:grid-cols-12">
        <Header />
        <SideBar />
        <Outlet />
      </section>
    </SideBarContextProvider>
  );
}
