import styled, { keyframes } from "styled-components";

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

export const Container = styled.div`
  display: block;
  margin: 4rem auto;
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
  padding: 8rem 0 2rem 3rem;
  position: relative;
  box-shadow: 0px 10px 28px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  min-height: 35rem;

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
        &:first-child {
          border: 0;
        }
      }
    }

    &:last-of-type {
      h3 {
        &:last-of-type {
          margin-top: 2rem;
        }
      }
    }

    &:nth-child(3) {
      ul.list-specification {
        &:hover {
          background-color: #f4f4f4;
        }
      }
    }

    ul.list-specification {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding: 0.5rem 1.5rem;
      grid-gap: 1rem;
      border: 1px dashed #ccc;
      border-radius: 8px;
      transition: ease-in-out 0.2s;
      margin-bottom: 0.5rem;

      &--head {
        border: 0;
        background-color: #f4f4f4;
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

    h3 {
      font-size: 1rem;
      background: hsl(185, 75%, 39%);
      display: block;
      padding: 1rem 1.5rem;
      border-radius: 90px;
      margin: 5rem 0 2rem;
      color: #ffffff;
    }

    .m-accordion {
      display: block;
      width: 100%;

      &__drop-down-menu {
        display: block;
        margin-bottom: 30px;

        p {
          margin: 6px 0;
          position: relative;

          + h5 {
            margin-top: 30px;
          }
        }
      }

      .menu-title {
        cursor: pointer;
        font-size: 1rem;
        background: hsl(185, 75%, 39%);
        display: block;
        padding: 1rem 1.5rem;
        border-radius: 90px;
        margin: 5rem 0 2rem;
        color: #ffffff;
      }

      @keyframes slideOpen {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .activate {
        animation: slideOpen ease-in-out 0.6s forwards;
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

        span {
          display: block;
          height: 20px;
          text-align: center;
          width: 100%;
        }
      }

      .activate:checked ~ .drop-down {
        animation: slideOpen ease-in-out 0.6s forwards;
        max-height: 100%;
        margin-top: 46px;
      }

      .activate {
        + .menu-title {
          background-image: url("/assets/images/icons/icon-down.svg");
          background-repeat: no-repeat;
          background-position: right center;
          background-size: 30px;
          transform: translateY(-15px);
        }

        &:checked {
          + .menu-title {
            background-image: url("/assets/images/icons/icon-up.svg");
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

    img {
      display: block;
      width: 24rem;
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
    width: 4rem;
    height: 4rem;
    background-color: #f4f4f4;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    border-radius: 90px;
    animation: ${scaleOut} ease-in-out 0.4s forwards;
  }

  &:hover {
    &::before {
      animation: ${scaleIn} ease-in-out 0.4s forwards;
    }
  }
`;
