@extends('admin.layout')

@section('title')
    Danh sách người dùng
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
                    Danh sách người dùng
                    <span class="tools pull-right">
                        <a href="javascript:;" class="fa fa-chevron-down"></a>
                        <a href="javascript:;" class="fa fa-times"></a>
                    </span>
                </header>
                <div class="card-body">
                    <div class="form-group mb-3">
                        <form action="{{ route('staff.user.index') }}" method="GET">
                            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm người dùng..."
                                   value="{{ request()->input('search') }}">
                        </form>
                    </div>

                    <div class="mb-3">
                        <a href="{{ route('staff.user.create') }}" class="btn btn-primary"><i class="fa fa-plus"></i>
                            Thêm mới</a>
                    </div>

                    <div class="adv-table">
                        <table class="table table-striped table-bordered">
                            <thead>
                            <tr role="row">
                                <th>Id</th>
                                <th>Avatar</th>
                                <th>Tên</th>
                                <th>Số điện thoại</th>
                                <th>Email</th>
                                <th>Địa chỉ</th>
                                <th>Vai trò</th>
                                <th class="center hidden-phone">Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($users as $user)
                                <tr class="gradeA">
                                    <td class="center">{{ $user->id }}</td>

                                    <td style="width: 100px;"><img src="{{ Storage::url($user->avatar_img) }}"
                                                                   width="100" height="100" alt="{{ $user->username }}">
                                    </td>
                                    <td>{{ $user->username }}</td>
                                    <td>{{ $user->phone }}</td>
                                    <td>{{ $user->email }}</td>
                                    <td>{{ $user->address }}</td>
                                    <td>{{ ucfirst($user->role) }}</td>

                                    <td class="center hidden-phone">
                                        <a href="{{ route('staff.user.show', $user->id) }}" class="btn btn-info btn-sm"
                                           title="Xem chi tiết">
                                            <i class="fa fa-eye"></i> Xem
                                        </a>

                                        <a href="{{ route('staff.user.edit', $user->id) }}"
                                           class="btn btn-warning btn-sm" title="Chỉnh sửa">
                                            <i class="fa fa-edit"></i> Sửa
                                        </a>
                                        <form action="{{ route('staff.user.destroy', $user->id) }}" method="POST"
                                              style="display:inline;">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-danger btn-sm" title="Xóa"
                                                    onclick="return confirm('Bạn có chắc chắn muốn xóa không?');">
                                                <i class="fa fa-trash"></i> Xóa
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    </div>
@endsection
