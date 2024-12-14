@extends('admin.layout')

@section('title')
    Danh sách biến thể sản phẩm
@endsection

@section('content')
    @if (session()->has('success'))
        <div class="alert alert-success">
            {{ session()->get('success') }}
        </div>
    @endif

    <div class="mb-3">
        <a href="" class="btn btn-primary"><i class="fa fa-plus"></i> Thêm mới biến thể</a>
    </div>

    <table class="table table-striped">
        <thead>
        <tr>
            <th>ID</th>
            <th>Sản phẩm</th>
            <th>Kích thước</th>
            <th>Màu sắc</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Hành động</th>
        </tr>
        </thead>
        <tbody>
        @foreach($variants as $variant)
            <tr>
                <td>{{ $variant->id }}</td>
                <td>{{ $variant->product->name }}</td>
                <td>{{ $variant->size->name }}</td>
                <td>{{ $variant->color->name }}</td>
                <td>{{ $variant->price }}</td>
                <td>{{ $variant->quantity }}</td>
                <td>
                    <a href="" class="btn btn-warning">Sửa</a>
                    <form action="" method="POST" style="display:inline;">
                        @csrf
                        @method('DELETE')
                        <!-- <button type="submit" class="btn btn-danger" onclick="return confirm('Bạn có chắc chắn muốn xóa không?');">Xóa</button> -->
                    </form>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection
