import { useNavigate } from "react-router-dom";
import "./Button.css";

interface MenuItem {
  label: string;
  path: string;
}

interface Props {
  onSelect: (item: MenuItem) => void;
}

function LeaderboardButton({ onSelect }: Props) {
  const navigate = useNavigate();

  const children: MenuItem[] = [{ label: "Leaderboard", path: "/leaderboard" }];

  const handleItemClick = (item: MenuItem) => {
    onSelect(item);
    navigate(item.path);
  };

  return (
    <div>
      {children.map((item) => (
        <button onClick={() => handleItemClick(item)} className="LeaderboardButton">
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default LeaderboardButton;
