@extends('admin.layout')

@section('title')
    Chỉnh sửa người dùng
@endsection

@section('content')
    @if (session()->has('error'))
        <div class="alert alert-danger">
            {{ session()->get('error') }}
        </div>
    @endif

    @if (session()->has('success'))
        <div class="alert alert-success">
            {{ session()->get('success') }}
        </div>
    @endif

    <div class="row">
        <div class="col-sm-12">
            <section class="card">
                <header class="card-header">
                    Chỉnh sửa người dùng
                    <span class="tools pull-right">
                        <a href="javascript:;" class="fa fa-chevron-down"></a>
                        <a href="javascript:;" class="fa fa-times"></a>
                    </span>
                </header>
                <div class="card-body">
                    <form action="{{ route('staff.user.update', $user->id) }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        @method('PUT') <!-- Để Laravel biết đây là yêu cầu PUT -->

                        <div class="form-group">
                            <label for="username">Tên</label>
                            <input type="text" name="username" id="username" class="form-control" value="{{ old('username', $user->username) }}">
                            @error('username')
                            <div class="alert alert-danger mt-2">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" name="email" id="email" class="form-control" value="{{ old('email', $user->email) }}">
                            @error('email')
                            <div class="alert alert-danger mt-2">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="phone">Số điện thoại</label>
                            <input type="text" name="phone" id="phone" class="form-control" value="{{ old('phone', $user->phone) }}">
                            @error('phone')
                            <div class="alert alert-danger mt-2">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="address">Địa chỉ</label>
                            <input type="text" name="address" id="address" class="form-control" value="{{ old('address', $user->address) }}">
                            @error('address')
                            <div class="alert alert-danger mt-2">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="avatar">Ảnh đại diện</label>
                            <input type="file" name="avatar" id="avatar" class="form-control">
                            @error('avatar')
                            <div class="alert alert-danger mt-2">{{ $message }}</div>
                            @enderror
                            <div>
                                @if($user->avatar_img)
                                    <img src="{{ asset('storage/'.$user->avatar_img) }}" alt="Avatar" width="100">
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="role">Vai trò</label>
                            @if ($user->role == 'staff')
                                <!-- Nếu là staff, trường sẽ disabled và không cho phép thay đổi -->
                                <input type="text" name="role" id="role" class="form-control" value="{{ old('role', $user->role) }}" disabled>
                                <!-- Trường ẩn để gửi giá trị role khi user là staff -->
                                <input type="hidden" name="role" value="{{ old('role', $user->role) }}">
                            @else
                                <!-- Nếu là user, trường role có thể sửa -->
                                <select name="role" id="role" class="form-control">
                                    <option value="user" {{ old('role', $user->role) == 'user' ? 'selected' : '' }}>User</option>
                                    <option value="staff" {{ old('role', $user->role) == 'staff' ? 'selected' : '' }}>Staff</option>
                                </select>
                            @endif
                            @error('role')
                            <div class="alert alert-danger mt-2">{{ $message }}</div>
                            @enderror
                        </div>


                        <div class="form-group">
                            <label for="password">Mật khẩu</label>
                            <input type="password" name="password" id="password" class="form-control">
                            @error('password')
                            <div class="alert alert-danger mt-2">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="password_confirmation">Xác nhận mật khẩu</label>
                            <input type="password" name="password_confirmation" id="password_confirmation" class="form-control">
                            @error('password_confirmation')
                            <div class="alert alert-danger mt-2">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="form-group">
                            <button type="submit" class="btn btn-success">Cập nhật</button>
                            <a href="{{ route('staff.user.index') }}" class="btn btn-secondary">Quay lại</a>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    </div>
@endsection
