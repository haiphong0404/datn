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
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Chi Tiết User</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.user.index') }}" style="color: inherit;">User</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Chi Tiết User</li>
                            </ol>
                        </nav>
                    </div>
                </header>

                <div class="card-body">

                    <form action="{{ route('admin.user.show', $user->id) }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        @if ($user->avatar_img)
                            <div class="mb-3 text-center">
                                <label class="form-label"><strong>Ảnh đại diện:</strong></label>
                                <div class="d-flex justify-content-center">
                                    <img src="{{ Storage::url($user->avatar_img) }}" alt="Avatar" class="img-thumbnail"
                                        style="max-width: 150px;">
                                </div>
                            </div>
                        @endif

                        <div class="mb-3">
                            <label class="form-label"><strong>Tên người dùng:</strong></label>
                            <input type="text" class="form-control" value="{{ $user->username }}" readonly>
                        </div>


                        <div class="mb-3">
                            <label class="form-label"><strong>Email:</strong></label>
                            <input type="email" class="form-control" value="{{ $user->email }}" readonly>
                        </div>

                        <div class="mb-3">
                            <label class="form-label"><strong>Số điện thoại:</strong></label>
                            <input type="text" class="form-control" value="{{ $user->phone }}" readonly>
                        </div>

                        <div class="mb-3">
                            <label class="form-label"><strong>Địa chỉ:</strong></label>
                            <textarea class="form-control" readonly>{{ $user->address }}</textarea>
                        </div>

                        <div class="mb-3">
                            <label class="form-label"><strong>Quyền:</strong></label>
                            <input type="text" class="form-control" value="{{ ucfirst($user->role) }}" readonly>
                        </div>



                        <div class="d-flex">
                            <a href="{{ route('admin.user.index') }}" class="btn btn-secondary flex-fill me-1">Quay lại</a>
                            
                            {{-- Kiểm tra nếu tài khoản đăng nhập không phải admin hoặc người dùng hiện tại không phải admin --}}
                            @if (!(auth()->user()->role === 'admin' && $user->role === 'admin') && auth()->user()->hasRole(['admin']))
                                <a href="{{ route('admin.user.edit', $user->id) }}" class="btn btn-warning flex-fill me-1">Chỉnh sửa</a>
                            @endif
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
@endsection
