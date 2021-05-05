import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import Pokedex from "../components/img/Pokedex.jpg";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  width: 100%;
  height: 100vh;
  background-image: url(${Pokedex});
`;

const PhotoContainer = styled.div`
  margin-top: 30px;

  & > div:nth-child(1) {
    display: flex;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
    height: 200px;
    margin: 50px;
    width: 200px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  & > div:nth-child(2) {
    display: flex;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
    height: 200px;
    margin: 50px;
    width: 200px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: 1px solid white;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  height: 450px;
  margin-top: 80px;
  border-radius: 10px;
  font-weight: 600;
  background-color: white;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  span:nth-child(1) {
    font-weight: bold;

    span {
      margin-left: 3px;
    }
  }

  span:nth-child(2) {
    margin-left: 5px;
  }

  p {
    margin: 10px;
    margin-top: 30px;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 12px;
`;
const TypeMovesContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 55px;

  & > div:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    margin: 20px;
    width: 450px;
    display: flex;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);

    & > p {
      margin: 20px;
      font-size: 20px;
      background-color: ${(props) => props.color};
    }
  }

  & > div:nth-child(2) {
    height: 300px;
    margin: 20px;
    width: 450px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);

    & > p {
      margin: 10px;
      font-size: 20px;
    }
  }
`;

const DetailsPage = () => {
  const history = useHistory();
  const params = useParams();
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
      .then((res) => {
        setPokemon(res.data);
      })
      .catch(() => {});
  }, []);

  const getMovesNames = () => {
    let nameMove =
      pokemon.moves &&
      pokemon.moves.map((move) => {
        return move.move.name;
      });

    let moveNames = [];
    moveNames = nameMove;

    return [moveNames];
  };

  const getSelectedMoves = () => {
    let selectedMoves = [];

    for (let i = 0; i <= 5; i++) {
      pokemon.moves && selectedMoves.push(getMovesNames()[0][i]);
    }
    const componentsSelected = selectedMoves.map((move) => {
      return <p>{move}</p>;
    });

    return componentsSelected;
  };

  const getTypes = () => {
    let pokemonsType =
      pokemon.types &&
      pokemon.types.map((type) => {
        return <p>{type.type.name}</p>;
      });

    return pokemonsType;
  };

  getTypes();
  return (
    <>
      <Header leftButtonFunction={() => history.goBack()} showRightButton />
      <GridContainer>
        <PhotoContainer>
          <div>
            <img
              alt="foto"
              src={pokemon.sprites && pokemon.sprites.front_default}
            />
          </div>
          <div>
            <img
              alt="foto"
              src={pokemon.sprites && pokemon.sprites.back_default}
            />
          </div>
        </PhotoContainer>
        <StatsContainer>
          <TitleContainer>
            <h1>Poderes</h1>
          </TitleContainer>
          <div>
            {pokemon.stats &&
              pokemon.stats.map((stat) => {
                return (
                  <p key={stat.stat.name}>
                    <span>
                      {stat.stat.name}
                      <span>:</span>
                    </span>
                    <span>{stat.base_stat}</span>
                  </p>
                );
              })}
          </div>
        </StatsContainer>
        <TypeMovesContainer>
          <div>{getTypes()}</div>
          <div>
            <TitleContainer>
              <h1>Principais movimentos</h1>
            </TitleContainer>
            {getSelectedMoves()}
          </div>
        </TypeMovesContainer>
      </GridContainer>
    </>
  );
};

export default DetailsPage;
