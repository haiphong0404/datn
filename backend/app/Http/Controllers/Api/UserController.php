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

        if ($users->isEmpty()) {
            return response()->json([
                'message' => 'Không tìm thấy người dùng nào.',
                'data' => []
            ], 404);
        }

        // Chuyển đổi hình ảnh avatar của từng user sang base64 nếu có
        foreach ($users as $user) {
            if ($user->avatar_img) {
                $user->avatar_img = $this->getImageAsBase64($user->avatar_img);
            }
        }

        return response()->json([
            'message' => 'Lấy danh sách người dùng thành công.',
            'data' => $users
        ], 200);
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

        // Chuyển đổi hình ảnh avatar thành base64 nếu có
        if ($user->avatar_img) {
            $user->avatar_img = $this->getImageAsBase64($user->avatar_img);
        }

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
        DB::beginTransaction();

        try {
            $user->username = $request->username;
            $user->email = $request->email;

            if ($request->filled('password')) {
                $user->password = bcrypt($request->password);
            }

            if ($request->hasFile('avatar_img')) {
                if ($user->avatar_img) {
                    Storage::disk('public')->delete($user->avatar_img);
                }
                $user->avatar_img = $request->file('avatar_img')->store('uploads/users', 'public');
            }

            $user->phone = $request->phone;
            $user->address = $request->address;
            $user->role = $request->role;

            $user->save();

            DB::commit();

            return response()->json([
                'message' => 'Cập nhật người dùng thành công.',
                'data' => $user
            ], 200);

        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Có lỗi khi cập nhật người dùng.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Xóa tài nguyên cụ thể khỏi cơ sở dữ liệu.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();

        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'message' => 'Không tìm thấy người dùng.'
                ], 404);
            }

            if ($user->avatar_img) {
                Storage::disk('public')->delete($user->avatar_img);
            }

            $user->delete();

            DB::commit();

            return response()->json([
                'message' => 'Xóa người dùng thành công.'
            ], 200);

        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Có lỗi khi xóa người dùng.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Hàm chuyển đổi hình ảnh thành base64.
     */
    private function getImageAsBase64($imagePath)
    {
        // Kiểm tra nếu hình ảnh tồn tại
        if ($imagePath && Storage::disk('public')->exists($imagePath)) {
            // Lấy nội dung hình ảnh
            $imageData = Storage::disk('public')->get($imagePath);
            // Lấy loại mime type của file
            $mimeType = mime_content_type(storage_path('app/public/' . $imagePath));
            // Mã hóa hình ảnh thành Base64
            return 'data:' . $mimeType . ';base64,' . base64_encode($imageData);
        }

        return null; // Nếu không có hình ảnh, trả về null
    }
}
