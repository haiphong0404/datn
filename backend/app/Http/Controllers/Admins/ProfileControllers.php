<?php

namespace App\Http\Controllers\Admins;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileControllers extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Giả sử người dùng đã đăng nhập, chúng ta lấy thông tin người dùng đó
        $user = auth()->user();
        return view('admin.profile.index', compact('user'));
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        $user = auth()->user(); 
        return view('admin.profile.update-info', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProfileRequest $request)
    {
        // Lấy thông tin người dùng đã đăng nhập
        $user = auth()->user();
    
        // Xác thực dữ liệu đầu vào
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
        return redirect()->route('admin.profile')->with('success', 'Thông tin đã được cập nhật.');
    }
    
    /**
     * Remove the specified resource from storage.
     */
   /**
 * Log the user out of the application.
 */
public function logout(Request $request)
{
    // Đăng xuất người dùng khỏi phiên đăng nhập
    auth()->logout();

    // Invalidate the session để xoá tất cả dữ liệu phiên hiện tại
    $request->session()->invalidate();

    // Tạo lại token để tránh tấn công CSRF
    $request->session()->regenerateToken();

    // Chuyển hướng về trang localhost:3000
    return redirect()->away('http://localhost:3000/login')->with('success', 'Bạn đã đăng xuất thành công.');
}


}
