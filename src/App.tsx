import React, { useEffect, useState } from "react";
import { allCharacters } from "./services";
import { Container, PaginateButton } from "./styles/global";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cards from "./components/Card/Cards";
import CardItem from "./components/Card/CardItem";
import Details from "./components/Details";
import { CharactersListType } from "./interface/CharactersListType";

const App: React.FC = () => {
  const [state, setState] = useState<CharactersListType[]>([]);
  const [page, setPage] = useState(0);

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrev = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    const fetchPageData = () => {
      fetch(`${allCharacters}?page=${page}`).then(async (response) => {
        const { results } = await response.json();
        setState(results);
      });
    };
    fetchPageData();
  }, [page]);

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
            {page > 1 && (
              <PaginateButton className="prev" onClick={handlePrev}>
                Prev
              </PaginateButton>
            )}
            {page < 34 && (
              <PaginateButton className="next" onClick={handleNext}>
                Next
              </PaginateButton>
            )}
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
