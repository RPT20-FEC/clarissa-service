import { useState, useEffect } from "react";
import axios from "axios";

const useFetchPhotos = (id) => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://18.144.125.169/listings/${id}/photos`
        );
        if (response.status === 200) {
          setPhotos(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, []);
  return [{ photos, isLoading }];
};

export default useFetchPhotos;
