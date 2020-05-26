import React, { useState, useEffect, Component } from "react";
import { Route, useParams, Link } from "react-router-dom";
import useFetchPhotos from "../utils/useFetchPhotos.js";

const Gallery = function () {
  let { id } = useParams();
  const { photos, isLoading } = useFetchPhotos(id);

  return (
    <div className="transition-container">
      <div className="gallery">
        {!isLoading ? (
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
          <div className="loading-state"></div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
