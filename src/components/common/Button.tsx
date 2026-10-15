interface ButtonProps {
  children: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return <button className="btn-primary">{children}</button>;
};

export default Button;
