import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { goToPokedexPage } from "../Routes/Coordinator";
import styled from "styled-components";
import PokeCard from "../components/PokeCard";
import Header from "../components/Header";
import Pokedex from "../components/img/Pokedex.jpg";
import AgPokedex from "../components/img/Pokédex1.png";
import PokemonsContext from "../contexts/PokemonsContext";
import Tilt from "react-parallax-tilt";

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
`;

const AlertSuccess = styled.div`
  position: fixed;
  color: #f4f4f4;
  font-weight: 600;
  border-radius: 10px;
  top: 20px;
  background-color: #4caf50;
  width: 400px;
  text-align: center;
  padding: 10px;
  left: 50%;
  transform: translateX(-50%);
  transition: .6s;
  box-shadow: 0 2px 2px 0 rgba(131, 19, 122, 0.618);
  z-index: 9999;

  h3 {
    margin-bottom: 5px;
  }

  div {
    position: relative;

    img {
      width: 250px;
    }

    img:nth-child(2) {
      position: absolute;
      width: 70px;
      left: 30%;
      top: 57px;
      transform: rotate(24deg);
    }

    p {
      position: absolute;
      left: 57.5%;
      top: 104px;
      transform: rotate(19deg);
      font-size: 11px; 
      height: 22px;
      width: 74px;
      display:flex;
      align-items: center;
      justify-content: center;
    }
  } 
`



const HomePage = () => {
  const history = useHistory();
  const { pokemons } = useContext(PokemonsContext);
  const [alert, setAlert] = useState(false)
  const [alertPokeName, setAlertPokeName] = useState('')
  const [sprite, setSprite] = useState('')

  const alertAddPokemon = (<>
  <AlertSuccess>
    <h3>Pokémon adicionado com sucesso!</h3>
    <div>
      <img src={AgPokedex} alt="pokedex" />
      <img src={sprite} alt="pokemon" />
      <p>{alertPokeName}</p>
    </div>
  </AlertSuccess>
  </>)

  return (
    <div>
      {alert && alertAddPokemon}
      <Header
        title={"Lista de Pokemons"}
        leftButtonFunction={() => goToPokedexPage(history)}
      />

      <GridCardContainer>
        
        {pokemons &&
          pokemons.map((poke) => {
            return (
              <Tilt key={poke.id}>
                <PokeCard setAlert={setAlert} setPkmName={setAlertPokeName} setSprite={setSprite}  pokemon={poke} id={poke.id} />
              </Tilt>
            );
          })}
      </GridCardContainer>
    </div>
  );
};

export default HomePage;
