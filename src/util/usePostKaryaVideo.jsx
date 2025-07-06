import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
    try {
      const payload = {
        judul,
        link_youtube,
        link_thumbnail,
        deskripsi,
        dibuat_oleh,
      };

      const response = await fetch("http://127.0.0.1:5000/api/ruang_video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      setData(result);

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil disimpan!",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: result.message || "Terdapat kesalahan!",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      setError(err);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat mengirim data!",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const editKaryaVideo = async (id, values) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/ruang_video/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Gagal edit video:", error);
      return null;
    }
  };

  const deleteKaryaVideo = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/ruang_video/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Gagal hapus video:", error);
      return null;
    }
  };

  return {
    postKaryaVideo,
    editKaryaVideo,
    deleteKaryaVideo,
    data,
    loading,
    error,
  };
};
