import "../blocks/SideBar.css";
import profilePic from "../images/profile.png";

function SideBar({ currentUser, onLogout, onEditProfile }) {
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

      <button
        className="sidebar__edit"
        onClick={onEditProfile}
        type="button"
      >
        Edit profile
      </button>

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