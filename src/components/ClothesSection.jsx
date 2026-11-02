
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ItemCard from "./ItemCard";
import "../blocks/ClothesSection.css";

function ClothesSection({
  clothingItems,
  onCardClick,
  onCardLike,
  onAddClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter((item) => {
    const ownerId =
      typeof item.owner === "object" && item.owner !== null
        ? item.owner._id
        : item.owner;

    return String(ownerId) === String(currentUser?._id);
  });

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>

        <button
          className="clothes-section__add-btn"
          onClick={onAddClick}
          type="button"
        >
          + Add new
        </button>
      </div>

      <div className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;
