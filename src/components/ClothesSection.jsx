import ItemCard from "./ItemCard";
import "../blocks/ClothesSection.css";

function ClothesSection({ clothingItems, onCardClick, onAddClick }) {
  return (
    <div className="profile__content">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>

        <button className="clothes-section__add-btn" onClick={onAddClick}>
          + Add new
        </button>
      </div>

      <div className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;
