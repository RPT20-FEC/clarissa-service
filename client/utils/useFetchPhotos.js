import { useState, useEffect } from "react";
import axios from "axios";

const useFetchPhotos = (id) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/listings/${id}/photos`);
        if (response.status === 200) {
          setPhotos(response.data);
        }
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, []);
  return { photos };
};

export default useFetchPhotos;
