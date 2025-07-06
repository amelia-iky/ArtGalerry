import { useState, useEffect } from "react";

export const useFetchKaryaVideo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKaryaVideos = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/ruang_video");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
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
