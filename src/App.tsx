import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import BarLoader from "react-spinners/BarLoader";

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

const override = css`
  display: block;
  position: absolute;
  top: 50%;
  margin-top: -4px;
  left: 50%;
  margin-left: -50px;
`;

const App: React.FC = () => {
  const [loading] = useState(true);
  const [color] = useState("#ffffff");
  const [state, setState] = useState<CharactersListType[]>([]);
  const [page, setPage] = useState({
    currentPage: localStorage.getItem("currentPage")
      ? localStorage.getItem("currentPage")
      : 1,
  });

  const handleNext = () => {
    setPage({ currentPage: Number(page.currentPage) + 1 });
  };

  const handlePrev = () => {
    setPage({ currentPage: Number(page.currentPage) - 1 });
  };

  const handleFirstPage = () => {
    setPage({ currentPage: 1 });
  };

  const handleLastPage = () => {
    setPage({ currentPage: 34 });
  };

  useEffect(() => {
    const fetchPageData = () => {
      fetch(`${allCharacters}?page=${page.currentPage}`).then(
        async (response) => {
          const { results } = await response.json();
          if (results) {
            setState(results);
            localStorage.setItem("currentPage", String(page.currentPage));
          }
        }
      );
    };
    fetchPageData();
  }, [page.currentPage]);

  if (!state || !state.length)
    return <BarLoader color={color} loading={loading} css={override} />;

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
            {Number(page.currentPage) > 1 && (
              <>
                <PaginateButton className="prev" onClick={handlePrev}>
                  Prev
                </PaginateButton>
                <PaginateButton className="first" onClick={handleFirstPage}>
                  First
                </PaginateButton>
              </>
            )}
            {Number(page.currentPage) < 34 && (
              <>
                <PaginateButton className="next" onClick={handleNext}>
                  Next
                </PaginateButton>
                <PaginateButton className="last" onClick={handleLastPage}>
                  Last
                </PaginateButton>
              </>
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
