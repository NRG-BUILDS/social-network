import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return <div className={`p-4 md:p-5 ${className}`}>{children}</div>;
};

export default Container;
