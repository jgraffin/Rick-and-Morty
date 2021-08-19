import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, ContainerInner, GoBackButton } from "../../styles/global";
import { ReactComponent as GoBackIcon } from "./../../images/arrow-left.svg";

const Details = ({ data }: any) => {
  let history = useHistory();
  const { id } = useParams() as any;
  const [character, setCharacter] = useState(id);
  const [episodes, setEpisodes] = useState([]);
  const handleGoBack = () => {
    history.push("/");
  };

  const getEpisodeData = (urlData: string) => {
    return new Promise((resolve, rejects) => {
      fetch(urlData)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
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
          location: item.location.name,
          origin: item.origin.name,
          type,
        });

        item.episode.map(async (url: string) => {
          try {
            const getData: any = await getEpisodeData(url);
            setEpisodes(getData);
          } catch (error) {
            console.error(error);
          }
        });
      }
      return null;
    });
    return current;
  }, []);

  useEffect(() => {
    localStorage.setItem("characterData", JSON.stringify(character));
    const dataUrl = episodes;
    console.log(dataUrl);
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
              <strong>Episodes</strong>
            </p>
            {/* <ul>{episodes}</ul> */}
          </article>
        </section>
      </ContainerInner>
    </Container>
  );
};

export default Details;
