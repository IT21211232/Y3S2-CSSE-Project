import React, { useEffect, useState, useContext } from "react";

// images
import logoImageYellow from "../../../assets/logo/logoyellow.svg";

// components
import NavBarSingle from "../navbarsingle/NavBarSingle";

// context
import { GlobalDataContext } from "../../../context/globalData";

// utils
import { getNavItems } from "../../../utils/navbaroptions";

export default function SideNav({ type }) {
  const { currentPage, setCurrentPageData } = useContext(GlobalDataContext);
  const [contentArr, setContentArr] = useState([]);

  const dataToNavBarSingle = {
    currentPage,
    setCurrentPageData,
  };

  useEffect(() => {
    // if (type === "user") {
    //   setContentArr(getNavItems());
    // }
    setContentArr(getNavItems());
  }, []);
  return (
    <div className="h-screen relative w-52 flex flex-col [box-shadow:0px_5px_20px_5px_rgba(0,0,0,0.6)] rounded-md">
      {/* contains the logo */}
      <div className="flex flex-col items-center justify-center w-full h-36">
        <img className="size-20" src={logoImageYellow} alt="" />
        <h1 className="text-2xl font-medium">
          <font className="text-primary_yellow">Eco</font>
          <font>Bin</font>
        </h1>
      </div>
      {/*Contains individual links*/}
      <div className="links flex-1 w-full overflow-y-auto">
        {contentArr.map((data, index) => (
          <NavBarSingle
            key={index}
            data={data}
            position={index}
            fromParent={dataToNavBarSingle}
          />
        ))}
      </div>
    </div>
  );
}
