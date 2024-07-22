import React from "react";
const pages = [
  { name: "داشبورد", icon: "/public/icons/آیکون-داشبورد.svg" },
  { name: "مدیر", icon: "/public/icons/آیکون-مدیر.svg" },
  { name: "ناظر ها", icon: "/public/icons/آیکون-ناظرها.svg" },
  { name: "پروژه ها", icon: "/public/icons/آیکون-پروژه ها.svg" },
  { name: "گزارش ها", icon: "/public/icons/آیکون-گزارش ها.svg" },
  { name: "پیام ها", icon: "/public/icons/آیکون-پیام ها.svg" },
];
const ListAside = () => {
  return (
    <ul className="list-none w-full flex flex-col  ">
      {pages.map(({ icon, name }) => {
       return <li className="flex justify-start p-8 gap-5 items-center ">
          <span >
            <img src={icon} alt={name} />
          </span>
          <span>{name}</span>
        </li>;
      })}
    </ul>
  );
};

export default ListAside;
