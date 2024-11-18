@extends('admin.layout')

@section('css')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<link href="{{ asset('assets')}}/admin/css/edit-voucher.css" rel="stylesheet">
@endsection

@section('content')
<!-- Hero -->
<div class="bg-body-light">
    <div class="content content-full">
        <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
            <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Chỉnh sửa mã giảm giá</h1>
            <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.vouchers.index') }}" style="color: inherit;">Vouchers</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Chỉnh sửa mã giảm giá</li>
                </ol>
            </nav>
        </div>
    </div>
</div>
<!-- END Hero -->

@if (session('success'))
<div class="alert alert-success">
    {{ session('success') }}
</div>
@endif

@if (session('error'))
<div class="alert alert-danger">
    {{ session('error') }}
</div>
@endif

<div class="content">
    <div class="block block-rounded mb-4">
        <div class="block-header block-header-default">
            <h4 class="block-title">Thông tin mã giảm giá</h4>
        </div>
        <div class="block-content">
            <form action="{{ route('admin.vouchers.update', $voucher->id) }}" method="POST">
                @csrf
                @method('PUT') <!-- Sử dụng phương thức PUT cho cập nhật -->

                <div class="mb-3">
                    <label for="code" class="form-label">Mã giảm giá</label>
                    <input type="text" class="form-control" id="code" name="code" value="{{ old('code', $voucher->code) }}" required>
                    @error('code')
                    <div class="text-danger">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="start_date" class="form-label">Ngày bắt đầu</label>
                    <input type="date" class="form-control" id="start_date" name="start_date" value="{{ old('start_date', $voucher->start_date) }}" required>
                    @error('start_date')
                    <div class="text-danger">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="expiration_date" class="form-label">Ngày hết hạn</label>
                    <input type="date" class="form-control" id="expiration_date" name="expiration_date" value="{{ old('expiration_date', $voucher->expiration_date) }}" required>
                    @error('expiration_date')
                    <div class="text-danger">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="type" class="form-label">Loại mã giảm giá</label>
                    <select class="form-select" id="type" name="type" required>
                        <option value="">Chọn loại mã giảm giá</option>
                        <option value="percentage" {{ old('type', $voucher->type) == 'percentage' ? 'selected' : '' }}>Giảm giá theo phần trăm</option>
                        <option value="fixed" {{ old('type', $voucher->type) == 'fixed' ? 'selected' : '' }}>Giảm giá cố định</option>
                        <option value="category_discount" {{ old('type', $voucher->type) == 'category_discount' ? 'selected' : '' }}>Giảm giá theo danh mục</option>
                        <option value="first_order" {{ old('type', $voucher->type) == 'first_order' ? 'selected' : '' }}>Giảm giá cho đơn hàng đầu tiên</option>
                    </select>
                    @error('type')
                    <div class="text-danger">{{ $message }}</div>
                    @enderror
                </div>

                <div id="discount-details" class="mb-3" style="display:none;">
                    <div class="mb-3" id="discount_value_group" style="display:none;">
                        <label for="discount_value" class="form-label">Giá trị giảm</label>
                        <input type="number" class="form-control" id="discount_value" name="discount_value" value="{{ old('discount_value', $voucher->discount_value) }}">
                        @error('discount_value')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3" id="min_order_value_group" style="display:none;">
                        <label for="min_order_value" class="form-label">Giá trị tối thiểu của đơn hàng</label>
                        <input type="number" class="form-control" id="min_order_value" name="min_order_value" value="{{ old('min_order_value', $voucher->min_order_value) }}">
                        @error('min_order_value')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3" id="discount_percentage_group" style="display:none;">
                        <label for="discount_percentage" class="form-label">Phần trăm chiết khấu</label>
                        <input type="number" class="form-control" id="discount_percentage" name="discount_percentage" value="{{ old('discount_percentage', $voucher->discount_percentage) }}">
                        @error('discount_percentage')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3" id="max_discount_value_group" style="display:none;">
                        <label for="max_discount_value" class="form-label">Giá trị chiết khấu tối đa</label>
                        <input type="number" class="form-control" id="max_discount_value" name="max_discount_value" value="{{ old('max_discount_value', $voucher->max_discount_value) }}">
                        @error('max_discount_value')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3" id="category_id_group" style="display:none;">
                        <label for="category_id" class="form-label">Danh mục áp dụng</label>
                        <select class="form-select" id="category_id" name="category_id">
                            @foreach($categories as $category)
                            <option value="{{ $category->id }}" {{ old('category_id', $voucher->category_id) == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
                            @endforeach
                        </select>
                        @error('category_id')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="mb-3">
                    <label for="quantity" class="form-label">Số lượng</label>
                    <input type="number" class="form-control" id="quantity" name="quantity" value="{{ old('quantity', $voucher->quantity) }}" required>
                    @error('quantity')
                    <div class="text-danger">{{ $message }}</div>
                    @enderror
                </div>

                <button type="submit" class="btn btn-primary">Cập nhật mã giảm giá</button>
            </form>
        </div>
    </div>
</div>
@endsection

@section('js')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const typeSelect = document.getElementById('type');
        const discountDetails = document.getElementById('discount-details');
        const discountValueGroup = document.getElementById('discount_value_group');
        const minOrderValueGroup = document.getElementById('min_order_value_group');
        const discountPercentageGroup = document.getElementById('discount_percentage_group');
        const maxDiscountValueGroup = document.getElementById('max_discount_value_group');
        const categoryIdGroup = document.getElementById('category_id_group');

        function toggleFields() {
            discountDetails.style.display = 'block';

            // Reset all fields
            discountValueGroup.style.display = 'none';
            minOrderValueGroup.style.display = 'none';
            discountPercentageGroup.style.display = 'none';
            maxDiscountValueGroup.style.display = 'none';
            categoryIdGroup.style.display = 'none';

            // Show relevant fields based on voucher type
            const type = typeSelect.value;
            if (type === 'percentage') {
                discountPercentageGroup.style.display = 'block';
                maxDiscountValueGroup.style.display = 'block';
            } else if (type === 'fixed') {
                discountValueGroup.style.display = 'block';
                minOrderValueGroup.style.display = 'block';
            } else if (type === 'category_discount') {
                discountPercentageGroup.style.display = 'block';
                maxDiscountValueGroup.style.display = 'block';
                categoryIdGroup.style.display = 'block';
            }
        }

        typeSelect.addEventListener('change', toggleFields);
        toggleFields(); // Gọi hàm khi trang tải xong
    });
</script>
@endsection
