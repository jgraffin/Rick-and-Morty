import { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, ContainerInner, GoBackButton } from "../../styles/global";
import { ReactComponent as GoBackIcon } from "./../../images/arrow-left.svg";
import { CharactersListType } from "../../interface/CharactersListType";
import { EpisodeTypeProps } from "../../interface/EpisodesType";

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
        .then((data: EpisodeTypeProps) => {
          containerEpisodes.current.innerHTML += `
            <ul class='list-specification'>
              <li>
                <span>${data.name}</span>
              </li>
              <li>
                <span>${data.episode}</span>
              </li>
              <li>
                <span>${data.air_date}</span>
              </li>
            </ul>
          `;
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
          <ul class='list-specification'>
            <li>
              <span>${data.name}</span>
            </li>
            <li>
              <span>${data.dimension}</span>
            </li>
            <li>
              <span>${data.type}</span>
            </li>
          </ul>`;
        });
    } catch (error) {
      console.log(error);
    }
  };

  const switchText = (size: boolean) => {
    return size
      ? "These are the episodes where the character has been seen"
      : "Episode where the character has been seen";
  };

  const getType = (type: string) => {
    return type ? character.type : "Not defined";
  };

  useEffect(() => {
    const characterStorage = localStorage.getItem("characterData");

    if (characterStorage) {
      setCharacter(JSON.parse(characterStorage));
    }

    const current = data.filter((item: CharactersListType) => {
      if (item.id === Number(id)) {
        const {
          name,
          species,
          image,
          gender,
          status,
          type,
          location: { url: urlLocation },
        } = item;
        const currentCharacterData = {
          name,
          species,
          image,
          gender,
          status,
          episodes: item.episode,
          location: item.location.name,
          origin: item.origin.name,
          type,
          urlLocation,
        };

        setCharacter(currentCharacterData);
        setCounter(item.episode.length);

        if (character?.episodes) {
          character.episodes.map((url: string) => getEpisodeData(url));
        }

        if (character?.urlLocation) {
          getLocationData(character.urlLocation);
        }
      }
      return null;
    });
    return current;
  }, [data, id, character.episodes, character.urlLocation]);

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
            <ul className="list-specification">
              <li>
                <strong>Specie</strong>
                <span>{character.species}</span>
              </li>
              <li>
                <strong>Gender</strong>
                <span>{character.gender}</span>
              </li>
              <li>
                <strong>Status</strong>
                <span>{character.status}</span>
              </li>
              <li>
                <strong>Location</strong>
                <span>{character.location}</span>
              </li>
              <li>
                <strong>Origin</strong>
                <span>{character.origin}</span>
              </li>
              <li>
                <strong>Type</strong>
                <span>{getType(character.type)}</span>
              </li>
            </ul>
            <figure>
              <img src={character.image} alt={character.name} />
            </figure>
          </article>
          <article>
            <h3>{switchText(counter > 1)}</h3>
            <ul className="list-specification list-specification--head">
              <li>
                <strong>Name</strong>
              </li>
              <li>
                <strong>Episode</strong>
              </li>
              <li>
                <strong>Air date</strong>
              </li>
            </ul>
            <div className="container" ref={containerEpisodes}></div>
          </article>
          <article>
            <h3>Location</h3>
            <ul className="list-specification list-specification--head">
              <li>
                <strong>Name</strong>
              </li>
              <li>
                <strong>Dimension</strong>
              </li>
              <li>
                <strong>Type</strong>
              </li>
            </ul>
            <div className="container" ref={containerLocations}></div>
          </article>
        </section>
      </ContainerInner>
    </Container>
  );
};

export default Details;
