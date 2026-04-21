import "../blocks/ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <div className="card" onClick={() => onCardClick(item)}>
      <img src={item.imageUrl} alt={item.name} className="card__image" />
      <p className="card__name">{item.name}</p>
    </div>
  );
}

export default ItemCard;
