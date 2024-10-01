@extends('admin.layout')

@section('title')
    Danh sách sản phẩm
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
                    Danh sách sản phẩm
                    <span class="tools pull-right">
                        <a href="javascript:;" class="fa fa-chevron-down"></a>
                        <a href="javascript:;" class="fa fa-times"></a>
                    </span>
                </header>
                <div class="card-body">
                    <div class="form-group mb-3">
                        <form action="{{ route('products.index') }}" method="GET">
                            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm sản phẩm..."
                                   value="{{ request()->input('search') }}">
                        </form>
                    </div>

                    <div class="mb-3">
                        <a href="{{ route('products.create') }}" class="btn btn-primary"><i class="fa fa-plus"></i> Thêm mới</a>
                    </div>

                    <div class="adv-table">
                        <table class="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th class="center">STT</th>
                                <th>Tên sản phẩm</th>
                                <th>Mô tả</th>
                                <th>Thể loại</th>
                                <th>Thương hiệu</th>
                                <th>Hình ảnh</th>
                                <th class="hidden-phone">Ngày tạo</th>
                                <th class="center hidden-phone">Trạng thái</th>
                                <th class="center hidden-phone">Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($products as $index => $product)
                                <tr class="gradeA">
                                    <td class="center">{{ $index + 1 }}</td>
                                    <td>{{ $product->name }}</td>
                                    <td>{{ $product->description }}</td>
                                    <td>
                                        {{ $product->category->name ?? 'Không có' }}
                                        @if ($product->category && $product->category->trashed())
                                            <span class="badge badge-danger">Đã xóa</span>
                                        @endif
                                    </td>
                                    <td>
                                        {{ $product->brand->name ?? 'Không có' }}
                                        @if ($product->brand && $product->brand->trashed())
                                            <span class="badge badge-danger">Đã xóa</span>
                                        @endif
                                    </td>
                                    <td>
                                        <img src="{{ asset('storage/' . $product->image) }}" alt="{{ $product->name }}" width="100">
                                    </td>
                                    <td class="hidden-phone">{{ $product->created_at->format('Y-m-d') }}</td>
                                    <td class="hidden-phone">
                                        @if ($product->trashed())
                                            <span class="badge badge-danger">Đã xóa</span>
                                        @else
                                            <span class="badge badge-success">Còn</span>
                                        @endif
                                    </td>
                                    <td class="center hidden-phone">
                                        @if ($product->trashed())
                                            <form action="{{ route('products.restore', $product->id) }}" method="POST" style="display:inline;">
                                                @csrf
                                                <button type="submit" class="btn btn-info btn-sm" title="Khôi phục">
                                                    <i class="fa fa-undo"></i> Phục hồi
                                                </button>
                                            </form>
                                        @else
                                            <a href="{{ route('products.edit', $product->id) }}" class="btn btn-warning btn-sm" title="Chỉnh sửa">
                                                <i class="fa fa-edit"></i> Sửa
                                            </a>
                                            <form action="{{ route('products.destroy', $product->id) }}" method="POST" style="display:inline;">
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
