import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";

export default function Profile() {
  const { profile, loading, fetchProfile, updateProfile } = useUser();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Load profile khi mở trang
  useEffect(() => {
    fetchProfile();
  }, []);

  // Đồng bộ khi dữ liệu load xong
  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setPhone(profile.phone);
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({ name, phone });
  };

  if (loading) return <p className="text-center">Đang tải...</p>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Thông tin cá nhân</h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Tên</label>
        <input
          className="w-full border p-2 rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block mb-2 font-medium">Số điện thoại</label>
        <input
          className="w-full border p-2 rounded mb-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}
