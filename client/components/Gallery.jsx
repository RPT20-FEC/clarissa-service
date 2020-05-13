import React, { useState, useEffect, Component } from "react";
import {
  Route,
  useParams,
  Link,
  withRouter,
  useRouteMatch,
} from "react-router-dom";
import App from "./App.jsx";
import ImageView from "./ImageView.jsx";
import useFetchPhotos from "../utils/useFetchPhotos.js";

const Gallery = function () {
  let { id } = useParams();
  const photos = useFetchPhotos(id);

  return (
    <div className="gallery">
      {photos.length > 0 ? (
        photos.map((photo, index) => {
          return (
            <div key={photo._id} className={`photo-${index}`}>
              <Link to={`/${id}/image/${photo._id}`}>
                <img src={photo.url} alt={photo.description} />
              </Link>
            </div>
          );
        })
      ) : (
        <div>No photos</div>
      )}
    </div>
  );
};

export default Gallery;
