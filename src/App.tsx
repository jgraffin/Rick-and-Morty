import React, { useEffect, useState } from "react";
import { allCharacters } from "./services";
import { Container } from "./styles/global";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cards from "./components/Card/Cards";
import CardItem from "./components/Card/CardItem";
import Details from "./components/Details";

type CharactersListType = {
  created: string;
  episode: [];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
};

const App: React.FC = () => {
  const [state, setState] = useState<CharactersListType[]>([]);

  useEffect(() => {
    function fetchData() {
      fetch(allCharacters).then(async (response) => {
        try {
          const data = await response.json();
          setState(data.results);
          console.log(data.results);
        } catch (error) {
          console.error("error", error);
        }
      });
    }
    fetchData();
  }, []);

  if (!state || !state.length) return <>Loading cards...</>;

  return (
    <Container>
      <Router>
        <Switch>
          <Route exact path="/characters">
            <Cards>
              {state.map((item) => {
                const { id, name, species, image, episode, gender, status } =
                  item;
                return (
                  <CardItem
                    key={id}
                    id={id}
                    name={name}
                    species={species}
                    location={JSON.stringify(item.location.name)}
                    image={image}
                    onClickDetails={`/character/detail/${id}`}
                    episodes={episode}
                    gender={gender}
                    status={status}
                  />
                );
              })}
            </Cards>
          </Route>
          <Route exact path="/character/detail/:id">
            <Details data={state} />
          </Route>
          <Redirect from="*" to="/characters" />
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
