import { useState, useEffect } from "react";
import { Edit3, Trash2 } from "lucide-react";
import { message, notification } from "antd";
import { tambahKarya, getKaryaList } from "../util/api"; // Pastikan ada
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!judul || !imageFile) {
      message.error("Judul dan gambar wajib diisi.");
      return;
    }

    const formData = new FormData();
    formData.append("judul_karya", judul);
    formData.append("deskripsi", deskripsi);
    formData.append("link_foto", imageFile);
    formData.append("link_whatsapp", `https://wa.me/${currentUser?.username}`);

    try {
      await tambahKarya(formData, token);
      notification.success({
        message: "Karya berhasil ditambahkan",
        placement: "topRight",
      });

      fetchKaryaDariBackend(); // Refresh data dari server
      setShowModal(false);
      resetForm();
    } catch (err) {
      message.error("Gagal menambahkan karya.");
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
