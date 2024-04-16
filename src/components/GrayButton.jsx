import styled from "styled-components";
import { Link } from "react-router-dom";

const GrayButtonBase = styled.button`
  padding: 15px 45px;
  background-color: #17191a;
  border: 0;
  border-radius: 5px;
  font-weight: 400;
  font-family: "Inter", sans-serif;
  transition: all 0.25s ease-out;
  z-index: 2;
  a {
    color: #87c232;
    text-decoration: none;
  }
  &:hover {
    background-color: #2d2f31;
    cursor: pointer;
  }
`;

function GrayButton({ text, onClick, href }) {
  return (
    <GrayButtonBase onClick={onClick}>
      <Link to={href}>{text}</Link>
    </GrayButtonBase>
  );
}

export default GrayButton;
