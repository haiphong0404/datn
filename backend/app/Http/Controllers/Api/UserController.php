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
use Illuminate\Support\Facades\Auth;
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
    
            // Nếu có ảnh mới dưới dạng base64, lưu ảnh và cập nhật
            if ($request->has('avatar_img')) {
                $base64Image = $request->avatar_img;
    
                // Chuyển đổi base64 thành file
                $image = base64_decode($base64Image);
                $imageName = 'avatar_' . time() . '.png'; // Tên ảnh
                $path = 'uploads/users/' . $imageName;
    
                // Lưu ảnh vào thư mục public
                Storage::disk('public')->put($path, $image);
    
                // Cập nhật ảnh vào database
                $user->avatar_img = $path;
            }
    
            // Cập nhật các trường khác
            $user->username = $request->username;
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->address = $request->address;
            $user->save();
    
            DB::commit();
    
            return response()->json([
                'message' => 'Cập nhật người dùng thành công.',
                'data' => $user
            ], 200);
        } catch (Exception $e) {
            DB::rollBack();
    
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
    // Phương thức uploadAvatar (POST) để tải ảnh avatar
    public function uploadAvatar(Request $request)
    {
        try {
            // Kiểm tra và validate tệp ảnh
            $request->validate([
                'avatar' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048',
            ]);
    
            // Lấy thông tin người dùng hiện tại
            $user = Auth::user();
    
            if (!$user) {
                return response()->json(['message' => 'Người dùng không hợp lệ.'], 403);
            }
    
            // Nếu user đã có ảnh avatar, xóa ảnh cũ
            if ($user->avatar_img) {
                $oldPath = public_path('storage/' . $user->avatar_img);
                if (file_exists($oldPath)) {
                    unlink($oldPath); // Xóa ảnh cũ
                }
            }
    
            // Lấy tệp ảnh từ yêu cầu
            $avatar = $request->file('avatar');
    
            // Đặt tên tệp mới
            $imageName = 'avatar_' . time() . '.' . $avatar->getClientOriginalExtension();
    
            // Đường dẫn lưu ảnh
            $path = $avatar->storeAs('uploads/avatars', $imageName, 'public'); // Lưu vào thư mục uploads/avatars trong thư mục public
    
            // Kiểm tra xem ảnh đã được lưu thành công chưa
            if (!$path) {
                return response()->json(['message' => 'Có lỗi khi lưu ảnh.'], 500);
            }
    
            // Cập nhật URL ảnh mới vào cơ sở dữ liệu
            $user->avatar_img = $path;
            $user->save(); // Lưu thông tin người dùng với ảnh mới vào cơ sở dữ liệu
    
            return response()->json([
                'message' => 'Ảnh avatar đã được tải lên thành công.',
                'data' => [
                    'avatar_img' => asset('storage/' . $path), // Trả về đường dẫn ảnh
                ],
            ], 201);
        } catch (\Exception $e) {
            Log::error('Lỗi khi tải ảnh lên.', [
                'error_message' => $e->getMessage(),
                'stack_trace' => $e->getTraceAsString(),
            ]);
    
            return response()->json([
                'message' => 'Có lỗi khi tải ảnh lên.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    public function getUserById($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Người dùng không tồn tại'], 404);
        }

        return response()->json($user);
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
    
    }