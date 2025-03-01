import { ReactNode } from "react";
import { useNavigate } from "react-router";

type Props = {
  children: ReactNode;
};
export const BackButton = ({ children }: Props) => {
  const nav = useNavigate();
  const goBack = () => {
    nav(-1);
  };
  return <button onClick={goBack}>{children}</button>;
};
