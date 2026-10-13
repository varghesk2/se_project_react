import "../blocks/ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const fallbackImage =
    "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-shirt.png";

  const isLiked = item?.likes?.some(
    (userId) => userId === currentUser?._id
  );

  return (
    <div className="card">
      <div
        className="card__image-container"
        onClick={() => onCardClick?.(item)}
      >
        <img
          src={item?.imageUrl || fallbackImage}
          alt={item?.name || "Clothing item"}
          className="card__image"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
      </div>

      <div className="card__label">
        <span>{item?.name || "Unnamed item"}</span>

        {currentUser && (
          <button
            type="button"
            className={`card__like-button ${
              isLiked ? "card__like-button_active" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onCardLike?.(item);
            }}
            aria-label={isLiked ? "Unlike item" : "Like item"}
          >
            ♥
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemCard;