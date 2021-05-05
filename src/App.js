import React from "react";
import PokemonsGlobal from "./contexts/PokemonsGlobal";
import Router from "./Routes/Router";

const App = () => {
  return (
    <PokemonsGlobal>
      <Router />
    </PokemonsGlobal>
  )
};

export default App;
