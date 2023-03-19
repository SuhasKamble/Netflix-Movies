import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./components/Card";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

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
  };

  useEffect(() => {
    getMovies("stranger");
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="App">
      {/* <h2>Search a movie</h2> */}
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
    </div>
  );
}

export default App;
