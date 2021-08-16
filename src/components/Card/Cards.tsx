import { ReactNode } from "react";
import { CardWrapper } from "./styles";

type CardsProps = { children: ReactNode };

const Cards = ({ children }: CardsProps) => {
  return <CardWrapper>{children}</CardWrapper>;
};

export default Cards;
