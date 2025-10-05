import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  label: string;
  path: string;
}

interface Props {
  onSelect: (item: MenuItem) => void;
}

function MenuButton({ onSelect }: Props) {
  const navigate = useNavigate();

  const children: MenuItem[] = [
    { label: "Map", path: "/map" },
    { label: "Load/Verify", path: "/load_or_verify" },
    { label: "Washroom", path: "/Washroom" }
  ];

  const handleItemClick = (item: MenuItem) => {
    onSelect(item);  
    navigate(item.path); 
  };

  return (
    <div>
      {children.map((item) => (
        <button

          onClick={() => handleItemClick(item)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default MenuButton;
