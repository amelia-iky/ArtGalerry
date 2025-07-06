import { useEffect, useState } from "react";
import { Button, Card, Modal, Form, Input, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Edit3, Trash2 } from "lucide-react";
const { TextArea } = Input;

import { usePostKaryaVideo } from "../util/usePostKaryaVideo.jsx";
import { useFetchKaryaVideo } from "../util/useFetchKaryaVideo.jsx";

const DokumentasiVideo = () => {
  const [showForm, setShowForm] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [editingVideo, setEditingVideo] = useState(null);
  const [form] = Form.useForm();

  const { postKaryaVideo } = usePostKaryaVideo();
  const { data } = useFetchKaryaVideo();

  useEffect(() => {
    if (data) {
      setVideoList(data);
    }
  }, [data]);

  const handleFinish = async (values) => {
    const token = localStorage.getItem("token");

    if (editingVideo) {
      // PUT request untuk edit video
      const res = await fetch(
        `http://localhost:5000/api/ruang_video/${editingVideo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );

      const result = await res.json();

      if (res.ok) {
        const updatedList = videoList.map((vid) =>
          vid.id === editingVideo.id ? { ...vid, ...values } : vid
        );
        setVideoList(updatedList);

        notification.success({
          message: "Video Diperbarui",
          description: result.message,
        });

        // Trigger update untuk RuangVideo
        window.dispatchEvent(new Event("video-updated"));
      } else {
        notification.error({
          message: "Gagal Memperbarui",
          description: result.message || "Terjadi kesalahan.",
        });
      }
    } else {
      await postKaryaVideo(
        values.judul,
        values.link_youtube,
        values.link_thumbnail,
        values.deskripsi || "",
        values.dibuat_oleh
      );
    }

    setShowForm(false);
    form.resetFields();
    setEditingVideo(null);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:5000/api/ruang_video/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        const filtered = videoList.filter((v) => v.id !== id);
        setVideoList(filtered);

        notification.success({
          message: "Video Dihapus",
          description: result.message,
        });

        // Trigger update untuk RuangVideo
        window.dispatchEvent(new Event("video-updated"));
      } else {
        notification.error({
          message: "Gagal Menghapus",
          description: result.message || "Terjadi kesalahan saat menghapus.",
        });
      }
    } catch (err) {
      notification.error({
        message: "Error",
        description: "Terjadi error saat menghapus video.",
      });
    }
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
          <p className="text-gray-500 mb-4">
            Anda belum memiliki video dokumentasi
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {videoList.map((video) => (
            <Card
              key={video.id}
              cover={
                <a
                  href={video.link_youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={video.link_thumbnail}
                    alt={video.judul}
                    className="h-48 w-full object-cover"
                  />
                </a>
              }
              className="shadow-md"
              actions={[
                <Edit3
                  className="w-5 h-5 text-blue-600 hover:text-blue-800 mx-auto"
                  onClick={() => handleEdit(video)}
                />,
                <Trash2
                  className="w-5 h-5 text-red-600 hover:text-red-800 mx-auto"
                  onClick={() => handleDelete(video.id)}
                />,
              ]}
            >
              <h3 className="font-bold">{video.judul}</h3>
              <p className="text-sm text-gray-600">Oleh: {video.dibuat_oleh}</p>
              <p className="text-sm text-gray-500">{video.deskripsi}</p>
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
        title={
          editingVideo ? "Edit Video Dokumentasi" : "Tambah Video Dokumentasi"
        }
        okText="Simpan Video"
        getContainer={false}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="judul"
            label="Judul Video"
            rules={[{ required: true }]}
          >
            <Input placeholder="Masukkan judul video" />
          </Form.Item>

          <Form.Item
            name="dibuat_oleh"
            label="Dibuat Oleh"
            rules={[{ required: true }]}
          >
            <Input placeholder="Nama pembuat" />
          </Form.Item>

          <Form.Item
            name="link_youtube"
            label="Link YouTube"
            rules={[{ required: true }]}
          >
            <Input placeholder="https://www.youtube.com/watch?v=..." />
          </Form.Item>

          <Form.Item
            name="link_thumbnail"
            label="Link Thumbnail"
            rules={[{ required: true }]}
          >
            <Input placeholder="https://img.youtube.com/vi/xxx/0.jpg" />
          </Form.Item>

          <Form.Item name="deskripsi" label="Deskripsi">
            <TextArea rows={3} placeholder="Deskripsi video" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DokumentasiVideo;
