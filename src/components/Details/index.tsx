import { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, ContainerInner, GoBackButton } from "../../styles/global";
import { ReactComponent as GoBackIcon } from "./../../images/arrow-left.svg";
import { CharactersListType } from "../../interface/CharactersListType";
import { EpisodesTypeProps } from "../../interface/EpisodesType";
import { LocationsTypeProps } from "../../interface/LocationsType";

const Details = ({ data }: any) => {
  let history = useHistory();
  const containerEpisodes = useRef() as React.MutableRefObject<HTMLDivElement>;
  const containerLocations = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [hasLocation, setHasLocation] = useState(false);
  const { id } = useParams() as any;
  const [counter, setCounter] = useState(0);
  const [character, setCharacter] = useState(id);

  const handleGoBack = () => {
    history.push("/");
  };

  const getUrlData = (urlData: string) => {
    try {
      fetch(urlData)
        .then((res) => res.json())
        .then(async (data: EpisodesTypeProps & LocationsTypeProps) => {
          if (data.air_date !== undefined) {
            containerEpisodes.current.innerHTML += `
              <ul class='list-specification'>
                <li>${data.name}</li>
                <li>${data.episode}</li>
                <li>${data.air_date}</li>
              </ul>
            `;
          }

          if (data.type !== undefined) {
            containerLocations.current.innerHTML += `
            <ul class='list-specification'>
              <li>${data.name}</li>
              <li>${data.dimension}</li>
              <li>${data.type}</li>
            </ul>`;
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getCharacterPropertyType = (type: string) => {
    return type ? character.type : "Not defined";
  };

  const switchTitleText = (size: boolean) => {
    return size
      ? "These are the episodes where the character has been seen"
      : "Episode where the character has been seen";
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

        if (character.episodes) {
          character.episodes.map((url: string) => getUrlData(url));
        }

        if (character.urlLocation) {
          setHasLocation(true);
          getUrlData(character.urlLocation);
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
                <span>{getCharacterPropertyType(character.type)}</span>
              </li>
            </ul>
            <figure>
              <img src={character.image} alt={character.name} />
            </figure>
          </article>
          <article>
            {counter > 1 ? (
              <div className="m-accordion">
                <div className="m-accordion__drop-down-menu">
                  <input
                    type="checkbox"
                    className="activate"
                    id="accordion"
                    name="accordion"
                  />
                  <label htmlFor="accordion" className="menu-title">
                    {switchTitleText(counter > 1)}
                  </label>
                  <div className="drop-down">
                    <ul className="list-specification list-specification--head has-list">
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
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h3>{switchTitleText(counter > 1)}</h3>
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
              </>
            )}
          </article>

          {hasLocation && (
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
          )}
        </section>
      </ContainerInner>
    </Container>
  );
};

export default Details;
