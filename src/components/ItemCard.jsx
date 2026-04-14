import "../blocks/ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li onClick={() => onCardClick(item)}>
      <img src={item.link} alt={item.name} width="100" />
      <p>{item.name}</p>
    </li>
  );
}

export default ItemCard;
