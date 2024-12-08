<?php

namespace App\Http\Controllers\Admins;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('checkRole:admin')->only(['create', 'store', 'restore','update','edit','destroy']);
        $this->middleware('checkRole:admin,staff')->only(['index', 'show']);
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        
        $search = $request->input('search');
        $perPage = $request->input('per_page', 10); // Mặc định 10 bản ghi
        
        $users = User::when($search, function ($query, $search) {
            return $query->where('username', 'LIKE', "%{$search}%")
                ->orWhere('email', 'LIKE', "%{$search}%")
                ->orWhere('phone', 'LIKE', "%{$search}%");
        })
        ->orderBy('id', 'desc') // Sắp xếp giảm dần theo cột 'id'
        ->paginate($perPage);
        $noResults = $users->isEmpty();

        return view('admin.user.list', compact('users', 'noResults'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.user.add');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        if ($request->hasFile('avatar_img')) {
            $file = $request->file('avatar_img')->store('uploads/users', 'public');
        } else {
            $file = null;
        }
        User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'avatar_img' => $file,
            'phone' => $request->phone,
            'address' => $request->address,
            'role' => $request->role,
        ]);

        return redirect()->route('admin.user.index')->with('success', 'Người dùng đã được thêm thành công.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::findOrFail($id);
        return view('admin.user.show', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        
        $user = User::findOrFail($id);
        if (auth()->user()->role === 'admin' && $user->role === 'admin') {
            return redirect()->route('admin.user.index')->with('error', 'Bạn không thể chỉnh sửa tài khoản admin khác.');
        }
        return view('admin.user.edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        if (auth()->user()->role === 'admin' && $user->role === 'admin') {
            return redirect()->route('admin.user.index')->with('error', 'Bạn không thể chỉnh sửa tài khoản admin khác.');
        }
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
        $user->role = $request->role ?? $user->role;

        $user->save();

        return redirect()->route('admin.user.index')->with('success', 'Cập nhật người dùng thành công.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function toggleStatus($id)
    {
        $user = User::findOrFail($id);
        if (auth()->user()->role === 'admin' && $user->role === 'admin') {
            return redirect()->route('admin.user.index')->with('error', 'Bạn không thể Xóa tài khoản admin khác.');
        }
        // Chuyển đổi trạng thái
        if ($user->status === 'active') {
            $user->status = 'inactive'; // Chuyển sang "Không hoạt động"
        } else {
            $user->status = 'active'; // Chuyển sang "Hoạt động"
        }
    
        $user->save(); // Lưu thay đổi vào cơ sở dữ liệu
    
        // Quay lại trang danh sách với thông báo thành công
        return redirect()->route('admin.user.index')->with(
            'success',
            'Trạng thái người dùng đã được cập nhật thành ' . ($user->status === 'active' ? 'Hoạt động' : 'Không hoạt động') . '!'
        );
    }
    
}
