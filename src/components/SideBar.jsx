import "../blocks/SideBar.css";
import profilePic from "../images/profile.png";

function SideBar({ currentUser, onLogout, onEditProfile }) {
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img
          src={currentUser?.avatar || profilePic}
          alt="User avatar"
          className="sidebar__avatar"
        />

        <p className="sidebar__username">
          {currentUser?.name || "User"}
        </p>
      </div>

      <div className="sidebar__actions">
        <button
          className="sidebar__edit"
          onClick={onEditProfile}
          type="button"
        >
          Edit profile
        </button>

        <button
          className="sidebar__logout"
          onClick={onLogout}
          type="button"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;