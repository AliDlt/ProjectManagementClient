import React, { useContext } from "react";
import Logo from "../Logo/Logo";
import Profile from "../profile/Profile";
import { SideBarContext } from "../../../Context/SideBarContext";
import { IoMdClose } from "react-icons/io";

function DashboardSideBar() {
  const { show, toggle } = useContext(SideBarContext);
  return (
    <aside
      className={`lg:col-span-3 
        fixed
        lg:static
        z-50
        h-full
        ${show ? "right-0" : "-right-full"}
                
        2xl:col-span-2 lg:row-start-1 lg:-row-end-9  lg:block shadow-custom rounded-xl bg-white`}
    >
      <p className="m-2 left-0 text-custom-primary-color text-2xl absolute">
        <IoMdClose
          onClick={() => {
            toggle(false);
          }}
        />
      </p>
      <nav className="flex flex-col items-center pt-12 w-full">
        <Logo />
        <Profile />
      </nav>
    </aside>
  );
}

export default DashboardSideBar;
