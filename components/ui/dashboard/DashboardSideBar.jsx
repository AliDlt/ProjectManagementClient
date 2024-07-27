import React from "react";
import Logo from "../Logo/Logo";
import Profile from "../profile/Profile";
import { useSideBar } from "../../../Context/SideBarContext";
import ListAside from "../ListAside/ListAside";
import { Drawer } from "antd";

function DashboardSideBar() {
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
        <nav className="flex flex-col items-center pt-12 w-full">
          <div className="flex justify-center">
            <Logo />
          </div>
          <Profile />
          <ListAside />
        </nav>
      </Drawer>
      <aside
        className=" hidden lg:block
        lg:col-span-3 
        fixed md:static z-50  2xl:col-span-2 lg:row-start-1 lg:-row-end-9  shadow-custom rounded-xl bg-white md:h-max border-b-4 border-custom-primary-color-300"
      >
        <nav className="flex flex-col items-center pt-12 w-full">
          <div className="flex justify-center">
            <Logo />
          </div>
          <Profile />
          <ListAside />
        </nav>
      </aside>
    </>
  );
}

export default DashboardSideBar;
