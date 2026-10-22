import { useContext } from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../blocks/Profile.css";

function Profile({
  clothingItems,
  onCardClick,
  onCardLike,
  onAddClick,
  onLogout,
  onEditProfile,
}) {
  const currentUser = useContext(CurrentUserContext);

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