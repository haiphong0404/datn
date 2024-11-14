@extends('admin.layout')

@section('title')
    Thêm mới người dùng
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
                    Thêm mới người dùng
                    <span class="tools pull-right">
                        <a href="javascript:;" class="fa fa-chevron-down"></a>
                        <a href="javascript:;" class="fa fa-times"></a>
                    </span>
                </header>
                <div class="card-body">
                    <form action="{{ route('staff.user.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf

                        <div class="form-group">
                            <label for="username">Tên</label>
                            <input type="text" name="username" id="username" class="form-control"
                                   value="{{ old('username') }}">
                            @error('username')
                            <div class="alert alert-danger mt-2">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" name="email" id="email" class="form-control" value="{{ old('email') }}">
                            @error('email')
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
                            <input type="password" name="password_confirmation" id="password_confirmation"
                                   class="form-control">
                            @error('password_confirmation')
                            <div class="alert alert-danger mt-2">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="phone">Số điện thoại</label>
                            <input type="text" name="phone" id="phone" class="form-control" value="{{ old('phone') }}">
                            @error('phone')
                            <div class="alert alert-danger mt-2">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="address">Địa chỉ</label>
                            <input type="text" name="address" id="address" class="form-control"
                                   value="{{ old('address') }}">
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
                        </div>

                        <div class="form-group">
                            <label for="role">Vai trò</label>
                            <select name="role" id="role" class="form-control" required>
                                <option value="user" {{ old('role') == 'user' ? 'selected' : '' }}>User</option>
                                <option value="staff" {{ old('role') == 'staff' ? 'selected' : '' }}>Staff</option>
                            </select>
                            @error('role')
                            <div class="alert alert-danger mt-2">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="form-group">
                            <button type="submit" class="btn btn-success">Thêm mới</button>
                            <a href="{{ route('staff.user.index') }}" class="btn btn-secondary">Quay lại</a>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    </div>
@endsection
