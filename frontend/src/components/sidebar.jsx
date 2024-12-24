import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import {
  faXmark,
  faList,
  faUser,
  faBorderAll,
  faFile,
  faListCheck,
  faChartPie,
  faCartShopping,
  faPhone,
  faHotel,
  faInbox,
  faGear,
  faArrowRightFromBracket,
  faMagnifyingGlass,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const menu = [
    { title: "Dashboard", icon: faBorderAll },
    { title: "Pages", icon: faFile },
    {
      title: "Projects",
      icon: faListCheck,
      subMenu: true,
      subMenuItems: [
        { title: "Shopping App", icon: faCartShopping },
        { title: "Chat App", icon: faPhone },
        { title: "Hotel Booking", icon: faHotel },
      ],
    },
    { title: "Analytics", icon: faChartPie },
    { title: "Inbox", icon: faInbox },
    { title: "Setting", icon: faGear },
    { title: "Logout", icon: faArrowRightFromBracket },
  ];
  const [submenuOpen, setSubmenuOpen] = useState(true);
  const [close, setClose] = useState(false);

  return (
    <div
      className={`bg-purple-950 h-screen duration-500 p-5 pt-4 relative ${
        close ? "w-72" : "w-20"
      }`}
    >
      <FontAwesomeIcon
        className={` bg-transparent text-gray-300 text-3xl  text-center  absolute top-5 right-7 duration-100 cursor-pointer ${
          close && "rotate-[360deg]"
        }`}
        onClick={() => {
          setClose(!close);
          console.log("hi");
        }}
        icon={close ? faXmark : faList}
      />
      <div className="flex">
        <FontAwesomeIcon
          icon={faUser}
          className={`text-2xl bg-amber-300 p-1 duration-500 rounded-sm ${
            !close && "scale-0"
          }`}
        />
        <h1 className={` text-white pl-4 text-2xl   ${!close && "hidden"}`}>
          Karan Telgad
        </h1>
      </div>

      <div className="bg-light-white flex h-10 mt-6 px-3 py-2 items-center rounded-md">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="text-white text-sm block  float-left cursor-pointer"
        />
        <input
          type={"search"}
          className={`bg-transparent text-sm w-full ml-1 text-white border-none focus:outline-none duration-500 ${
            !close && "hidden "
          }`}
          placeholder="Search "
        />
      </div>
      <ul className="pt-2">
        {menu.map((menu, index) => (
          <React.Fragment key={menu.title}>
            <li
              key={index}
              className="text-sm text-gray-300  pl-1 flex items-center p-2 gap-x-4 cursor-pointer rounded-md mt-2 hover:bg-light-white "
            >
              <span className="text-sm block float-left pl-1">
                <FontAwesomeIcon icon={menu.icon} />
              </span>
              <span
                className={` text-sm flex-1 ${!close && "hidden duration-500"}`}
              >
                {menu.title}
              </span>

              {menu.subMenu && (
                <FontAwesomeIcon
                  className={`  duration-500 ${!submenuOpen && "rotate-180"}`}
                  onClick={() => {
                    setSubmenuOpen(!submenuOpen);
                  }}
                  icon={faCaretDown}
                />
              )}
            </li>
            {menu.subMenu &&
              menu.subMenuItems.map((x, i) => (
                <ul key={i}>
                  <li
                    key={i}
                    className={`text-sm text-gray-300  pl-1 flex items-center p-2 gap-x-4 cursor-pointer  rounded-md mt-2 hover:bg-light-white ml-7  ${
                      submenuOpen && "hidden"
                    }`}
                  >
                    <FontAwesomeIcon icon={x.icon} />
                    <span className={`${!close && "hidden"}`}>{x.title}</span>
                  </li>
                </ul>
              ))}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
