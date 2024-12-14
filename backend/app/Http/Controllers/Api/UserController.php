<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
        DB::beginTransaction();

        try {
            // Ghi log dữ liệu request nhận được
            Log::info('Received request data:', $request->all());
            
            // Kiểm tra xem người dùng có tồn tại hay không
            if (!$user) {
                Log::warning('User not found.', ['user_id' => $user->id ?? null]);
                return response()->json(['error' => 'User not found.'], 404);
            }

            // Nếu có ảnh mới, lưu ảnh và cập nhật
            if ($request->hasFile('avatar_img')) {
                Log::info('New avatar file detected.', ['file_name' => $request->file('avatar_img')->getClientOriginalName()]);
                
                // Xóa ảnh cũ nếu tồn tại
                if ($user->avatar_img && Storage::disk('public')->exists($user->avatar_img)) {
                    Log::info('Deleting old avatar.', ['avatar_path' => $user->avatar_img]);
                    Storage::disk('public')->delete($user->avatar_img);
                }

                // Lưu ảnh mới
                $file = $request->file('avatar_img')->store('uploads/users', 'public');
                Log::info('New avatar saved.', ['avatar_path' => $file]);
                $user->avatar_img = $file;
            }

            // Cập nhật các trường khác
            $user->username = $request->username;
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->address = $request->address;
            $user->save();
    
            Log::info('User updated successfully.', ['user_id' => $user->id]);
    
            DB::commit();

            // Trả về ảnh dưới dạng base64 nếu có
            $base64Image = null;
            if ($user->avatar_img && Storage::disk('public')->exists($user->avatar_img)) {
                Log::info('Converting avatar to base64.', ['avatar_path' => $user->avatar_img]);
                $base64Image = base64_encode(Storage::disk('public')->get($user->avatar_img));
            }

            return response()->json([
                'message' => 'Cập nhật người dùng thành công.',
                'data' => [
                    'user' => $user,
                    'avatar_img_base64' => $base64Image
                ]
            ], 200);
        } catch (Exception $e) {
            DB::rollBack();
            
            // Ghi log lỗi
            Log::error('Error updating user.', [
                'error_message' => $e->getMessage(),
                'stack_trace' => $e->getTraceAsString()
            ]);
    
            return response()->json([
                'message' => 'Có lỗi khi cập nhật người dùng.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function rules()
    {
        return [
            'username' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . auth()->id(),
            'phone' => 'required|string|max:15',
            'address' => 'nullable|string|max:255',
        ];
    }
    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar_img' => 'required' // Kiểm tra file ảnh
        ]);
    
        $user = auth()->user(); // Lấy thông tin user đang đăng nhập
        // Lưu ảnh vào thư mục public
        if ($request->hasFile('avatar_img')) {
            $file = $request->file('avatar_img');
            $path = $file->store('uploads/users/test', 'public');// Lưu ảnh vào thư mục storage/app/public/avatars
            $user->avatar_img = $path; // Ghi đường dẫn vào cột avatar_img
            $user->save(); // Lưu thay đổi
        }
    
        return response()->json([
            'message' => 'cap nhap thanh cong ',
            'avatar_img' => asset('storage/' . $user->avatar_img), // Trả về link đầy đủ của ảnh
        ]);
    }
    public function addAvatar(Request $request)
{
    $request->validate([
        'user_id' => 'required|exists:users,id', // Kiểm tra ID user có tồn tại
        'avatar_img' => 'required', // File phải là ảnh
    ]);

    // Tìm user theo ID
    $user = User::find($request->user_id);

    // Xử lý lưu file
    if ($request->hasFile('avatar_img')) {
        $file = $request->file('avatar_img');
        $path = $file->store('uploads/users/test', 'public');// Lưu ảnh vào thư mục storage/app/public/avatars
        $user->avatar_img = $path; // Ghi đường dẫn vào cột avatar_img
        $user->save(); // Lưu thay đổi
    }

    return response()->json([
        'message' => 'them thanh cong',
        'user' => $user,
        'avatar_url' => asset('storage/' . $user->avatar_img), // Trả về URL đầy đủ của ảnh
    ], 200);
}


}