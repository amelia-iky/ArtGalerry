import { useEffect, useState } from "react";
import { Button, Card, Modal, Form, Input, message, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Edit3, Trash2 } from "lucide-react";

const { TextArea } = Input;

const DokumentasiVideo = () => {
  const [showForm, setShowForm] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [likedVideos, setLikedVideos] = useState({});
  const [editingVideo, setEditingVideo] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedVideos = JSON.parse(localStorage.getItem("videoList")) || [];
    const storedLikes = JSON.parse(localStorage.getItem("likedVideos")) || {};
    setVideoList(storedVideos);
    setLikedVideos(storedLikes);
  }, []);

  const saveToLocalStorage = (videos, likes) => {
    localStorage.setItem("videoList", JSON.stringify(videos));
    localStorage.setItem("likedVideos", JSON.stringify(likes));
    setVideoList(videos);
    setLikedVideos(likes);
  };

  const handleFinish = (values) => {
    let updatedList;
    if (editingVideo) {
      updatedList = videoList.map((vid) => (vid.id === editingVideo.id ? { ...editingVideo, ...values } : vid));
      notification.success({
        message: "Video Diperbarui",
        description: `Video "${values.title}" berhasil diperbarui.`,
        placement: "topRight",
      });
    } else {
      const newVideo = {
        id: Date.now(),
        views: 0,
        likes: 0,
        ...values,
      };
      updatedList = [newVideo, ...videoList];
      notification.success({
        message: "Video Ditambahkan",
        description: `Video "${values.title}" berhasil ditambahkan.`,
        placement: "topRight",
      });
    }

    saveToLocalStorage(updatedList, likedVideos);
    setShowForm(false);
    form.resetFields();
    setEditingVideo(null);
  };

  const handleDelete = (id) => {
    const filtered = videoList.filter((v) => v.id !== id);
    const newLikes = { ...likedVideos };
    delete newLikes[id];
    saveToLocalStorage(filtered, newLikes);
    notification.success({
      message: "Video Dihapus",
      description: "Video berhasil dihapus.",
      placement: "topRight",
    });
  };

  const handleEdit = (video) => {
    form.setFieldsValue(video);
    setEditingVideo(video);
    setShowForm(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dokumentasi Video</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setShowForm(true);
            form.resetFields();
            setEditingVideo(null);
          }}
        >
          Tambah Video
        </Button>
      </div>

      {videoList.length === 0 ? (
        <Card className="py-12 text-center">
          <p className="text-gray-500 mb-4">Anda belum memiliki video dokumentasi</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {videoList.map((video) => (
            <Card
              key={video.id}
              cover={
                <a href={video.youtubeLink} target="_blank" rel="noopener noreferrer">
                  <img src={video.thumbnail} alt={video.title} className="h-48 w-full object-cover" />
                </a>
              }
              className="shadow-md"
              actions={[
                <Edit3 className="w-5 h-5 text-blue-600 hover:text-blue-800 mx-auto" onClick={() => handleEdit(video)} />,
                <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800 mx-auto" onClick={() => handleDelete(video.id)} />,
              ]}
            >
              <h3 className="font-bold">{video.title}</h3>
              <p className="text-sm text-gray-600">Oleh: {video.creator}</p>
              <p className="text-sm text-gray-500">{video.description}</p>

              {/* ❤️ Tampilan Like di kanan */}
              <div className="flex justify-end items-center mt-3 text-base text-gray-800 select-none">
                <span className="mr-1">{video.likes || 0}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-red-500" viewBox="0 0 24 24">
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
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={showForm}
        onCancel={() => {
          setShowForm(false);
          setEditingVideo(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        title={editingVideo ? "Edit Video Dokumentasi" : "Tambah Video Dokumentasi"}
        okText="Simpan Video"
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="title" label="Judul Video" rules={[{ required: true }]}>
            <Input placeholder="Masukkan judul video" />
          </Form.Item>
          <Form.Item name="creator" label="Dibuat Oleh" rules={[{ required: true }]}>
            <Input placeholder="Nama pembuat" />
          </Form.Item>
          <Form.Item name="youtubeLink" label="Link YouTube" rules={[{ required: true }]}>
            <Input placeholder="https://www.youtube.com/watch?v=..." />
          </Form.Item>
          <Form.Item name="thumbnail" label="Link Thumbnail" rules={[{ required: true }]}>
            <Input placeholder="https://img.youtube.com/vi/xxx/0.jpg" />
          </Form.Item>
          <Form.Item name="description" label="Deskripsi">
            <TextArea rows={3} placeholder="Deskripsi video" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DokumentasiVideo;
