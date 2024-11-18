@extends('admin.layout')

@section('title', 'Chi tiết sản phẩm: ' . $product->name)

@section('content')
    <div class="row">
        <div class="col-md-6">
            <!-- Thông tin sản phẩm (Sản phẩm cha) -->
            <section class="card">
                <header class="card-header">
                    <h5>Chi tiết sản phẩm: {{ $product->name }}</h5>
                </header>
                <div class="card-body">
                    <!-- Ảnh sản phẩm -->
                    <div class="text-center mb-4">
                        <img src="{{ asset('storage/' . $product->image) }}" class="img-fluid"
                             alt="{{ $product->name }}" style="max-width: 100%; height: auto;">
                    </div>
                    <!-- Thông tin sản phẩm -->
                    <div class="mb-3">
                        <strong>Tên sản phẩm:</strong>
                        <p>{{ $product->name }}</p>
                    </div>
                    <div class="mb-3">
                        <strong>Thể loại:</strong>
                        <p>{{ $product->category->name }}</p>
                    </div>
                    <div class="mb-3">
                        <strong>Thương hiệu:</strong>
                        <p>{{ $product->brand->name }}</p>
                    </div>
                    <div class="mb-3">
                        <strong>Mô tả:</strong>
                        <p>{{ $product->description }}</p>
                    </div>
                    <div class="mb-3">
                        <strong>Giá:</strong>
                        <p>{{ number_format($product->price, 0, ',', '.') }} VNĐ</p>
                    </div>
                    <div class="mb-3">
                        <strong>Số lượng nhập vào :</strong>
                        <p>{{ $product->incoming_quantity }}</p>
                    </div>
                    <div class="mb-3">
                        <strong>Số lượng còn trong kho:</strong>
                        <p>{{ $product->total_quantity_in_stock }}</p>
                    </div>
                </div>
            </section>
        </div>

        <div class="col-md-6">
            <!-- Thông tin biến thể (Sản phẩm con) -->
            <section class="card">
                <header class="card-header">
                    <strong>Danh sách biến thể sản phẩm</strong>
                </header>
                <div class="card-body">
                    <div class="row">
                        @foreach($product->variants as $variant)
                            <div class="col-md-6 mb-4">
                                <a href="{{ route('admin.products.variants.edit', [$product->id, $variant->id]) }}" class="card-link">
                                    <div class="card shadow-sm">
                                        <!-- Hiển thị ảnh biến thể -->
                                        <img src="{{ asset('storage/' . $variant->images->random()->image) }}"
                                             class="card-img-top" alt="Biến thể {{ $variant->id }}" style="max-height: 200px; object-fit: cover;">
                                        <div class="card-body">
                                            <h5 class="card-title">Biến thể ID: {{ $variant->id }}</h5>
                                            <p class="card-text">
                                                <strong>Kích thước:</strong> {{ $variant->size->name ?? 'Không có' }}<br>
                                                <strong>Màu sắc:</strong> {{ $variant->color->name ?? 'Không có' }}<br>
                                                <strong>Giá:</strong> {{ number_format($variant->price, 0, ',', '.') }} VNĐ<br>
                                                <strong>Số lượng:</strong> {{ $variant->quantity }}<br>
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        @endforeach
                    </div>
                </div>
            </section>
        </div>

    </div>

    <!-- Nút quay lại danh sách sản phẩm -->
    <div class="form-group mt-4">
        <a href="{{ route('admin.products.index') }}" class="btn btn-secondary">Quay lại danh sách sản phẩm</a>
    </div>
@endsection
