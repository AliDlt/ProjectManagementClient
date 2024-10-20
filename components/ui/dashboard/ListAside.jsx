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
      { name: "گزارش ها", icon: "/icons/آیکون-گزارش ها.svg", path: "/reports-categories" },
      { name: "پیام ها", icon: "/icons/آیکون-پیام ها.svg", path: "/messages" },
    ];
    if (!isLoading && user && user?.userRole !== 2) {
      pagesList.push({
        name: "کاربران",
        icon: "/icons/Group 6.svg",
        path: "/users",
      });
    }
    if ((!isLoading && user && user?.userRole === 0) || user?.userRole === 3) {
      pagesList.push({
        name: "متقاضیان",
        icon: "/icons/Group 6.svg",
        path: "/applicants",
      });
    }

    if (!isLoading && user && user?.userRole === 3) {
      return [
        {
          name: "متقاضیان",
          icon: "/icons/Group 6.svg",
          path: "/applicants",
        },
        {
          name: "پیام ها",
          icon: "/icons/آیکون-پیام ها.svg",
          path: "/messages",
        },
      ];
    }

    return pagesList;
  }, [user, isLoading]);

  return (
    <div className="list-none w-full flex flex-col overflow-hidden mt-4 ">
      {pages.map(({ icon, name, path }, index) => (
        <NavLink
          onClick={() => setShow(false)}
          key={index}
          to={path}
          className={({ isActive }) =>
            cn([
              "flex justify-start px-8 py-5  gap-4 items-center text-custom-textFaint-color hover:text-custom-textFaint-color border-r-8 border-transparent",
              isActive &&
                "font-extrabold bg-custom-primary-color/20 text-black focus:text-black border-custom-primary-color",
            ])
          }
        >
          <div className="flex justify-center gap-2 items-center">
            <img className="w-8 h-7" src={icon} alt={name} />
            <span>{name}</span>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default ListAside;
