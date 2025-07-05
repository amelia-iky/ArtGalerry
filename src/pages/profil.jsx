import { useState, useEffect } from "react";
import { Button, Card, Input, Form, Upload, Avatar, message, Tabs, notification, Modal } from "antd";
import { EditOutlined, LockOutlined, MailOutlined, UserOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import HalamanKarya from "./karya_saya";
import RuangVideo from "./video_saya";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState(null);

  const [userData, setUserData] = useState(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return (
      currentUser || {
        name: "Ahmad Fauzi",
        username: "ahmadfauzi",
        email: "ahmad.fauzi@email.com",
        bio: "",
        password: "********",
        location: "",
        avatar: "",
      }
    );
  });
  useEffect(() => {
    const justLoggedIn = localStorage.getItem("justLoggedIn");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (justLoggedIn && currentUser) {
      notification.success({
        message: "Login Berhasil",
        description: `Selamat datang, ${currentUser.name}!`,
        placement: "topRight",
        duration: 2,
      });
      localStorage.removeItem("justLoggedIn");
    }
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
      message.success(`${file.name} berhasil diunggah`);
    }
  };

  const onFinish = (values) => {
    const updatedData = {
      ...userData,
      ...values,
      avatar: avatarUrl || userData.avatar,
    };

    setUserData(updatedData);
    localStorage.setItem("currentUser", JSON.stringify(updatedData));

    // 🔧 Update di daftar user
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) => (u.username === updatedData.username ? updatedData : u));
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setIsEditing(false);
    notification.success({
      message: "Profil Diperbarui",
      description: "Perubahan profil berhasil disimpan.",
      placement: "topRight",
    });
  };

  const handleLogout = () => {
    Modal.confirm({
      title: "Konfirmasi Logout",
      content: "Apakah Anda yakin ingin logout?",
      okText: "Ya, Logout",
      cancelText: "Batal",
      onOk: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        notification.success({
          message: "Berhasil Logout",
          description: "Anda telah keluar dari akun.",
          placement: "topRight",
        });
        navigate("/login");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-sm">
          {/* Bagian Avatar */}
          <div className="flex flex-col items-center justify-center text-center py-6 border-b border-gray-200 relative">
            <div className="relative group">
              <Avatar src={avatarUrl || userData.avatar} size={96} icon={<UserOutlined />} className="bg-blue-500 text-white text-3xl object-cover" style={{ borderRadius: "50%" }}>
                {!avatarUrl && !userData.avatar && userData.name?.charAt(0)}
              </Avatar>

              {isEditing && (
                <>
                  <label htmlFor="avatarUpload" className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer hover:scale-110 transition" title="Ubah foto">
                    <EditOutlined />
                  </label>
                  <input type="file" id="avatarUpload" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
                </>
              )}
            </div>

            <h2 className="text-xl font-bold mt-2 text-gray-800">{userData.name}</h2>
            <p className="text-blue-600">@{userData.username}</p>
            {userData.bio && <p className="text-gray-600 mt-2 max-w-md">{userData.bio}</p>}
          </div>

          {/* Tab */}
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: "Informasi",
                children: (
                  <div className="pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">Informasi Profil</h2>
                      <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                          if (!isEditing) {
                            form.setFieldsValue(userData);
                          }
                          setIsEditing(!isEditing);
                        }}
                      >
                        {isEditing ? "Batal" : "Edit"}
                      </Button>
                    </div>

                    <Form form={form} onFinish={onFinish} layout="vertical">
                      <Form.Item name="email" label="Email">
                        {isEditing ? <Input prefix={<MailOutlined />} /> : <div>{userData.email}</div>}
                      </Form.Item>

                      <Form.Item name="username" label="Username">
                        {isEditing ? <Input prefix={<UserOutlined />} /> : <div>{userData.username}</div>}
                      </Form.Item>

                      <Form.Item name="password" label="Password">
                        {isEditing ? (
                          <Input.Password prefix={<LockOutlined />} />
                        ) : (
                          <div>{"*".repeat(userData.password?.length || 8)}</div> // default 8 kalau undefined
                        )}
                      </Form.Item>

                      <Form.Item name="name" label="Nama Lengkap">
                        {isEditing ? <Input /> : <div>{userData.name}</div>}
                      </Form.Item>

                      <Form.Item name="location" label="Lokasi">
                        {isEditing ? <Input prefix={<EnvironmentOutlined />} /> : <div>{userData.location}</div>}
                      </Form.Item>

                      <Form.Item name="bio" label="Bio">
                        {isEditing ? <Input.TextArea rows={3} placeholder="Tuliskan sedikit tentang kamu..." /> : <div className="whitespace-pre-wrap text-gray-700">{userData.bio || "Belum ada bio."}</div>}
                      </Form.Item>

                      {isEditing && (
                        <div className="flex justify-end mt-6">
                          <Button type="primary" htmlType="submit">
                            Simpan Perubahan
                          </Button>
                        </div>
                      )}
                    </Form>

                    {!isEditing && (
                      <div className="mt-10">
                        <Button danger type="primary" className="w-[250px] h-10 text-base mx-auto block mt-8" onClick={handleLogout}>
                          Logout
                        </Button>
                      </div>
                    )}
                  </div>
                ),
              },
              {
                key: "2",
                label: "Karya Saya",
                children: (
                  <div className="pt-6">
                    <HalamanKarya />
                  </div>
                ),
              },
              {
                key: "3",
                label: "Video Saya",
                children: (
                  <div className="pt-6">
                    <RuangVideo />
                  </div>
                ),
              },
            ]}
          />
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
