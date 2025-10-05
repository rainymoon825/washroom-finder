import { useNavigate } from "react-router-dom";
import "./Button.css"

interface MenuItem {
  label: string;
  path: string;
}

interface Props {
  onSelect: (item: MenuItem) => void;
}

function SubmitButton({ onSelect }: Props) {
  const navigate = useNavigate();

  const children: MenuItem[] = [
    { label: "Submit", path: "/map" },
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
          className = "SubmitButton"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default SubmitButton;
