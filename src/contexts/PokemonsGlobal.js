import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonsContext from "./PokemonsContext";

const PokemonsGlobal = (props) => {
  const [pokeName, setPokeName] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [pokedex, setPokedex] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
      .then((res) => {
        setPokeName(res.data.results);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (pokeName.length) {
      pokeName.forEach((item) => {
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${item.name}`)
          .then((res) => {
            setPokemons((prev) =>
              [...prev, res.data].sort((a, b) => a.id - b.id)
            );
          })
          .catch((err) => {});
      });
    }
  }, [pokeName]);

  const data = {
    pokemons,
    setPokemons,
    pokedex,
    setPokedex,
  };

  return (
    <PokemonsContext.Provider value={data}>
      {props.children}
    </PokemonsContext.Provider>
  );
};

export default PokemonsGlobal;
