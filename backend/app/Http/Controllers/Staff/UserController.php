<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Hiển thị danh sách người dùng có vai trò là user và staff.
     */
    public function index()
    {
        $users = User::whereIn('role', ['user', 'staff'])->get();
        return view('staff.users.index', compact('users'));
    }

    /**
     * Hiển thị form tạo mới người dùng.
     */
    public function create()
    {
        return view('staff.users.create');
    }

    /**
     * Lưu thông tin người dùng mới.
     */
    public function store(Request $request)
    {
        // Xác thực dữ liệu
        $validated = $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|unique:users,phone',
            'address' => 'nullable|string|max:255',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'role' => 'required|in:user,staff',
            'password' => 'required|string|min:6|confirmed',
        ], [
            'username.required' => 'Tên là bắt buộc.',
            'email.required' => 'Email là bắt buộc.',
            'email.email' => 'Email không hợp lệ.',
            'email.unique' => 'Email này đã được sử dụng.',
            'phone.required' => 'Số điện thoại là bắt buộc.',
            'phone.unique' => 'Số điện thoại này đã được sử dụng.',
            'address.max' => 'Địa chỉ không quá 255 ký tự.',
            'avatar.image' => 'Ảnh đại diện phải là một tệp hình ảnh.',
            'avatar.mimes' => 'Ảnh đại diện phải có định dạng jpg, jpeg, png, hoặc gif.',
            'avatar.max' => 'Ảnh đại diện không được vượt quá 2MB.',
            'role.required' => 'Vai trò là bắt buộc.',
            'role.in' => 'Vai trò không hợp lệ.',
            'password.required' => 'Mật khẩu là bắt buộc.',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự.',
            'password.confirmed' => 'Mật khẩu xác nhận không khớp.',

        ]);

        // Kiểm tra dữ liệu nhận được
        // dd($validated); // Dùng để debug dữ liệu gửi lên nếu cần

        // Nếu dữ liệu hợp lệ, tiếp tục lưu vào DB
        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar')->store('uploads/users', 'public');
        } else {
            $file = null;
        }

        // Lưu người dùng vào cơ sở dữ liệu
        User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'phone' => $request->phone,
            'address' => $request->address,
            'avatar_img' => $file,
            'role' => $request->role,
        ]);

        return redirect()->route('staff.user.index')->with('success', 'Người dùng đã được thêm thành công.');
    }


    /**
     * Hiển thị chi tiết người dùng.
     */
    public function show(User $user)
    {

        return view('staff.users.show', compact('user'));
    }

    /**
     * Hiển thị form chỉnh sửa thông tin người dùng.
     */
    /**
     * Cập nhật thông tin người dùng.
     */
    public function edit($id)
    {
        // Tìm người dùng theo ID
        $user = User::findOrFail($id);

        // Trả về view với dữ liệu người dùng
        return view('staff.users.edit', compact('user'));
    }

    public function update(Request $request, $id)
    {
        // Xác thực dữ liệu
        $validated = $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'phone' => 'required|unique:users,phone,' . $id,
            'address' => 'nullable|string|max:255',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'role' => 'required|in:user,staff',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        // Lấy người dùng từ DB
        $user = User::findOrFail($id);

        // Kiểm tra nếu người dùng là staff, không cho phép thay đổi role
        if ($user->role == 'staff') {
            // Nếu role được thay đổi, giữ nguyên role cũ
            $role = $user->role;
        } else {
            // Nếu là user, có thể thay đổi role
            $role = $request->role;
        }

        // Kiểm tra nếu có ảnh đại diện
        if ($request->hasFile('avatar')) {
            // Xóa ảnh cũ nếu có
            if ($user->avatar_img) {
                Storage::disk('public')->delete($user->avatar_img);
            }
            $file = $request->file('avatar')->store('uploads/users', 'public');
        } else {
            $file = $user->avatar_img; // Giữ nguyên ảnh cũ nếu không upload ảnh mới
        }

        // Cập nhật thông tin người dùng
        $user->update([
            'username' => $request->username,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'avatar_img' => $file,
            'role' => $role, // Cập nhật role với giá trị kiểm tra
            'password' => $request->password ? bcrypt($request->password) : $user->password, // Nếu mật khẩu không thay đổi thì giữ nguyên
        ]);

        return redirect()->route('staff.user.index')->with('success', 'Người dùng đã được cập nhật thành công.');
    }


    /**
     * Xóa mềm người dùng.
     */
    public function destroy($id)
    {
        // Tìm người dùng
        $user = User::findOrFail($id);

        // Kiểm tra nếu người dùng có vai trò là staff, không cho phép xóa
        if ($user->role == 'staff') {
            return redirect()->route('staff.user.index')->with('error', 'Không thể xóa người dùng này vì họ là quản trị viên .');
        }

        // Thực hiện xóa nếu người dùng là user
        $user->delete();

        return redirect()->route('staff.user.index')->with('success', 'Người dùng đã được xóa thành công.');
    }

}
