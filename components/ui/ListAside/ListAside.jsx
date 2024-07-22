import React from "react";
const pages = [
  { name: "داشبورد", icon: "/icons/آیکون-داشبورد.svg" },
  { name: "مدیر", icon: "/icons/آیکون-مدیر.svg" },
  { name: "ناظر ها", icon: "/icons/آیکون-ناظرها.svg" },
  { name: "پروژه ها", icon: "/icons/آیکون-پروژه ها.svg" },
  { name: "گزارش ها", icon: "/icons/آیکون-گزارش ها.svg" },
  { name: "پیام ها", icon: "/icons/آیکون-پیام ها.svg" },
];
const ListAside = () => {
  return (
    <ul className="list-none w-full flex flex-col  ">
      {pages.map(({ icon, name }) => {
       return <li className="flex justify-start p-8 gap-5 items-center text-custom-textFaint-color ">
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
