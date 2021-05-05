import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { goToHomePage } from "../Routes/Coordinator";
import Header from "../components/Header";
import styled from "styled-components";
import PokeCard from "../components/PokeCard"
import Pokedex from "../components/img/Pokedex.jpg";
import PokemonsContext from "../contexts/PokemonsContext";
import Tilt from "react-parallax-tilt"

const GridCardContainer = styled.div`
  background-image: url(${Pokedex});
  background-attachment: scroll;
  background-repeat: repeat;
  background-size: cover;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 15px;
  row-gap: 30px;
  justify-items: center;
  padding: 20px;
  height: 100vh;
`;

const PokedexPage = () => {
  const history = useHistory();
  const [isTrue, setIsTrue] = useState(false)
  useEffect(() => {
    setIsTrue(true)
  }, [])

  const {pokedex} = useContext(PokemonsContext)

  return (
    <div>
      <Header
        isTrue={isTrue}
        title={"Pokedex"}
        leftButtonFunction={() => goToHomePage(history)}
      />
      <GridCardContainer>
      {pokedex &&
          pokedex.map((poke) => {
            return (
              <Tilt key={poke.id}>
                <PokeCard isDetail={isTrue} pokemon={poke} id={poke.id} />
              </Tilt>
            );
          })}
      </GridCardContainer>
    </div>
  );
};

export default PokedexPage;
