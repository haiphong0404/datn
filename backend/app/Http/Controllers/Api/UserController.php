<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Exception;

class UserController extends Controller
{
    /**
     * Hiển thị danh sách tài nguyên.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $users = User::when($search, function ($query, $search) {
            return $query->where('username', 'LIKE', "%{$search}%")
                ->orWhere('email', 'LIKE', "%{$search}%")
                ->orWhere('phone', 'LIKE', "%{$search}%");
        })->get();
        $users = $users->map(function ($detail) {
            $detail->avatar_img = $this->getImageAsBase64($detail->image);
            return $detail;
        });

        if ($users->isEmpty()) {
            return response()->json([
                'message' => 'Không tìm thấy người dùng nào.',
                'data' => []
            ], 404);
        }

        return response()->json([
            'message' => 'Lấy danh sách người dùng thành công.',
            'data' => $users
        ], 200);
    }
    private function getImageAsBase64($imagePath)
    {
        // Kiểm tra nếu hình ảnh tồn tại
        if ($imagePath && Storage::disk('public')->exists($imagePath)) {
            // Lấy nội dung hình ảnh
            $imageData = Storage::disk('public')->get($imagePath);
            // Lấy loại mime type của hình ảnh
            $mimeType = mime_content_type(storage_path('app/public/' . $imagePath));
            // Mã hóa hình ảnh thành Base64
            return 'data:' . $mimeType . ';base64,' . base64_encode($imageData);
        }

        return null; // Nếu không có hình ảnh, trả về null
    }

    /**
     * Lưu trữ một tài nguyên mới vào cơ sở dữ liệu.
     */
    public function store(UserRequest $request)
    {
        DB::beginTransaction();

        try {
            $file = $request->hasFile('avatar_img')
                ? $request->file('avatar_img')->store('uploads/users', 'public')
                : null;

            $user = User::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'avatar_img' => $file,
                'phone' => $request->phone,
                'address' => $request->address,
                'role' => $request->role,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Tạo người dùng thành công.',
                'data' => $user
            ], 201);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Có lỗi khi tạo người dùng.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Hiển thị tài nguyên cụ thể.
     */
    public function show(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Không tìm thấy người dùng.'
            ], 404);
        }

        // Chuyển đổi avatar_img thành Base64 nếu tồn tại
        $user->avatar_img = $this->getImageAsBase64($user->avatar_img);

        return response()->json([
            'message' => 'Lấy thông tin người dùng thành công.',
            'data' => $user
        ], 200);
    }

    /**
     * Cập nhật tài nguyên cụ thể.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            // Nếu nhận được dữ liệu base64 từ avatar_img
            if ($request->avatar_img) {
                // Xóa ảnh cũ nếu tồn tại
                if ($user->avatar_img && Storage::disk('public')->exists($user->avatar_img)) {
                    Storage::disk('public')->delete($user->avatar_img);
                }

                // Xử lý base64 và lưu tệp
                $imageData = $request->avatar_img; // Base64 chuỗi
                $imageName = 'uploads/users/' . uniqid() . '.png'; // Tên file
                Storage::disk('public')->put($imageName, base64_decode($imageData));

                // Lưu đường dẫn vào database
                $user->avatar_img = $imageName;
            }

            // Cập nhật các thông tin khác
            $user->username = $request->username;
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->address = $request->address;

            // Lưu thông tin người dùng
            $user->save();

            return response()->json([
                'message' => 'Cập nhật người dùng thành công.',
                'data' => $user
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Có lỗi khi cập nhật người dùng.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Xóa tài nguyên cụ thể khỏi cơ sở dữ liệu.
     */
}
