import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { notification } from "antd";

export const usePostKaryaVideo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const postKaryaVideo = async (judul, link_youtube, link_thumbnail, deskripsi, dibuat_oleh) => {
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
        notification.success({
          message: "Berhasil",
          description: "Video berhasil ditambahkan!",
        });

        return {
          id: result.id,
          title: judul,
          youtubeLink: link_youtube,
          thumbnail: link_thumbnail,
          description: deskripsi,
          dibuat_oleh,
        };
      } else {
        notification.error({
          message: "Gagal",
          description: result.message || "Terdapat kesalahan!",
        });
      }
    } catch (err) {
      setError(err);
      notification.error({
        message: "Gagal",
        description: "Terjadi kesalahan saat mengirim data!",
      });
    } finally {
      setLoading(false);
    }

    return null;
  };

  const editKaryaVideo = async (id, values) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/ruang_video/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      return await response.json();
    } catch (error) {
      console.error("Gagal edit video:", error);
      return null;
    }
  };

  const deleteKaryaVideo = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/ruang_video/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
