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
            <React.Fragment key={photo._id}>
              <div className="main-image">
                {index !== 0 ? (
                  <Link to={`/${id}/image/${photos[index - 1]._id}`}>
                    <i className="material-icons">keyboard_arrow_left</i>
                  </Link>
                ) : (
                  <i className="material-icons md-inactive">
                    keyboard_arrow_left
                  </i>
                )}
                <img key={photo._id} src={photo.url} alt={photo.description} />
                {index !== photos.length - 1 ? (
                  <Link to={`/${id}/image/${photos[index + 1]._id}`}>
                    <i className="material-icons">keyboard_arrow_right</i>
                  </Link>
                ) : (
                  <i className="material-icons md-inactive">
                    keyboard_arrow_right
                  </i>
                )}
              </div>
              <div className="sidebar">
                <Link to={`/${id}/`} className="sidebar-link">
                  <i className="material-icons">close</i>
                </Link>
                <p className="counter">
                  {index + 1} / {photos.length}
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
