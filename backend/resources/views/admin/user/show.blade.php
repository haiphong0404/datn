@extends('admin.layout')
@section('content')
    <div class="container">
        <div class="row ">
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h4 class="mb-0">Chi Tiết Người Dùng</h4>
                </div>

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
                            <a href="{{ route('admin.user.edit', $user->id) }}" class="btn btn-warning flex-fill me-1">Chỉnh
                                sửa</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
@endsection
