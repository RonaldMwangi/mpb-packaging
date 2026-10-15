import type { ReactNode } from "react";
import "./Navbar.css";

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps) {
  return <div className="container">{children}</div>;
}

export default Container;
