import React from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./dashboard/DashboardHeader";
import DashboardSideBar from "./dashboard/DashboardSideBar";
import SideBarContextProvider from "../../Context/SideBarContext";

export default function AppContainer() {
  return (
    <SideBarContextProvider>
      <section className="lg:container grid grid-cols-1 gap-5 lg:grid-cols-12">
        <header className="lg:col-span-9 2xl:col-span-10 rounded-br-custom rounded-bl-custom lg:rounded-custom shadow-custom border-b-4 border-custom-primary-color/50 sticky top-0 lg:top-5 bg-white z-10">
          <DashboardHeader />
        </header>
        <DashboardSideBar />
        <Outlet />
      </section>
    </SideBarContextProvider>
  );
}
