@extends('admin.layout')

@section('title')
    Danh sách thể loại
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
                    Danh sách thể loại
                    <span class="tools pull-right">
                        <a href="javascript:;" class="fa fa-chevron-down"></a>
                        <a href="javascript:;" class="fa fa-times"></a>
                    </span>
                </header>
                <div class="card-body">
                    <div class="form-group mb-3">
                        <form action="{{ route('categories.index') }}" method="GET">
                            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm thể loại..."
                                   value="{{ request()->input('search') }}">
                        </form>
                    </div>

                    <div class="mb-3">
                        <a href="{{ route('categories.create') }}" class="btn btn-primary"><i class="fa fa-plus"></i> Thêm mới</a>
                    </div>

                    <div class="adv-table">
                        <table class="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th class="center">Id</th>
                                <th>Tên thể loại</th>
                                <th>Mô tả</th>
                                <th class="hidden-phone">Ngày tạo</th>
                                <th class="hidden-phone">Trạng thái</th>
                                <th class="center hidden-phone">Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($categories as $index => $category)
                                <tr class="gradeA">
                                    <td class="center">{{ $category->id }}</td>
                                    <td>{{ $category->name }}</td>
                                    <td>{{ $category->description }}</td>
                                    <td class="hidden-phone">{{ $category->created_at }}</td>
                                    <td class="hidden-phone">
                                        @if ($category->trashed())
                                            <span class="badge badge-danger">Đã xóa</span>
                                        @else
                                            <span class="badge badge-success">Còn</span>
                                        @endif
                                    </td>
                                    <td class="center hidden-phone">
                                        <a href="{{ route('categories.edit', $category->id) }}" class="btn btn-warning btn-sm" title="Chỉnh sửa">
                                            <i class="fa fa-edit"></i> Sửa
                                        </a>
                                        @if ($category->trashed())
                                            <form action="{{ route('categories.restore', $category->id) }}" method="POST" style="display:inline;">
                                                @csrf
                                                <button type="submit" class="btn btn-info btn-sm" title="Phục hồi">
                                                    <i class="fa fa-undo"></i> Phục hồi
                                                </button>
                                            </form>
                                        @else
                                            <form action="{{ route('categories.destroy', $category->id) }}" method="POST" style="display:inline;">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="btn btn-danger btn-sm" title="Xóa" onclick="return confirm('Bạn có chắc chắn muốn xóa không?');">
                                                    <i class="fa fa-trash"></i> Xóa
                                                </button>
                                            </form>
                                        @endif
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
