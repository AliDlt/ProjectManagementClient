import React, { useState } from "react";
import Logo from "../components/ui/dashboard/Logo";
import Profile from "../components/ui/dashboard/Profile";
import { useSideBar } from "../Context/SideBarContext";
import ListAside from "../components/ui/dashboard/ListAside";
import { Drawer } from "antd";

function SideBar() {
  const { show, setShow } = useSideBar();
  return (
    <>
      <Drawer
        onClose={() => setShow(false)}
        open={show}
        closeIcon={false}
        classNames={{
          body: "!p-0",
          wrapper: "lg:hidden ",
          mask: "lg:hidden",
        }}
        styles={{
          wrapper: {
            width: "250px",
          },
        }}
      >
        <nav className="flex flex-col items-center w-full pt-3">
          <div className="w-[50%]">
            <Logo />
          </div>
          <Profile />
          <ListAside />
        </nav>
      </Drawer>
      <aside
        className=" hidden lg:block
        lg:col-span-3 
         md:static z-50  2xl:col-span-2 lg:row-start-1 lg:-row-end-9 shadow-custom rounded-xl bg-white md:h-[40rem] border-b-4 border-custom-primary-color-300 lg:!sticky lg:top-5 overflow-auto"
      >
        <nav className="flex flex-col items-center w-full pt-3">
          <div className="w-[50%]">
            <Logo />
          </div>
          <Profile />
          <ListAside />
        </nav>
      </aside>
    </>
  );
}

export default SideBar;
