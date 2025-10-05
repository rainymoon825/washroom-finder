import { useNavigate } from "react-router-dom";
import "./Button.css"

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
  ];

  const handleItemClick = (item: MenuItem) => {
    onSelect(item);  
    navigate(item.path); 
  };

  return (
    <div className="menu-buttons-container">
      {children.map((item, index) => (
        <button
          key={index}
          onClick={() => handleItemClick(item)}
          className="MenuButton"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default MenuButton;
