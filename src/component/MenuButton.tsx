import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuButton.css"

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
          className = "button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default MenuButton;
