// client/src/components/Card.jsx

import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/card.css";

function Card(props) {
  console.log(props.photos);
  const { _id, ...propsToSend } = props;
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  const handleClick = async () => {
    try {
      if (isFavorite) {
        const response = await axios.delete(
          "http://localhost:5500/api/favorite/del",
          { data: { props } }
        );
        props?.setLoading(true);
      } else {
        const response = await axios.post(
          "http://localhost:5500/api/favorite",
          propsToSend
        );
        setIsFavorite(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="card">
      <div class="content">
        <img id="post-image" src={props.photos[0]} alt="no content" />
        <h4>{props.title}</h4>
        <h6>
          <span>Date : </span> {props.date}
        </h6>
        <h6>
          <span>Location : </span> {props.location}
        </h6>
        <p>{props.text.slice(0, 60)}...</p>
        <Link to={`view/${props._id}`}>
          <button>Read More</button>
        </Link>
        <button onClick={handleClick}>
          {" "}
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
      </div>
    </div>
  );
}

export default Card;
