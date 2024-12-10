@extends('admin.layout')

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
                    <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Thêm Sản Phẩm</h1>
                    <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="{{ route('admin.products.index') }}" style="color: inherit;">Sản phẩm</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Thêm Sản Phẩm</li>
                        </ol>
                    </nav>
                </div>
            </header>

            <div class="card-body">
                @if (session()->has('error'))
                    <div class="alert alert-danger">{{ session()->get('error') }}</div>
                @endif

                @if (session()->has('success'))
                    <div class="alert alert-success">{{ session()->get('success') }}</div>
                @endif

                <form action="{{ route('admin.products.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                
                    <!-- Tên sản phẩm -->
                    <div class="form-group mb-3">
                        <label for="name" class="form-label">Tên sản phẩm</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-box"></i></span>
                            <input 
                                type="text" 
                                name="name" 
                                class="form-control" 
                                placeholder="Nhập tên sản phẩm" 
                                value="{{ old('name') }}" 
                                >
                        </div>
                        @error('name')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>
                
                    <!-- Mô tả -->
                    <div class="form-group mb-3">
                        <label for="description" class="form-label">Mô tả</label>
                        <textarea 
                            name="description" 
                            class="form-control" 
                            placeholder="Nhập mô tả" 
                            rows="3">{{ old('description') }}</textarea>
                        @error('description')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>
                
                    <!-- Giá sản phẩm -->
                    <div class="form-group mb-3">
                        <label for="price" class="form-label">Giá sản phẩm</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                            <input 
                                type="number" 
                                step="0.01" 
                                class="form-control" 
                                name="price" 
                                placeholder="Nhập giá sản phẩm" 
                                value="{{ old('price') }}">
                        </div>
                        @error('price')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>
                
                    <!-- Thể loại -->
                    <div class="form-group mb-3">
                        <label for="category_id" class="form-label">Thể loại</label>
                        <select name="category_id" class="form-select">
                            <option value="">Chọn thể loại</option>
                            @foreach($categories as $category)
                                <option value="{{ $category->id }}" {{ old('category_id') == $category->id ? 'selected' : '' }}>
                                    {{ $category->name }}
                                </option>
                            @endforeach
                        </select>
                        @error('category_id')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>
                
                    <!-- Thương hiệu -->
                    <div class="form-group mb-3">
                        <label for="brand_id" class="form-label">Thương hiệu</label>
                        <select name="brand_id" class="form-select">
                            <option value="">Chọn thương hiệu</option>
                            @foreach($brands as $brand)
                                <option value="{{ $brand->id }}" {{ old('brand_id') == $brand->id ? 'selected' : '' }}>
                                    {{ $brand->name }}
                                </option>
                            @endforeach
                        </select>
                        @error('brand_id')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>
                
                    <!-- Hình ảnh sản phẩm -->
                    <div class="form-group mb-3">
                        <label for="image" class="form-label">Hình ảnh sản phẩm</label>
                        <input 
                            type="file" 
                            name="image" 
                            class="form-control" 
                            accept="image/*">
                        @error('image')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>
                
                    <!-- Biến thể sản phẩm -->
                    <div class="form-group mb-4">
                        <h4>Biến thể sản phẩm</h4>
                        <div class="variants">
                            <div class="variant mb-3">
                                <label for="sizes" class="form-label">Kích thước</label>
                                <select name="sizes[]" class="form-select mb-2 size-select">
                                    <option value="">Chọn kích thước</option>
                                    @foreach($sizes as $size)
                                        <option value="{{ $size->id }}" {{ old('sizes.0') == $size->id ? 'selected' : '' }}>
                                            {{ $size->name }}
                                        </option>
                                    @endforeach
                                </select>
                                @error('sizes.0')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                
                                <label for="colors" class="form-label">Màu sắc</label>
                                <select name="colors[]" class="form-select mb-2 color-select">
                                    <option value="">Chọn màu sắc</option>
                                    @foreach($colors as $color)
                                        <option value="{{ $color->id }}" {{ old('colors.0') == $color->id ? 'selected' : '' }}>
                                            {{ $color->name }}
                                        </option>
                                    @endforeach
                                </select>
                                @error('colors.0')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                
                                <label for="variant_prices" class="form-label">Giá biến thể</label>
                                <input 
                                    type="number" 
                                    name="variant_prices[]" 
                                    class="form-control mb-2" 
                                    placeholder="Nhập giá biến thể" 
                                    value="{{ old('variant_prices.0') }}">
                                @error('variant_prices.0')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                
                                <label for="variant_quantities" class="form-label">Số lượng</label>
                                <input 
                                    type="number" 
                                    name="variant_quantities[]" 
                                    class="form-control mb-2" 
                                    placeholder="Nhập số lượng" 
                                    value="{{ old('variant_quantities.0') }}" 
                                    min="0">
                                @error('variant_quantities.0')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary add-variant">Thêm biến thể</button>
                    </div>
                
                    <!-- Nút hành động -->
                    <div class="mb-3 d-flex">
                        <a href="{{ route('admin.products.index') }}" class="btn btn-secondary btn-lg flex-fill me-1">Quay lại</a>
                        <button type="reset" class="btn btn-warning btn-lg flex-fill me-1">Reset</button>
                        <button type="submit" class="btn btn-primary btn-lg flex-fill">Thêm Mới</button>
                    </div>
                </form>
                                
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener('change', function (e) {
        if (e.target.classList.contains('size-select')) {
            const inputField = e.target.nextElementSibling;
            inputField.style.display = e.target.value === 'new' ? 'block' : 'none';
            if (e.target.value !== 'new') inputField.value = '';
        }

        if (e.target.classList.contains('color-select')) {
            const inputField = e.target.nextElementSibling;
            inputField.style.display = e.target.value === 'new' ? 'block' : 'none';
            if (e.target.value !== 'new') inputField.value = '';
        }
    });

    document.querySelector('.add-variant').addEventListener('click', function () {
        const variantCount = document.querySelectorAll('.variant').length;
        const variantDiv = document.createElement('div');
        variantDiv.classList.add('variant', 'mb-3');
        variantDiv.innerHTML = `
            <label for="size_id" class="form-label">Kích thước</label>
            <select name="sizes[]" class="form-select mb-2 size-select">
                <option value="">Chọn kích thước</option>
                @foreach($sizes as $size)
                    <option value="{{ $size->id }}">{{ $size->name }}</option>
                @endforeach
                <option value="new">Nhập kích thước mới</option>
            </select>
            <input type="text" name="new_sizes[]" class="form-control mb-2" placeholder="Nhập kích thước mới" style="display:none;">
    
            <label for="color_id" class="form-label">Màu sắc</label>
            <select name="colors[]" class="form-select mb-2 color-select">
                <option value="">Chọn màu sắc</option>
                @foreach($colors as $color)
                    <option value="{{ $color->id }}">{{ $color->name }}</option>
                @endforeach
                <option value="new">Nhập màu sắc mới</option>
            </select>
            <input type="text" name="new_colors[]" class="form-control mb-2" placeholder="Nhập màu sắc mới" style="display:none;">
    
            <label for="variant_price" class="form-label">Giá biến thể</label>
            <input type="number" name="variant_prices[]" class="form-control mb-2" placeholder="Nhập giá biến thể" step="0.01">
    
            <label for="variant_quantity" class="form-label">Số lượng</label>
            <input type="number" name="variant_quantities[]" class="form-control mb-2" placeholder="Nhập số lượng" min="0">
    
            <label for="variant_images_${variantCount}" class="form-label">Hình ảnh biến thể</label>
            <input type="file" name="variant_images_${variantCount}[]" class="form-control mb-2" accept="image/*" multiple>
    
            <button type="button" class="btn btn-danger remove-variant">Xóa</button>
        `;
        document.querySelector('.variants').appendChild(variantDiv);
    });

    document.querySelector('.variants').addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-variant')) {
            e.target.closest('.variant').remove();
        }
    });
</script>
@endsection
