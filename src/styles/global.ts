import styled, { keyframes } from "styled-components";
import chevron from "../images/chevron.svg";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleOut = keyframes`
  from {
    opacity: 1;
    transform: scale(3);
  }
  to {
    opacity: 0;
    transform: scale(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(3);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  display: block;
  margin: 3rem auto;
  width: 100%;

  @media (min-width: 769px) {
    width: 750px;
  }

  @media (min-width: 992px) {
    width: 970px;
  }

  @media (min-width: 1200px) {
    width: 1170px;
  }
`;

export const ContainerInner = styled.div`
  animation: ${slideIn} ease-in-out 0.4s forwards;
  display: block;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 5rem 0 2rem 3rem;
  position: relative;
  box-shadow: 0px 10px 28px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  h1 {
    display: block;
    font-size: 2rem;
    margin: 2.5rem 0 1rem 0;
    color: hsl(185, 75%, 39%);
    width: 100%;
  }

  section {
    display: flex;
    flex-direction: column;
  }

  article {
    display: block;
    padding-right: 2.5rem;

    &:first-of-type {
      ul.list-specification {
        width: 800px;

        &:first-child {
          border: 0;
        }
      }
    }

    &:last-of-type {
      ul.list-specification {
        animation: ${fadeIn} ease-in-out 0.4s forwards;
      }

      h3 {
        margin-bottom: 1rem;
        &:last-of-type {
          margin-top: 1rem;
        }
      }
    }

    &:nth-child(3) {
      ul.list-specification {
        &:hover {
          background-color: #f4f4f4;
        }

        &--head {
          &.has-list {
            &::before,
            &::after {
              content: "";
              height: 30px;
              width: 99%;
              background: linear-gradient(
                to bottom,
                rgba(255, 255, 255, 1) 0%,
                rgba(255, 255, 255, 0) 100%
              );
              position: absolute;
              bottom: -36px;
              left: 0;
            }

            &::after {
              bottom: auto;
              top: 180px;
              background: linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 1) 100%
              );
            }
          }
        }
      }
    }

    ul.list-specification {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding: 0.5rem 1.5rem;
      grid-gap: 0.5rem;
      border: 1px dashed #ccc;
      border-radius: 8px;
      transition: ease-in-out 0.2s;
      margin-bottom: 0.5rem;

      &--head {
        border: 0;
        background-color: #f4f4f4;
        position: relative;
      }

      li {
        line-height: 1.4;
        font-size: 0.8rem;

        strong {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
        }
      }
    }

    h3,
    .menu-title {
      font-size: 1rem;
      background-color: hsl(185, 75%, 39%);
      display: block;
      padding: 1rem 1.5rem;
      border-radius: 90px;
      margin: 5rem 0 1rem;
      color: #ffffff;
      font-weight: 700;
    }

    .m-accordion {
      display: block;
      width: 100%;

      &__drop-down-menu {
        display: block;
      }

      .menu-title {
        cursor: pointer;
        margin: 5rem 0 0;
        position: relative;
        z-index: 2;
      }

      .activate {
        animation: ${slideIn} ease-in-out 0.4s forwards;
        display: none;
        position: absolute;
        cursor: pointer;
        width: 100%;
        margin: 0 0 0 -15px;
      }

      .drop-down {
        max-height: 0;
        overflow: hidden;
        transition: ease-in-out 0.3s;
        z-index: 1;

        span {
          display: block;
          height: 20px;
          text-align: center;
          width: 100%;
        }

        .container {
          overflow-y: scroll;
          overflow-x: hidden;
          height: 170px;
          padding: 2rem 1rem 4rem 0;
        }
      }

      .activate:checked ~ .drop-down {
        animation: ${slideIn} ease-in-out 0.6s forwards;
        max-height: 210px;
      }

      .activate {
        + .menu-title {
          transform: translateY(-15px);
          padding-left: 60px;
          position: relative;

          &::before {
            content: "";
            width: 30px;
            height: 30px;
            position: absolute;
            left: 17px;
            top: 10px;
            background-image: url(${chevron});
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            transition: ease-in-out 0.3s;
          }
        }

        &:checked {
          + .menu-title {
            &::before {
              transform: rotate(-180deg);
            }
          }
        }

        .drop-down,
        .menu a,
        .m-accordion__drop-down-menu {
          -webkit-transition: $cubic-bezier;
          -moz-transition: $cubic-bezier;
          -o-transition: $cubic-bezier;
          transition: $cubic-bezier;
        }

        .m-accordion__drop-down-menu {
          border-bottom: 1px solid darken(#000000, 2);

          &:last-of-type {
            border-bottom: 0;
          }
        }

        @supports (-ms-ime-align: auto) {
          .m-accordion__drop-down-menu {
            &::after {
              display: none;
            }
          }
        }
      }
    }

    figure {
      position: absolute;
      right: 0;
      top: 0;
      border-bottom-left-radius: 45px;
      overflow: hidden;
      cursor: pointer;

      &:hover {
        img {
          opacity: 0.8;
        }
      }

      img {
        transition: ease-in-out 0.3s;
        display: block;
        width: 18rem;
      }
    }
  }
`;

export const GoBackButton = styled.button`
  display: inline-block;
  padding: 0.4rem 0.6rem;
  border: 0;
  width: 4rem;
  height: 4rem;
  position: absolute;
  top: 0;
  left: 0;
  margin: 2rem;
  background-color: transparent;
  cursor: pointer;
  border-radius: 90px;

  svg {
    position: relative;
    z-index: 2;
  }

  &::before {
    content: "";
    width: 3.5rem;
    height: 2.5rem;
    background-color: #f4f4f4;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    border-top-left-radius: 90px;
    border-top-right-radius: 90px;
    border-bottom-right-radius: 90px;
    animation: ${scaleOut} ease-in-out 0.4s forwards;
  }

  &:hover {
    &::before {
      animation: ${scaleIn} ease-in-out 0.4s forwards;
    }
  }
`;

export const PaginateButton = styled.button`
  width: 70px;
  height: 70px;
  background-color: #222222;
  position: fixed;
  top: 50%;
  margin-top: -35px;
  z-index: 1;
  border-radius: 90px;
  border: 0;
  color: #f4f4f4;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  cursor: pointer;
  transition: ease-in-out 0.3s;
  z-index: 5;

  &.prev {
    left: 50px;
  }

  &.next {
    right: 50px;
  }

  &.first,
  &.last {
    width: 50px;
    height: 50px;
    font-size: 0.7rem;
    background-color: crimson;
  }

  &.first {
    left: 60px;
    margin-top: 45px;
  }

  &.last {
    right: 60px;
    margin-top: 45px;
  }

  &:hover {
    transform: scale(1.2);
  }
`;

export const Modal = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  position: fixed;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;

  .modal-content {
    animation: ${slideIn} ease-in-out 0.3s forwards;
    width: 600px;
    display: block;
    padding: 2rem;
    border-radius: 12px;
    background-color: #ffffff;
    margin: 0 2rem;
    position: relative;

    figure {
      display: block;
      width: 100%;

      img {
        width: 100%;
        display: block;
      }
    }
  }
`;

export const CloseModal = styled.button`
  width: 4rem;
  height: 4rem;
  background-color: #222222;
  position: absolute;
  right: -1.8rem;
  top: -1.8rem;
  border-radius: 90px;
  border: 0;
  transition: ease-in-out 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;
