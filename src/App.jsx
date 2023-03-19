import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./components/Card";
import Welcome from "./components/Welcome";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "3e51ff1c9dmsh64f450f68a9f0d2p1eab89jsnd06f3e5806bb",
      "X-RapidAPI-Host": "netflix54.p.rapidapi.com",
    },
  };

  const getMovies = async (movieName) => {
    const api = await fetch(
      `https://netflix54.p.rapidapi.com/search/?query=${movieName}&offset=0&limit_titles=50&limit_suggestions=20&lang=en`,
      options
    );
    const res = await api.json();
    console.log(res);
    setMovies(res.titles);
    setIsLoading(false);
  };

  useEffect(() => {
    getMovies("stranger");
  }, []);
  return (
    <div className="App">
      {isLoading ? (
        <Welcome />
      ) : (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault(), getMovies(search);
            }}
          >
            <input
              type="text"
              placeholder="Search a movie"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <div className="cards">
            {movies.map((movie) => {
              return <Card key={movie.summary.id} movie={movie} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
