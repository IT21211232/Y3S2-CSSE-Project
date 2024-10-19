import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBarSingle({ data, position, fromParent }) {
  const { name, route, image, faIcon } = data;
  const { currentPage, setCurrentPageData } = fromParent;

  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        setCurrentPageData(name);
        navigate(`${route}`);
      }}
      className="w-full h-12 flex items-center justify-center cursor-pointer"
    >
      <div
        className={`[transition:500ms] w-[80%] h-10 ${
          currentPage === name ? "bg-primary_yellow" : ""
        }  flex items-center rounded-md`}
      >
        {image && (
          <img
            className={`ml-4 mr-2 size-4 [transition:500ms] ${
              currentPage === name ? "" : "yellow-filter"
            }`}
            src={image}
            alt=""
          />
        )}

        {faIcon && (
          <FontAwesomeIcon
            className={`ml-4 mr-2 size-4 [transition:500ms] ${
              currentPage === name ? "" : "yellow-filter"
            }`}
            src={image}
            alt=""
            icon={faIcon}
          />
        )}

        <h3 className="text-[11px] font-semibold">{name}</h3>
      </div>
    </div>
  );
}
