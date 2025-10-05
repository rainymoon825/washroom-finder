import { useNavigate } from "react-router-dom";
import "./ProfileButton.css";

interface Props {
  onSelect: () => void;
}

function ProfileButton({ onSelect }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    onSelect();
    navigate("/profile");
  };

  return (
    <button 
      onClick={handleClick} 
      className="ProfileButton"
      title="View Profile"
    >
      <span className="profile-icon">👤</span>
      <span className="profile-text">Profile</span>
    </button>
  );
}

export default ProfileButton;
