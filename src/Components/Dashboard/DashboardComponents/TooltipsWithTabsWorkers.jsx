import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupsIcon from "@mui/icons-material/Groups";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconButton } from "@mui/material";

export default function TooltipsWithTabsWorkers() {
  const location = useLocation();
  const [selected, setSelected] = useState("home");

 const tabs = [
  { id: "home", icon: <HomeIcon />, label: "Home", path: "/worker-dashboard" },
  { id: "videos", icon: <OndemandVideoIcon />, label: "Videos", path: "workersvideos" },
  { id: "marketplace", icon: <StorefrontIcon />, label: "Marketplace", path: "" },
  { id: "groups", icon: <GroupsIcon />, label: "Groups", path: "" },
  { id: "add", icon: <AddCircleOutlineIcon />, label: "Add", path: "" },
];

useEffect(() => {
  const found = tabs.find(tab => location.pathname.includes(tab.path));
  setSelected(found ? found.id : "home");
}, [location.pathname]);

  return (
    <div className="flex justify-center items-center gap-12 border-b border-gray-300">
      {tabs.map((tab) => (
        <div key={tab.id} className="flex flex-col items-center">
          <Link to={tab.path}>
            <IconButton>
              {React.cloneElement(tab.icon, {
                fontSize: "large",
                color: selected === tab.id ? "primary" : "disabled",
              })}
            </IconButton>
          </Link>
          <div
            className={`transition-all h-1 rounded-full ${
              selected === tab.id ? "bg-blue-600 w-20" : "bg-transparent w-0"
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
}