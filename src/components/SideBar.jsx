import "../blocks/SideBar.css";
import profilePic from "../images/profile.png";

function SideBar({ currentUser, onLogout }) {
  return (
    <div className="sidebar">
      <img
        src={currentUser?.avatar || profilePic}
        alt="User avatar"
        className="sidebar__avatar"
      />

      <p className="sidebar__username">
        {currentUser?.name || "User"}
      </p>

      {onLogout && (
        <button
          className="sidebar__logout"
          onClick={onLogout}
          type="button"
        >
          Log out
        </button>
      )}
    </div>
  );
}

export default SideBar;
