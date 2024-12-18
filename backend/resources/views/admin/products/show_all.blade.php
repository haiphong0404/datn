@extends('admin.layout')

@section('title', 'Chi tiết sản phẩm: ' . $product->name)

@section('content')
<div class="row">
    <div class="col-sm-12">
        <div class="card shadow-sm">
            <header class="card-header">
                <h1 class="fs-3 fw-semibold">Chi tiết sản phẩm: {{ $product->name }}</h1>
            </header>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6 text-center">
                        <img src="{{ asset('storage/' . $product->image) }}" class="img-fluid"
                            alt="{{ $product->name }}" style="max-width: 100%; height: auto;">
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3"><strong>Tên sản phẩm:</strong> {{ $product->name }}</div>
                        <div class="mb-3"><strong>Thể loại:</strong> {{ $product->category->name }}</div>
                        <div class="mb-3"><strong>Thương hiệu:</strong> {{ $product->brand->name }}</div>
                        <div class="mb-3"><strong>Giá:</strong> {{ number_format($product->price, 0, ',', '.') }} VNĐ
                        </div>
                        <div class="mb-3"><strong>Số lượng trong kho:</strong> {{ $product->total_quantity_in_stock }}
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <h5>Danh sách biến thể sản phẩm</h5>
                    <form action="{{ route('admin.products.updateVariants', $product->id) }}" method="POST">
                        @csrf
                        @method('PUT')
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr class="text-center">
                                        <th><input type="checkbox" id="select-all"></th>
                                        <th>Hình ảnh</th>
                                        <th>Kích thước</th>
                                        <th>Màu sắc</th>
                                        <th>Giá</th>
                                        <th>Số lượng hiện tại</th>
                                        @if (auth()->user()->hasRole(['admin']))
                                        <th>Số lượng thêm</th>
                                        @endif
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($product->variants as $variant)
                                        <tr>
                                            <td class="text-center">
                                                <input type="checkbox" name="selected_variants[]" value="{{ $variant->id }}"
                                                    class="select-variant">
                                            </td>
                                            <td class="text-center">
                                                <img src="{{ $variant->images->isNotEmpty() ? asset('storage/' . $variant->images->random()->image) : asset('default-image-path/default.jpg') }}"
                                                     style="width: 80px; height: auto; object-fit: cover;"
                                                     alt="Biến thể {{ $variant->id }}">

                                            </td>
                                            <td>{{ $variant->size->name ?? 'Không có' }}</td>
                                            <td>{{ $variant->color->name ?? 'Không có' }}</td>
                                            <td>{{ number_format($variant->price, 0, ',', '.') }} VNĐ</td>
                                            <td>{{ $variant->quantity }}</td>
                                            @if (auth()->user()->hasRole(['admin']))
                                            <td>
                                                <input type="number" name="additional_quantities[{{ $variant->id }}]"
                                                    class="form-control" min="0" placeholder="0" disabled>
                                            </td>
                                            @endif
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                        @if (auth()->user()->hasRole(['admin']))
                        <div class="d-flex justify-content-end mt-2">
                            <button type="submit" class="btn btn-primary">Cập nhật số lượng</button>
                        </div>
                        @endif
                    </form>
                </div>
                <div class="d-flex justify-content-end mt-4 mb-2">
                    <a href="{{ route('admin.products.index') }}" class="btn btn-secondary flex-fill me-1">Quay lại</a>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const selectAll = document.getElementById('select-all');
        const checkboxes = document.querySelectorAll('.select-variant');
        const quantityInputs = document.querySelectorAll('input[name^="additional_quantities"]');

        // Chọn tất cả
        selectAll.addEventListener('change', function () {
            checkboxes.forEach((checkbox, index) => {
                checkbox.checked = this.checked;
                quantityInputs[index].disabled = !this.checked;
            });
        });

        // Bật/Tắt trường số lượng khi chọn biến thể
        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', function () {
                quantityInputs[index].disabled = !this.checked;
            });
        });
    });
</script>
@endsection

