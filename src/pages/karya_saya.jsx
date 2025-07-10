import { useState, useEffect } from "react";
import { Edit3, Trash2 } from "lucide-react";
import { message, notification } from "antd";
import { tambahKarya, getKaryaList } from "../util/api"; // Pastikan ada
import Swal from "sweetalert2";
// getKaryaList = GET ke /api/karya_seni

const HalamanKarya = () => {
  const [artworks, setArtworks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    fetchKaryaDariBackend();
  }, []);

  const fetchKaryaDariBackend = async () => {
    try {
      const data = await getKaryaList(); // Panggil API backend
      const karyaUserSendiri = data.filter((karya) => karya.user_id === currentUser?.id);
      console.log("DATA:", karyaUserSendiri);
      setArtworks(karyaUserSendiri);
    } catch (err) {
      message.error("Gagal memuat data karya dari server.");
    }
  };

  const resetForm = () => {
    setJudul("");
    setDeskripsi("");
    setImagePreview(null);
    setImageFile(null);
    setEditId(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleEdit = (art) => {
    setEditId(art.id);
    setJudul(art.judul_karya);
    setDeskripsi(art.deskripsi);
    setImagePreview(`http://127.0.0.1:5000/${art.link_foto}`);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Hapus Karya?",
      text: "Karya ini akan dihapus permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (confirm.isConfirmed) {
      try {
        await fetch(`http://127.0.0.1:5000/api/karya_seni/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        notification.success({ message: "Karya berhasil dihapus" });
        fetchKaryaDariBackend(); // Refresh data
      } catch (err) {
        message.error("Gagal menghapus karya.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!judul) {
      message.error("Judul wajib diisi.");
      return;
    }

    const formData = new FormData();
    formData.append("judul_karya", judul);
    formData.append("deskripsi", deskripsi);
    formData.append("link_whatsapp", `https://wa.me/${currentUser?.username}`);
    if (imageFile) {
      formData.append("link_foto", imageFile); // hanya kirim kalau user upload ulang
    }

    try {
      if (editId) {
        await fetch(`http://127.0.0.1:5000/api/karya_seni/${editId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        notification.success({ message: "Karya berhasil diubah" });
      } else {
        await tambahKarya(formData, token);
        notification.success({ message: "Karya berhasil ditambahkan" });
      }

      fetchKaryaDariBackend(); // Refresh data
      setShowModal(false);
      resetForm();
    } catch (err) {
      message.error("Gagal menyimpan karya.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Karya Saya</h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Tambah Karya
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {artworks.map((art) => (
          <div key={art.id} className="border rounded shadow overflow-hidden">
            <img src={`http://127.0.0.1:5000/${art.link_foto}`} alt={art.judul_karya} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{art.judul_karya}</h3>
              <p className="text-sm text-gray-500">{art.deskripsi}</p>
              <p className="text-sm text-gray-400 mt-1">Dibuat oleh: {art.artist || "Tidak diketahui"}</p>
            </div>
            <div className="mt-3 flex justify-between items-center p-5">
              {/* ❤️ Jumlah Like (Hanya Tampilan) */}
              <div className="flex items-center gap-1 text-gray-700 select-none">
                <span>{art.like_count || 0}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-red-500" viewBox="0 0 24 24">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 
                      2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 
                      4.13 2.44h1.74C14.09 5.01 
                      15.76 4 17.5 4 20 4 22 6 
                      22 8.5c0 3.78-3.4 6.86-8.55 
                      11.54L12 21.35z"
                  />
                </svg>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleEdit(art)} title="Edit">
                  <Edit3 className="w-5 h-5 text-blue-600 hover:text-blue-800" />
                </button>
                <button onClick={() => handleDelete(art.id)} title="Hapus">
                  <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="absolute top-3 right-4 text-gray-500 text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">{editId ? "Edit Karya" : "Tambah Karya"}</h3>
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium mb-1">Foto *</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="mb-3 block w-full" required={!editId} />
              {imagePreview && <img src={imagePreview} alt="Preview" className="h-40 mb-3 object-cover rounded" />}

              <label className="block text-sm font-medium mb-1">Judul *</label>
              <input type="text" className="w-full border px-3 py-2 rounded mb-3" value={judul} onChange={(e) => setJudul(e.target.value)} required />

              <label className="block text-sm font-medium mb-1">Deskripsi</label>
              <textarea className="w-full border px-3 py-2 rounded mb-3" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />

              <label className="block text-sm font-medium mb-1">Dibuat Oleh</label>
              <input type="text" className="w-full border px-3 py-2 rounded mb-3 bg-gray-100" value={currentUser?.username || "-"} readOnly />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HalamanKarya;
