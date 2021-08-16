import styled from "styled-components";

export const Home = styled.div`
  display: block;
  height: 300px;
  width: 100%;
  background: gray;

  ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    margin: 4rem auto;

    li {
      img {
        display: block;
        width: 100%;
      }
    }
  }
`;
