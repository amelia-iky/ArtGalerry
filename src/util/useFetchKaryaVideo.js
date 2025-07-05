import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchKaryaVideo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKaryaVideos = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/ruang_video"
        );

        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchKaryaVideos();
  }, []);

  return { data, loading, error };
};
