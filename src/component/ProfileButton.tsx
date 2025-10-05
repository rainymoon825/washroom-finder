import { useNavigate } from "react-router-dom";
import "./Button.css";
import ProfileIcon from "../assets/ProfileIcon.png";

function ProfileButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <button className = "ProfileButton" onClick={handleClick}>
      <img src = {ProfileIcon}/>
    </button>
  );
}

export default ProfileButton;
