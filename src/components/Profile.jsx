import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/Profile.css";

function Profile({
  clothingItems,
  onCardClick,
  onAddClick,
  currentUser,
  onLogout,
}) {
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <SideBar
          currentUser={currentUser}
          onLogout={onLogout}
        />
      </div>

      <div className="profile__content">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onAddClick={onAddClick}
        />
      </div>
    </div>
  );
}

export default Profile;
