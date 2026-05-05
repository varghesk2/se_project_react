import "../blocks/ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const fallbackImage =
    "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-shirt.png";

  return (
    <div className="card" onClick={() => onCardClick?.(item)}>
      <img
        src={item?.imageUrl || fallbackImage}
        alt={item?.name || "Clothing item"}
        className="card__image"
        onError={(e) => {
          e.currentTarget.src = fallbackImage;
        }}
      />
      <div className="card__label">{item?.name || "Unnamed item"}</div>
    </div>
  );
}

export default ItemCard;
