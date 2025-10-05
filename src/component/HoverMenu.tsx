import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./HoverMenu.css";

interface MenuItem {
  label: string;
  path: string;
  icon: string;
}

function HoverMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { label: "Map", path: "/map", icon: "🗺️" },
    { label: "Leaderboard", path: "/leaderboard", icon: "🏆" },
    { label: "Profile", path: "/profile", icon: "👤" },
  ];

  const handleItemClick = (item: MenuItem) => {
    navigate(item.path);
    setIsOpen(false);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div 
      className="hover-menu-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="menu-trigger">
        <span className="menu-icon">☰</span>
        <span className="menu-text">Menu</span>
      </div>
      
      {isOpen && (
        <div className="menu-dropdown">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => handleItemClick(item)}
            >
              <span className="item-icon">{item.icon}</span>
              <span className="item-label">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default HoverMenu;
