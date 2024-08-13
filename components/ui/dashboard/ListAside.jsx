import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import cn from "../../../utils/cn";
import { useSideBar } from "../../../Context/SideBarContext";
import useUser from "../../../hooks/useUser";

const ListAside = () => {
  const { setShow } = useSideBar();
  const { user, isLoading } = useUser();

  const pages = useMemo(() => {
    let pagesList = [
      { name: "داشبورد", icon: "/icons/آیکون-داشبورد.svg", path: "/dashboard" },
      {
        name: "پروژه ها",
        icon: "/icons/آیکون-پروژه ها.svg",
        path: "/projects",
      },
      { name: "گزارش ها", icon: "/icons/آیکون-گزارش ها.svg", path: "/reports" },
      { name: "پیام ها", icon: "/icons/آیکون-پیام ها.svg", path: "/messages" },

    ];

    if (!isLoading && user && user?.userRole !== 2) {
      pagesList.push({
        name: "کاربران",
        icon: "/icons/Group 6.svg",
        path: "/users",
      });
    }
    return pagesList;
  }, [user, isLoading]);

  return (
    <div className="list-none w-full flex flex-col overflow-hidden mt-14 ">
      {pages.map(({ icon, name, path }, index) => (
        <NavLink
          onClick={() => setShow(false)}
          key={index}
          to={path}
          className={({ isActive }) =>
            cn([
              "flex justify-start px-8 py-7 gap-5 items-center text-custom-textFaint-color hover:text-custom-textFaint-color border-r-8 border-transparent",
              isActive &&
                "font-extrabold bg-custom-primary-color/20 text-black focus:text-black border-custom-primary-color",
            ])
          }
        >
          <span>
            <img src={icon} alt={name} />
          </span>
          <span>{name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default ListAside;
