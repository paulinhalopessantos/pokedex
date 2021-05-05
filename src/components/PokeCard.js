import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { goToDetailsPage } from "../Routes/Coordinator";
import PokemonsContext from "../contexts/PokemonsContext";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 246px;
  height: 262px;
  align-items: center;
  justify-content: center;
  background-color: white;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-sizing: border-box;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  & > button:nth-child(1) {
    background-color: ${props => props.isDetail ? '#d92525' : '#22a940'};
  }

  & > button:nth-child(2) {
    background-color: #2299a9;
  }

  & > button {
    width: 102px;
    height: 40px;
    border-radius: 6px;
    margin: 5px;
    line-height: 1;
    color: white;
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    z-index: 1;

    &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    z-index: -2;
    
  }
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: rgba(255, 255, 255, .2);
    transition: all .4s;
    border-radius: 6px;
    z-index: -1;
  }
  &:hover {
    color: #fff;
    transition: .3s all ease;
    &:before {
      width: 100%;
    }
  }
  }
`;
const Card = styled.div`
background-color:${props => props.color};
  width: 204px;
  height: 167px;
  border-radius: 10px;
  padding: 5px;
  display: grid;
  justify-content: center;
  align-items: center;
  img {
    width: 150px;
  }
`;

const colorBg = {
  grass: "#96c44e",
  flying: "#b2babd",
  water: "#32bad9;",
  poison: "#b97fc9",
  fire: "#fd7d24",
  bug: "#729f3f",
  normal: "gray",
};

export const PokeCard = (props) => {
  const history = useHistory();
  const { pokemons, setPokemons, pokedex, setPokedex } = useContext(PokemonsContext)
  
  const addToPokedex = () => {
    const newPokedex = [...pokedex]
    newPokedex.push(props.pokemon)
        
    const pokemonsList = pokemons.filter(pkm => {
      return pkm.id !== props.pokemon.id
    })
    props.setPkmName(props.pokemon.name)
    props.setSprite(props.pokemon.sprites.other["official-artwork"].front_default)
    alertOpen()
    alertClose()
    
    setPokedex(newPokedex)
    setPokemons(pokemonsList)
  }

  const removeFromPokedex = () => {
    const newPokedex = [...pokedex]
    const removePokemon = pokedex.findIndex(pkm => {
      return pkm.id === props.pokemon.id
    })
    newPokedex.splice(removePokemon, 1)
    const pokemonsList = [...pokemons, props.pokemon].sort((a,b) => a.id -b.id)

    setPokedex(newPokedex)
    setPokemons(pokemonsList)
  }

  const alertOpen = () => {
    props.setAlert(true);
  };

  const alertClose = () => {
    setTimeout(() => props.setAlert(false), 3000);
  };

  return (
    <>
      <CardContainer>
        <Card color={colorBg[props.pokemon.types[0].type.name]}>
          <img
            src={props.pokemon.sprites.other["official-artwork"].front_default}
          />
        </Card>
        <ButtonContainer isDetail={props.isDetail}>
          <button onClick={props.isDetail ? removeFromPokedex : addToPokedex}>{props.isDetail ? 'Remover' : 'Adicionar na pokedex'}</button>
          <button onClick={() => {goToDetailsPage(history, props.pokemon.id)}}>
            Ver detalhes
          </button>
        </ButtonContainer>
      </CardContainer>
    </>
  );
};
export default PokeCard;
