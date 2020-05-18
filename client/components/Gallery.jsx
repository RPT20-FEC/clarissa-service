import React, { useState, useEffect, Component } from "react";
import { Route, useParams, Link } from "react-router-dom";
import useFetchPhotos from "../utils/useFetchPhotos.js";

const Gallery = function () {
  let { id } = useParams();
  const photos = useFetchPhotos(id).photos;

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
        <div className="no-photos-message">No photos</div>
      )}
    </div>
  );
};

export default Gallery;
