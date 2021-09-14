import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Item = styled.li`
  min-width: 10rem;
  display: flex;
  flex-direction: column;

  .item__button {
    color: #222222;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    border: 0;
    position: relative;
    background-color: #ffffff;
    transition: ease-in-out 0.2s;
    text-decoration: none;
    min-height: 19rem;

    &::before {
      width: 100%;
      height: 6rem;
      content: "";
      display: block;
      position: absolute;
      top: -2px;
      left: 0;
      z-index: 1;
      background-color: #222;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      box-shadow: inset 0 -44px 32px rgba(0, 0, 0, 0.6);
    }

    &__image {
      display: block;
      overflow: hidden;
      width: 5rem;
      height: 5rem;
      border-radius: 90px;
      position: relative;
      z-index: 2;
      margin-top: 3rem;
      margin-bottom: 1rem;
      background: #f4f4f4;

      img {
        display: block;
        width: 100%;
        border-radius: 90px;
        transition: ease-in-out 0.4s;
        will-change: contents;
        animation: ${fadeIn} ease-in-out 0.2s forwards;
      }
    }

    &:hover {
      transform: translateY(-0.2rem);
      box-shadow: 0px 10px 28px rgba(0, 0, 0, 0.4);

      img {
        transform: scale(1.1);
      }
    }

    &__title {
      display: block;
      margin-bottom: 0.4rem;
      padding: 0 1rem;
      text-align: center;

      h2 {
        font-weight: 300;
        font-size: 0.8rem;

        strong {
          font-weight: 700;
        }
      }
    }

    &__location {
      p {
        font-weight: 300;
        font-size: 0.7rem;
        letter-spacing: 0.05rem;
      }
    }

    &__overall {
      display: block;
      width: 100%;

      ul {
        border-top: 1px solid #f4f4f4;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 1rem 2rem 1rem 2rem;
        margin-top: 1rem;

        li {
          display: flex;
          flex-direction: column;
          line-height: 1.8;
          text-align: center;

          strong {
            text-transform: uppercase;
            font-size: 0.7rem;
            letter-spacing: 0.05rem;
            color: hsl(185, 75%, 39%);
          }

          span {
            font-size: 0.6rem;
            letter-spacing: 0.1rem;
          }
        }
      }
    }
  }
`;

export const CardWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  will-change: unset;
`;
