@extends('admin.layout')

@section('title')
    Chi tiết người dùng
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
                    Chi tiết người dùng
                    <span class="tools pull-right">
                        <a href="javascript:;" class="fa fa-chevron-down"></a>
                        <a href="javascript:;" class="fa fa-times"></a>
                    </span>
                </header>
                <div class="card-body">
                    <!-- Form chi tiết người dùng -->
                    <form action="" method="POST" enctype="multipart/form-data" class="form-horizontal">
                        @csrf

                        <div class="form-group row">
                            <label for="name" class="col-sm-2 col-form-label">Tên</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="name" value="{{ $user->username }}" disabled>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" id="email" value="{{ $user->email }}" disabled>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="phone" class="col-sm-2 col-form-label">Số điện thoại</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="phone" value="{{ $user->phone }}" disabled>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="address" class="col-sm-2 col-form-label">Địa chỉ</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="address" value="{{ $user->address }}" disabled>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="avatar" class="col-sm-2 col-form-label">Ảnh đại diện</label>
                            <div class="col-sm-10">
                                <img src="{{ asset('storage/' . $user->avatar_img) }}" alt="Avatar" style="width: 150px; height: 150px;">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="role" class="col-sm-2 col-form-label">Vai trò</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="role" value="{{ ucfirst($user->role) }}" disabled>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-10 offset-sm-2 d-flex">
                                <a href="{{ route('staff.user.index') }}" class="btn btn-secondary mr-2">Quay lại</a>
                                <a href="{{ route('staff.user.edit', $user->id) }}" class="btn btn-primary">Chỉnh sửa</a>
                            </div>
                        </div>

                    </form>
                </div>
            </section>
        </div>
    </div>
@endsection
