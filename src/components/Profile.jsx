import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/Profile.css";

function Profile({ clothingItems, onCardClick, onAddClick }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
      />
    </div>
  );
}

export default Profile;
