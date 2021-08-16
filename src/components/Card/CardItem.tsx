import { Item } from "./styles";
import { Link } from "react-router-dom";

type CardType = {
  id: number;
  name: string;
  location?: string;
  image: string;
  species: string;
  onClickDetails?: string;
  episodes: [];
  gender: string;
  status: string;
};

const CardItem = ({
  id,
  name,
  location,
  image,
  species,
  onClickDetails,
  episodes,
  gender,
  status,
}: CardType) => {
  return (
    <Item key={id}>
      <Link to={String(onClickDetails)} className="item__button">
        <figure className="item__button__image">
          <img src={image} alt={name} />
        </figure>
        <div className="item__button__title">
          <h2>
            <strong>{name}</strong>, {species}
          </h2>
        </div>
        <div className="item__button__location">
          <p>{location}</p>
        </div>
        <div className="item__button__overall">
          <ul>
            <li>
              <strong>{episodes.length}</strong>
              <span>{episodes.length > 1 ? "Episodes" : "Episode"}</span>
            </li>
            <li>
              <strong>{gender}</strong>
              <span>Gender</span>
            </li>
            <li>
              <strong>{status}</strong>
              <span>Status</span>
            </li>
          </ul>
        </div>
      </Link>
    </Item>
  );
};

export default CardItem;
