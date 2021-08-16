import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, ContainerInner, GoBackButton } from "../../styles/global";
import { ReactComponent as GoBackIcon } from "./../../images/arrow-left.svg";

const Details = ({ data }: any) => {
  let history = useHistory();
  const { id } = useParams() as any;
  const [character, setCharacter] = useState(id);
  const handleGoBack = () => {
    history.push("/");
  };
  const handleEpisode = (event: any) => {
    console.log(event.target.innerText);
  };

  useEffect(() => {
    const characterStorage = localStorage.getItem("characterData");

    if (characterStorage) {
      setCharacter(JSON.parse(characterStorage));
    }

    const current = data.filter((item: any) => {
      if (item.id === Number(id)) {
        setCharacter({
          name: item.name,
          species: item.species,
          image: item.image,
          gender: item.gender,
          status: item.status,
          location: item.location.name,
          origin: item.origin.name,
          type: item.type,
          episode: item.episode.map((item: string) => {
            return item.split(" ");
          }),
        });
      }
      return null;
    });
    return current;
  }, []);

  useEffect(() => {
    console.log(character);
    localStorage.setItem("characterData", JSON.stringify(character));
  }, [character]);

  return (
    <Container>
      <ContainerInner>
        <GoBackButton onClick={handleGoBack}>
          <GoBackIcon />
        </GoBackButton>
        <section>
          <h1>{character.name}</h1>
          <article>
            <p>
              <strong>Specie</strong>
              <span>{character.species}</span>
            </p>
            <p>
              <strong>Gender</strong>
              <span>{character.gender}</span>
            </p>
            <p>
              <strong>Status</strong>
              <span>{character.status}</span>
            </p>
            <p>
              <strong>Location</strong>
              <span>{character.location}</span>
            </p>
            <p>
              <strong>Origin</strong>
              <span>{character.origin}</span>
            </p>
            <p>
              <strong>Type</strong>
              <span>{character.type ? character.type : "Not defined"}</span>
            </p>
            <figure>
              <img src={character.image} alt={character.name} />
            </figure>
          </article>
          <article>
            <p>
              <strong>Episodes</strong>
            </p>
            <ul>
              {character.episode &&
                character.episode.map((value: string) => (
                  <li key={value}>
                    <button onClick={handleEpisode}>{value}</button>
                  </li>
                ))}
            </ul>
          </article>
        </section>
      </ContainerInner>
    </Container>
  );
};

export default Details;
