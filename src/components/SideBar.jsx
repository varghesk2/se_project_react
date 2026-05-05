import "../blocks/SideBar.css";
import profilePic from "../images/profile.png";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={profilePic} alt="User avatar" className="sidebar__avatar" />
      <p className="sidebar__username">Kevin Varghese</p>
    </div>
  );
}

export default SideBar;
