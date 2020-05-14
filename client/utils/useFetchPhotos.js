import { useState, useEffect } from "react";

const useFetchPhotos = (id) => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/listings/${id}/photos`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPhotos(result);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  return photos;
};

export default useFetchPhotos;
