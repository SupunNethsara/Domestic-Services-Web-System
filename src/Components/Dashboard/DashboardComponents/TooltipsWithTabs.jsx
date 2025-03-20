import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupsIcon from "@mui/icons-material/Groups";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconButton } from "@mui/material";

export default function BottomNav() {
  const [selected, setSelected] = useState("home");

  const tabs = [
    { id: "home", icon: <HomeIcon />, label: "Home" },
    { id: "videos", icon: <OndemandVideoIcon />, label: "Videos" },
    { id: "marketplace", icon: <StorefrontIcon />, label: "Marketplace" },
    { id: "groups", icon: <GroupsIcon />, label: "Groups" },
    { id: "add", icon: <AddCircleOutlineIcon />, label: "Add" },
  ];

  return (
    <div className="flex justify-center items-center gap-12  border-b border-gray-300">
      {tabs.map((tab) => (
        <div key={tab.id} className="flex flex-col items-center">
          <IconButton onClick={() => setSelected(tab.id)}>
            {React.cloneElement(tab.icon, {
              fontSize: "large",
              color: selected === tab.id ? "primary" : "disabled",
            })}
          </IconButton>
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
