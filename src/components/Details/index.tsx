import { useState, useEffect, useRef, HtmlHTMLAttributes } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, ContainerInner, GoBackButton } from "../../styles/global";
import { ReactComponent as GoBackIcon } from "./../../images/arrow-left.svg";

type MyDataType = {
  name: string;
};

const Details = ({ data }: any) => {
  let history = useHistory();
  const container = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { id } = useParams() as any;
  const [counter, setCounter] = useState(0);
  const [character, setCharacter] = useState(id);
  const [episodes, setEpisodes] = useState<MyDataType[] | any>([]);
  const handleGoBack = () => {
    history.push("/");
  };

  const getEpisodeData = (urlData: string) => {
    if (!urlData) {
      container.current.innerHTML = `<strong>Loading...</strong>`;
    }

    fetch(urlData)
      .then((res) => res.json())
      .then((data: any) => {
        container.current.innerHTML += `<h4>${data.id} - ${data.name} - ${data.episode} - ${data.air_date}</h4>`;
      });
  };

  useEffect(() => {
    const characterStorage = localStorage.getItem("characterData");

    if (characterStorage) {
      setCharacter(JSON.parse(characterStorage));
    }

    const current = data.filter((item: any) => {
      if (item.id === Number(id)) {
        const { name, species, image, gender, status, type } = item;

        setCharacter({
          name,
          species,
          image,
          gender,
          status,
          episodes: item.episode.map((url: string) => getEpisodeData(url)),
          location: item.location.name,
          origin: item.origin.name,
          type,
        });

        setCounter(item.episode.length);
      }
      return null;
    });
    return current;
  }, []);

  useEffect(() => {
    localStorage.setItem("characterData", JSON.stringify(character));
  }, [character, episodes]);

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
              <strong>
                {counter > 1
                  ? "Episodes this character has been seen"
                  : "Unique episode this character has been seen"}
              </strong>
            </p>
            <div className="container" ref={container}></div>
          </article>
        </section>
      </ContainerInner>
    </Container>
  );
};

export default Details;
