@extends('admin.layout')

@section('title', 'Chi tiết biến thể sản phẩm: ' . $variant->id)

@section('content')
    <div class="row">
        <div class="col-md-6">
            <!-- Thông tin biến thể -->
            <section class="card">
                <header class="card-header">
                    <strong>Chi tiết biến thể sản phẩm</strong>
                </header>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <!-- Hiển thị ảnh biến thể -->
                            @if ($variant->images->isNotEmpty())
                                <img src="{{ asset('storage/' . $variant->images->random()->image) }}"
                                     class="img-fluid" alt="Biến thể {{ $variant->id }}">
                            @else
                                <p>Không có ảnh cho biến thể này.</p>
                            @endif
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="size">Kích thước:</label>
                                <p>{{ $variant->size->name ?? 'Không có' }}</p>
                            </div>
                            <div class="form-group">
                                <label for="color">Màu sắc:</label>
                                <p>{{ $variant->color->name ?? 'Không có' }}</p>
                            </div>
                            <div class="form-group">
                                <label for="price">Giá:</label>
                                <p>{{ number_format($variant->price, 0, ',', '.') }} VNĐ</p>
                            </div>
                            <div class="form-group">
                                <label for="quantity">Số lượng:</label>
                                <p>{{ $variant->quantity }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Nút Sửa -->
                    <div class="form-group row">
                        <div class="col-sm-10 offset-sm-2">
                            <a href="{{ route('admin.products.variants.edit', [$product->id, $variant->id]) }}" class="btn btn-warning">
                                <i class="fa fa-edit"></i> Sửa biến thể
                            </a>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-sm-10 offset-sm-2">
                            <a href="{{ route('admin.products.variants.index', $product->id) }}" class="btn btn-secondary">Quay lại danh sách biến thể</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
@endsection
