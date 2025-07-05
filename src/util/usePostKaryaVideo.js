import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const usePostKaryaVideo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const postKaryaVideo = async (
    judul,
    link_youtube,
    link_thumbnail,
    deskripsi,
    dibuat_oleh
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/ruang_video",
        {
          judul,
          link_youtube,
          link_thumbnail,
          deskripsi,
          dibuat_oleh,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        // Set data to state
        setData(response.data);

        // Alert success
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil disimpan!",
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (response.status === 400) {
        // Alert error
        Swal.fire({
          icon: "error",
          title: "Gagal Memuat Data",
          text: "Terdapat kesalahan pada data yang dimasukkan!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      setError(error);
      // Handle error
      if (axios.isAxiosError(error && error.response)) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terdapat kesalahan!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { postKaryaVideo, data, loading, error };
};
