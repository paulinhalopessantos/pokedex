import React from "react";
import styled, { keyframes } from "styled-components";
import { useHistory } from "react-router-dom";
import { goToPokedexPage } from "../Routes/Coordinator";
import Pokeball from "../components/img/Pokeboll.png";

const Header = ({ leftButtonFunction, title, showRightButton, isTrue }) => {
  const history = useHistory();

  const leftButtonTitle = () => {
    switch (title) {
      case "Lista de Pokemons":
        return "Pokedex";
      case "Pokedex":
        return "Lista de Pokemons";
      default:
        return "Voltar";
    }
  };

  return (
    <HeaderPage>
      <LeftButton isTrue={isTrue} onClick={leftButtonFunction}>
        <img src={Pokeball} alt="pokeball" />
        {leftButtonTitle()}
      </LeftButton>

      <h1>{title}</h1>

      {showRightButton && (
        <RightButton onClick={() => goToPokedexPage(history)}>
          <img src={Pokeball} alt="pokeball" />
          Pokedex
        </RightButton>
      )}
    </HeaderPage>
  );
};

export default Header;

const spin = keyframes`
to {
  transform: rotate(360deg)
}
`;

const HeaderPage = styled.header`
  height: 70px;
  background: #d92525;
  width: 100%;
  top: 0;
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 1;

  & > h1 {
    margin: 0;
    font-size: 36px;
    font-weight: 600;
    color: #f7f7f7;
  }
`;

const LeftButton = styled.button`
  position: absolute;
  left: 20px;
  background-color: #f7f7f7;
  width: ${(props) => (props.isTrue ? "230px" : "150px")};
  height: 35px;
  text-align: right;
  padding-right: 18px;
  border-radius: 5px;
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.25);
  border-style: none;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  :hover {
    transition: all 0.3s ease-in;
    color: #de2222;
    img {
      animation: ${spin} 1s ease;
    }
  }

  & > img {
    width: 60px;
    cursor: pointer;
    position: absolute;
    top: -12px;
    left: 7px;
  }
`;

const RightButton = styled.button`
  position: absolute;
  right: 20px;
  background-color: #f7f7f7;
  width: 150px;
  height: 35px;
  text-align: left;
  padding-left: 18px;
  border-radius: 5px;
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.25);
  border-style: none;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  :hover {
    transition: all 0.3s ease-in;
    color: #de2222;
    img {
      animation: ${spin} 1s ease;
    }
  }

  & > img {
    width: 60px;
    cursor: pointer;
    position: absolute;
    top: -12px;
    right: 7px;
  }
`;
