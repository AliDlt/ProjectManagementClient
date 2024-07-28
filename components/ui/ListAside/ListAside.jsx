import React from "react";
import { NavLink } from "react-router-dom";
import cn from "../../../utils/cn";
import { useSideBar } from "../../../Context/SideBarContext";
const pages = [
  { name: "داشبورد", icon: "/icons/آیکون-داشبورد.svg", path: "/dashboard" },
  { name: "مدیر", icon: "/icons/آیکون-مدیر.svg", path: "/managers" },
  { name: "ناظر ها", icon: "/icons/آیکون-ناظرها.svg", path: "/observers" },
  {
    name: "پیمانکاران",
    icon: "/icons/ایکون-پیمانکارها.svg",
    path: "/contractors",
  },
  { name: "پروژه ها", icon: "/icons/آیکون-پروژه ها.svg", path: "/projects" },
  { name: "گزارش ها", icon: "/icons/آیکون-گزارش ها.svg", path: "/reports" },
  { name: "پیام ها", icon: "/icons/آیکون-پیام ها.svg", path: "/messages" },
];
const ListAside = () => {
  const { setShow } = useSideBar();

  return (
    <div className="list-none w-full flex flex-col overflow-hidden mt-14">
      {pages.map(({ icon, name, path }, index) => {
        return (
          <NavLink
            onClick={() => setShow(false)}
            key={index}
            to={path}
            className={({ isActive }) =>
              cn([
                "flex justify-start px-8 py-7 gap-5 items-center text-custom-textFaint-color hover:text-custom-textFaint-color",
                isActive &&
                  "font-extrabold bg-custom-primary-color/20 text-black focus:text-black text-18",
              ])
            }
          >
            <span>
              <img src={icon} alt={name} />
            </span>
            <span>{name}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default ListAside;
