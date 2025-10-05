import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

interface MenuItem {
  label: string;
  path: string;
  icon: string;
}

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { label: "Map", path: "/map", icon: "🗺️" },
    { label: "Leaderboard", path: "/leaderboard", icon: "🏆" },
    { label: "Profile", path: "/profile", icon: "👤" },
  ];

  const handleItemClick = (item: MenuItem) => {
    navigate(item.path);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h2>🚽</h2>
        <span className="sidebar-title">Washroom Finder</span>
      </div>
      
      <div className="sidebar-menu">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => handleItemClick(item)}
          >
            <span className="item-icon">{item.icon}</span>
            <span className="item-label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
