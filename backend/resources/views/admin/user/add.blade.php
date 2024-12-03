@extends('admin.layout')
@section('search')
    <form action="{{ route('admin.user.index') }}" method="GET">
        <div class="input-group mt-1">
            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm người dùng"
                value="{{ request()->input('search') }}">
            <button class="btn btn-outline-secondary" type="submit"><i class="bi bi-search"></i></button>
        </div>
    </form>
@endsection

@section('content')
<div class="row">
    <div class="col-sm-12">
            <div class="card shadow-sm">
                <header class="card-header">
                    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Thêm User</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.user.index') }}" style="color: inherit;">User</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Thêm User</li>
                            </ol>
                        </nav>
                    </div>
                </header>

                <div class="card-body">

                    <form action="{{ route('admin.user.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf

                        <div class="form-group mb-3">
                            <label for="username" class="form-label">Tên người dùng</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-person"></i></span>
                                <input type="text" class="form-control" id="username" max="100" name="username"
                                    value="{{ old('username') }}">
                            </div>
                            @error('username')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group mb-3">
                            <label for="email" class="form-label">Email</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                                <input type="email" class="form-control" id="email" name="email"
                                    value="{{ old('email') }}">
                            </div>
                            @error('email')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                        </div>

                        <div class="form-group mb-3">
                            <label for="password" class="form-label">Mật khẩu</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-lock"></i></span>
                                <input type="password" class="form-control" id="password" name="password">
                            </div>
                            @error('password')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                        </div>

                        <div class="form-group mb-3">
                            <label for="avatar_img" class="form-label">Ảnh đại diện</label>
                            <input type="file" class="form-control" id="avatar_img" name="avatar_img">
                            @error('avatar_img')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror


                        </div>

                        <div class="form-group mb-3">
                            <label for="phone" class="form-label">Số điện thoại</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-telephone"></i></span>
                                <input type="text" class="form-control" id="phone" name="phone"
                                    value="{{ old('phone') }}">
                            </div>
                            @error('phone')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                        </div>

                        <div class="form-group mb-3">
                            <label for="address" class="form-label">Địa chỉ</label>
                            <textarea class="form-control" id="address" name="address" rows="3">{{ old('address') }}</textarea>
                            @error('address')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                        </div>

                        <div class="form-group mb-4">
                            <label for="role" class="form-label">Quyền</label>
                            <select class="form-select" id="role" name="role">
                                <option value="user" {{ old('role') == 'user' ? 'selected' : '' }}>User</option>
                                <option value="staff" {{ old('role') == 'staff' ? 'selected' : '' }}>Staff</option>
                                <option value="admin" {{ old('role') == 'admin' ? 'selected' : '' }}>Admin</option>
                            </select>
                        </div>
                        <div class="mb-3 d-flex">
                            <a href="{{ route('admin.user.index') }}"
                                class="btn btn-secondary btn-lg flex-fill me-1">Quay lại</a>
                            <button type="reset" class="btn btn-warning btn-lg flex-fill me-1">Reset</button>
                            <button type="submit" class="btn btn-primary btn-lg flex-fill">Thêm Mới</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
@endsection
