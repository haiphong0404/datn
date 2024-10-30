@extends('admin.layout')

@section('title')
    Biến thể của sản phẩm: {{ $product->name }}
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

    <h1>
        <img src="{{ asset('storage/' . $product->image) }}" alt="{{ $product->name }}" width="200"
             style="margin-right: 10px;">
        Biến thể của sản phẩm: {{ $product->name }}
    </h1>

    <div class="mb-3">
        <a href="{{ route('admin.products.variants.create', $product->id) }}" class="btn btn-primary"><i
                class="fa fa-plus"></i> Thêm mới biến thể</a>
    </div>

    <div class="row">
        <div class="col-sm-12">
            <section class="card">
                <header class="card-header">
                    Danh sách biến thể
                    <span class="tools pull-right">
                        <a href="javascript:;" class="fa fa-chevron-down"></a>
                        <a href="javascript:;" class="fa fa-times"></a>
                    </span>
                </header>
                <div class="card-body">
                    <div class="adv-table">
                        <table class="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th class="center">ID</th>
                                <th>Kích thước</th>
                                <th>Màu sắc</th>
                                <th>Giá</th>
                                <th>Ảnh</th>
                                <th>Số lượng</th>
                                <th class="center hidden-phone">Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($product->variants as $index => $variant)
                                <tr class="gradeA">
                                    <td class="center">{{ $variant->id }}</td>
                                    <td>{{ $variant->size->name ?? 'Không có' }}</td>
                                    <td>{{ $variant->color->name ?? 'Không có' }}</td>
                                    <td>{{ number_format($variant->price, 0, ',', '.') }} VNĐ</td>
                                    <td>
                                        @if($variant->images->isNotEmpty())
                                            @foreach($variant->images as $image)
                                                <img src="{{ asset('storage/' . $image->image) }}"
                                                     alt="{{ $product->name }} - Biến thể {{ $variant->id }}" width="100" style="margin: 5px;">
                                            @endforeach
                                        @else
                                            <p>No images available for this variant.</p>
                                        @endif
                                    </td>

                                    <td>{{ $variant->quantity }}</td>
                                    <td class="center hidden-phone">
                                        <a href="{{ route('admin.products.variants.edit', [$product->id, $variant->id]) }}"
                                           class="btn btn-warning btn-sm" title="Chỉnh sửa">
                                            <i class="fa fa-edit"></i> Sửa
                                        </a>
                                        <form
                                            action="{{ route('admin.products.variants.destroy', [$product->id, $variant->id]) }}"
                                            method="POST" style="display:inline;">
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
                        <div class="form-group">
                            <a href="{{ route('admin.products.index') }}" class="btn btn-secondary">Quay lại</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
@endsection


