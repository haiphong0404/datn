import React, { useState } from "react";

export default function Test() {
    const [message, setMessage] = useState(''); // Dùng để hiển thị thông báo lỗi hoặc thành công
    const [isLoading, setIsLoading] = useState(false); // Dùng để hiển thị trạng thái loading

    // Truyền trực tiếp userId là 12
    const userId = 12; // Giá trị userId được cố định là 12

    const handleAvatarChange = async (event) => {
        const formData = new FormData();
        const fileInput = event.target.files[0]; // Lấy file từ input
    
        if (fileInput) {
            formData.append('avatar_img', fileInput); // Thêm file vào FormData
        } else {
            console.error("No file selected.");
            return;
        }
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/user/avatar/12`, {
                method: 'PUT',
                body: formData,
                           });
    
            const result = await response.json();
            if (response.ok) {
                console.log('Avatar updated successfully:', result);
            } else {
                console.error('Error updating avatar:', result);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };
    

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Cập nhật Avatar</h2>
            {message && <div className="mb-4 text-center text-red-500">{message}</div>} {/* Hiển thị thông báo */}
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Chọn Avatar:</label>
                    <input
                        type="file"
                        onChange={handleAvatarChange} // Gọi hàm khi thay đổi file
                        accept="image/*" // Chỉ chấp nhận hình ảnh
                        className="w-full border p-2 rounded"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2 px-4 rounded text-white ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
                >
                    {isLoading ? "Đang tải..." : "Cập nhật Avatar"} {/* Hiển thị trạng thái tải */}
                </button>
            </form>
        </div>
    );
}
