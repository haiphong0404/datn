@extends('admin.layout')

@section('title', 'Chi tiết sản phẩm: ' . $product->name)
@section('search')
    <form action="{{ route('admin.products.index') }}" method="GET">
        <div class="input-group mt-1">
            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm sản phẩm"
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
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Chi tiết sản phẩm: {{ $product->name }}</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.products.index') }}" style="color: inherit;">Sản phẩm</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Chi tiết sản phẩm</li>
                            </ol>
                        </nav>
                    </div>
                </header>
                <div class="card-body">
                    <div class="row">
                        <!-- Ảnh sản phẩm -->
                        <div class="col-md-6 text-center ">
                            <img src="{{ asset('storage/' . $product->image) }}" class="img-fluid"
                                alt="{{ $product->name }}" style="max-width: 100%; height: auto;">
                        </div>

                        <!-- Thông tin sản phẩm -->
                        <div class="col-md-6">
                            <div class="mb-3">
                                <strong>Tên sản phẩm:</strong>
                                {{ $product->name }}
                            </div>
                            <div class="mb-3">
                                <strong>Thể loại:</strong>
                                {{ $product->category->name }}
                            </div>
                            <div class="mb-3">
                                <strong>Thương hiệu:</strong>
                                {{ $product->brand->name }}
                            </div>
                            <div class="mb-3">
                                <strong>Giá:</strong>
                                {{ number_format($product->price, 0, ',', '.') }} VNĐ
                            </div>
                            <div class="mb-3">
                                <strong>Mô tả:</strong>
                                {{ $product->description }}
                            </div>

                            <div class="mb-3">
                                <strong>Số lượng nhập vào:</strong>
                                {{ $product->incoming_quantity }}
                            </div>
                            <div class="mb-3">
                                <strong>Số lượng còn trong kho:</strong>
                                {{ $product->total_quantity_in_stock }}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <!-- Thông tin biến thể (Sản phẩm con) -->
                        <h5 class="mt-3">Danh sách biến thể sản phẩm</h5>
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover">
                                    <thead class="thead-light">
                                        <tr>
                                            <th>Hình ảnh</th>
                                            <th>Kích thước</th>
                                            <th>Màu sắc</th>
                                            <th>Giá</th>
                                            <th>Số lượng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($product->variants as $variant)
                                            <tr>
                                                <!-- Hiển thị ảnh biến thể -->
                                                <td>
                                                    <img src="{{ asset('storage/' . $variant->images->random()->image) }}"
                                                        alt="Biến thể {{ $variant->id }}"
                                                        style="width: 80px; height: auto; object-fit: cover;">
                                                </td>
                                                <td>{{ $variant->size->name ?? 'Không có' }}</td>
                                                <td>{{ $variant->color->name ?? 'Không có' }}</td>
                                                <td>{{ number_format($variant->price, 0, ',', '.') }} VNĐ</td>
                                                <td>{{ $variant->quantity }}</td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                        </div>
                    </div>
                </div>


                <div class="d-flex justify-content-end mt-4 mb-2">
                    <a href="{{ route('admin.products.index') }}" class="btn btn-secondary flex-fill me-1">Quay lại</a>
                </div>
            </div>

        </div>
    </div>
    <!-- Nút quay lại danh sách sản phẩm -->

@endsection
