import styled from "styled-components";
import { Link } from "react-router-dom";

const GreenButtonBase = styled.button`
  padding: 15px 45px;
  background-color: #87c232;
  border: 0;
  border-radius: 5px;
  font-weight: 400;
  font-family: "Inter", sans-serif;
  transition: all 0.25s ease-out;
  z-index: 2;
  a {
    color: #fff;
    text-decoration: none;
  }
  &:hover {
    background-color: #6aa218;
    cursor: pointer;
    color: #d6d6d6;
  }
`;

function GreenButton({ text, onClick, href, style }) {
  return (
    <GreenButtonBase onClick={onClick} style={style}>
      <Link to={href}>{text}</Link>
    </GreenButtonBase>
  );
}

export default GreenButton;
