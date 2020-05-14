import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Gallery from "./Gallery.jsx";
import App from "./App.jsx";
import useFetchPhotos from "../utils/useFetchPhotos.js";

const ImageView = function () {
  let { id, photoId } = useParams();
  const photos = useFetchPhotos(id);

  return (
    <div className="slideshow">
      {photos.map((photo, index) => {
        return (
          photo._id === photoId && (
            <React.Fragment>
              <div className="main-image">
                <button>
                  <i class="material-icons">keyboard_arrow_left</i>
                </button>
                <img key={photo._id} src={photo.url} alt={photo.description} />
                <button>
                  <i class="material-icons">keyboard_arrow_right</i>
                </button>
              </div>
              <div className="sidebar">
                <p>
                  {index + 1}/{photos.length + 1}
                </p>
                <p>{photo.description}</p>
              </div>
            </React.Fragment>
          )
        );
      })}
    </div>
  );
};

export default ImageView;
