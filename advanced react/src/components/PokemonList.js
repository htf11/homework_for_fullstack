import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
        const pokemonsWithId = response.data.results.map((pokemon) => ({
          ...pokemon,
          id: pokemon.url.split("/")[6],
        }));
        setPokemons(pokemonsWithId);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="pokemon-list">
      <h1>Pokemon Encyclopedia</h1>
      <div className="grid">
        {pokemons.map((pokemon) => (
          <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id} className="card">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
            />
            <h3>{pokemon.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
