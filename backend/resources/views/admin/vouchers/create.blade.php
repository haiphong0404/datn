@extends('admin.layout')

@section('css')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<link href="{{ asset('assets') }}/admin/css/create-voucher.css" rel="stylesheet">
@endsection
@section('search')
    <form action="{{ route('admin.vouchers.index') }}" method="GET">
        <div class="input-group mt-1">
            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm mã giảm giá"
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
                    <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Tạo mới mã giảm giá</h1>
                    <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="{{ route('admin.vouchers.index') }}" style="color: inherit;">Vouchers</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Tạo mã giảm giá</li>
                        </ol>
                    </nav>
                </div>
            </header>

            <div class="card-body">
                @if (session('success'))
                <div class="alert alert-success">{{ session('success') }}</div>
                @endif

                @if (session('error'))
                <div class="alert alert-danger">{{ session('error') }}</div>
                @endif

                <form action="{{ route('admin.vouchers.store') }}" method="POST">
                    @csrf
                    <div class="form-group mb-3">
                        <label for="code" class="form-label">Mã giảm giá</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-tag"></i></span>
                            <input type="text" class="form-control" id="code" name="code" value="{{ old('code') }}" required>
                        </div>
                        @error('code')
                        <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="form-group mb-3">
                        <label for="start_date" class="form-label">Ngày bắt đầu</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-calendar-alt"></i></span>
                            <input type="date" class="form-control" id="start_date" name="start_date" value="{{ old('start_date') }}" required>
                        </div>
                        @error('start_date')
                        <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="form-group mb-3">
                        <label for="expiration_date" class="form-label">Ngày hết hạn</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-calendar-times"></i></span>
                            <input type="date" class="form-control" id="expiration_date" name="expiration_date" value="{{ old('expiration_date') }}" required>
                        </div>
                        @error('expiration_date')
                        <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="form-group mb-3">
                        <label for="type" class="form-label">Loại mã giảm giá</label>
                        <select class="form-select" id="type" name="type" required>
                            <option value="">Chọn loại mã giảm giá</option>
                            <option value="percentage" {{ old('type') == 'percentage' ? 'selected' : '' }}>Giảm giá theo phần trăm</option>
                            <option value="fixed" {{ old('type') == 'fixed' ? 'selected' : '' }}>Giảm giá cố định</option>
                            <option value="category_discount" {{ old('type') == 'category_discount' ? 'selected' : '' }}>Giảm giá theo danh mục</option>
                            <option value="first_order" {{ old('type') == 'first_order' ? 'selected' : '' }}>Giảm giá cho đơn hàng đầu tiên</option>
                        </select>
                        @error('type')
                        <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <div id="discount-details" class="mb-3" style="display:none;">
                        <div class="form-group mb-3" id="discount_value_group" style="display:none;">
                            <label for="discount_value" class="form-label">Giá trị giảm</label>
                            <input type="number" class="form-control" id="discount_value" name="discount_value" value="{{ old('discount_value') }}">
                            @error('discount_value')
                            <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group mb-3" id="min_order_value_group" style="display:none;">
                            <label for="min_order_value" class="form-label">Giá trị tối thiểu của đơn hàng</label>
                            <input type="number" class="form-control" id="min_order_value" name="min_order_value" value="{{ old('min_order_value') }}">
                            @error('min_order_value')
                            <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group mb-3" id="discount_percentage_group" style="display:none;">
                            <label for="discount_percentage" class="form-label">Phần trăm chiết khấu</label>
                            <input type="number" class="form-control" id="discount_percentage" name="discount_percentage" value="{{ old('discount_percentage') }}">
                            @error('discount_percentage')
                            <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group mb-3" id="max_discount_value_group" style="display:none;">
                            <label for="max_discount_value" class="form-label">Giá trị chiết khấu tối đa</label>
                            <input type="number" class="form-control" id="max_discount_value" name="max_discount_value" value="{{ old('max_discount_value') }}">
                            @error('max_discount_value')
                            <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group mb-3" id="category_id_group" style="display:none;">
                            <label for="category_id" class="form-label">Danh mục áp dụng</label>
                            <select class="form-select" id="category_id" name="category_id">
                                @foreach($categories as $category)
                                <option value="{{ $category->id }}" {{ old('category_id') == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
                                @endforeach
                            </select>
                            @error('category_id')
                            <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label for="quantity" class="form-label">Số lượng</label>
                        <input type="number" class="form-control" id="quantity" name="quantity" value="{{ old('quantity') }}" required>
                        @error('quantity')
                        <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="d-flex">
                        <a href="{{ route('admin.vouchers.index') }}" class="btn btn-secondary btn-lg flex-fill me-1">Quay lại</a>
                        <button type="reset" class="btn btn-warning btn-lg flex-fill me-1">Reset</button>
                        <button type="submit" class="btn btn-primary btn-lg flex-fill">Thêm Mới</button>
                    </div>
                </form>
            </div>
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

        typeSelect.addEventListener('change', function() {
            discountDetails.style.display = 'block';

            // Reset all fields
            discountValueGroup.style.display = 'none';
            minOrderValueGroup.style.display = 'none';
            discountPercentageGroup.style.display = 'none';
            maxDiscountValueGroup.style.display = 'none';
            categoryIdGroup.style.display = 'none';

            // Hiển thị các trường dựa trên loại voucher đã chọn
            if (this.value === 'percentage') {
                discountPercentageGroup.style.display = 'block';
                maxDiscountValueGroup.style.display = 'block';
            } else if (this.value === 'fixed') {
                discountValueGroup.style.display = 'block';
                minOrderValueGroup.style.display = 'block';
            } else if (this.value === 'category_discount') {
                discountPercentageGroup.style.display = 'block';
                categoryIdGroup.style.display = 'block';
            } else if (this.value === 'first_order') {
                discountValueGroup.style.display = 'block';
                minOrderValueGroup.style.display = 'block';
            }
        });
    });
</script>
@endsection