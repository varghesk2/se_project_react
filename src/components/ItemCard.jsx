
import { useContext } from "react";
import "../blocks/ItemCard.css";
import CurrentUserContext from "../contexts/CurrentUserContext";
import likeIcon from "../images/like.svg";
import likeActiveIcon from "../images/like-active.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const fallbackImage =
    "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-shirt.png";

  const isLiked = item?.likes?.some((like) => {
    const userId =
      typeof like === "object" && like !== null
        ? like._id
        : like;

    return String(userId) === String(currentUser?._id);
  });

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
          onError={(event) => {
            event.currentTarget.src = fallbackImage;
          }}
        />
      </div>

      <div className="card__label">
        <span>{item?.name || "Unnamed item"}</span>

        {currentUser && (
          <button
            type="button"
            className="card__like-button"
            onClick={(event) => {
              event.stopPropagation();
              onCardLike?.(item);
            }}
            aria-label={isLiked ? "Unlike item" : "Like item"}
          >
            <img
              src={isLiked ? likeActiveIcon : likeIcon}
              alt=""
              className="card__like-icon"
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
