import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/Profile.css";

function Profile({
  clothingItems,
  onCardClick,
  onCardLike,
  onAddClick,
  currentUser,
  onLogout,
  onEditProfile,
}) {
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <SideBar
          currentUser={currentUser}
          onLogout={onLogout}
          onEditProfile={onEditProfile}
        />
      </div>

      <div className="profile__content">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onAddClick={onAddClick}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}

export default Profile;