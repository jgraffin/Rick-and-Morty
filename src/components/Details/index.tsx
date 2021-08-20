import { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, ContainerInner, GoBackButton } from "../../styles/global";
import { ReactComponent as GoBackIcon } from "./../../images/arrow-left.svg";

const Details = ({ data }: any) => {
  let history = useHistory();
  const containerEpisodes = useRef() as React.MutableRefObject<HTMLDivElement>;
  const containerLocations = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { id } = useParams() as any;
  const [counter, setCounter] = useState(0);
  const [character, setCharacter] = useState(id);
  const handleGoBack = () => {
    history.push("/");
  };

  const getEpisodeData = (episodeUrlData: string) => {
    try {
      fetch(episodeUrlData)
        .then((res) => res.json())
        .then((data: { name: string; episode: string; air_date: string }) => {
          containerEpisodes.current.innerHTML += `
          <div>
            <p>
              <strong>Name:</strong>
              ${data.name}
            </p>
            <p>
              <strong>Episode:</strong>
              ${data.episode}
            </p>
            <p>
              <strong>Air date:</strong>
              ${data.air_date}
            </p>
          <div>`;
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getLocationData = (locationUrlData: string) => {
    try {
      fetch(locationUrlData)
        .then((res) => res.json())
        .then((data: any) => {
          containerLocations.current.innerHTML += `
          <p>
            <strong>Name:</strong>
            ${data.name}
          </p>
          <p>
            <strong>Dimension:</strong>
            ${data.dimension}
          </p>
          <p>
            <strong>Type:</strong>
            ${data.type}
          </p>`;
        });
    } catch (error) {
      console.log(error);
    }
  };

  const switchText = (size: boolean) => {
    return size
      ? "Episodes this character has been seen"
      : "Unique episode this character has been seen";
  };

  const getType = (type: string) => {
    return type ? character.type : "Not defined";
  };

  useEffect(() => {
    const characterStorage = localStorage.getItem("characterData");

    if (characterStorage) {
      setCharacter(JSON.parse(characterStorage));
    }

    const current = data.filter((item: any) => {
      if (item.id === Number(id)) {
        const {
          name,
          species,
          image,
          gender,
          status,
          type,
          location: { url },
        } = item;
        const currentCharacterData = {
          name,
          species,
          image,
          gender,
          status,
          episodes: item.episode.map((url: string) => getEpisodeData(url)),
          location: item.location.name,
          origin: item.origin.name,
          type,
          url,
        };

        setCharacter(currentCharacterData);
        setCounter(item.episode.length);

        if (character.url) {
          getLocationData(character.url);
        }
      }
      return null;
    });
    return current;
  }, [data, id, character.url]);

  useEffect(() => {
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
              <span>{getType(character.type)}</span>
            </p>
            <figure>
              <img src={character.image} alt={character.name} />
            </figure>
          </article>
          <article>
            <h3>{switchText(counter > 1)}</h3>
            <div className="container" ref={containerEpisodes}></div>
          </article>
          <article>
            <h3>Location</h3>
            <div className="container" ref={containerLocations}></div>
          </article>
        </section>
      </ContainerInner>
    </Container>
  );
};

export default Details;
