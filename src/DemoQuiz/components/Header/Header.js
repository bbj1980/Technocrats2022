import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <img src="/celsiorlogo.svg" className="logo" alt="quiz" />
      <Link to="/" className="title">
        Quiz Dashboard
      </Link>
      <hr className="divider" />
    </div>
  );
};

export default Header;
