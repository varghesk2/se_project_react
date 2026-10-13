import ItemCard from "./ItemCard";
import "../blocks/ClothesSection.css";

function ClothesSection({
  clothingItems,
  onCardClick,
  onCardLike,
  onAddClick,
  currentUser,
}) {
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="profile__content">
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