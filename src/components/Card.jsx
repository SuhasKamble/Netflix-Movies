import React from "react";

const Card = ({ movie }) => {
  return (
    <div className="card">
      <img src={movie.jawSummary.backgroundImage.url} alt="" />
      <h2>{movie.jawSummary.title}</h2>
      <p>{movie.jawSummary.currentContextualSynopsis.text}</p>
    </div>
  );
};

export default Card;
