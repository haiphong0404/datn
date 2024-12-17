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
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Thêm mới sản phẩm</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.products.index') }}" style="color: inherit;">Sản phẩm</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Thêm mới sản phẩm</li>
                            </ol>
                        </nav>
                    </div>
                </header>

                <div class="row">
                    <div class="col-sm-12">
                        <section class="card">
                            <div class="card-body">
                                <form action="{{ route('admin.products.store') }}" method="POST"
                                    enctype="multipart/form-data">
                                    @csrf
                                    <!-- Hình ảnh sản phẩm -->
                                    <div>
                                        <label for="image">Hình ảnh sản phẩm</label>
                                        <input type="file" name="image" class="form-control" accept="image/*">
                                    </div>
                                    <div class="form-group row mt-2">
                                        <!-- Tên sản phẩm -->
                                        <div class="col-md-6">
                                            <label for="name">Tên sản phẩm</label>
                                            <input type="text" name="name" class="form-control"
                                                placeholder="Nhập tên sản phẩm">
                                            @error('name')
                                                <div class="text-danger">{{ $message }}</div>
                                            @enderror
                                        </div>
                                        <!-- Giá sản phẩm -->
                                        <div class="col-md-6">
                                            <label for="price">Giá sản phẩm</label>
                                            <input type="number" step="0.01" class="form-control" id="price"
                                                name="price" placeholder="Nhập giá sản phẩm">
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <!-- Thể loại -->
                                        <div class="col-md-6">
                                            <label for="category_id">Thể loại</label>
                                            <select name="category_id" class="form-control">
                                                <option value="">Chọn thể loại</option>
                                                @foreach ($categories as $category)
                                                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <!-- Thương hiệu -->
                                        <div class="col-md-6">
                                            <label for="brand_id">Thương hiệu</label>
                                            <select name="brand_id" class="form-control">
                                                <option value="">Chọn thương hiệu</option>
                                                @foreach ($brands as $brand)
                                                    <option value="{{ $brand->id }}">{{ $brand->name }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>


                                    <!-- Mô tả -->
                                    <div>
                                        <label for="description">Mô tả</label>
                                        <textarea name="description" class="form-control" placeholder="Nhập mô tả" rows="3"></textarea>
                                    </div>

                                    <div class="form-group mt-4">
                                        <h4>Biến thể sản phẩm</h4>
                                        <div class="variants">
                                            <div class="variant mb-3">
                                                <div class="row">
                                                    <!-- Hình ảnh biến thể -->
                                                    <div class="col-md-12">
                                                        <label for="variant_images_0" class="form-label">Hình ảnh biến
                                                            thể</label>
                                                        <input type="file" name="variant_images_0[]"
                                                            class="form-control mb-2" accept="image/*" multiple>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <!-- Kích thước -->
                                                    <div class="col-md-6">
                                                        <label for="size_id">Kích thước</label>
                                                        <select name="sizes[]" class="form-control mb-2 size-select">
                                                            <option value="">Chọn kích thước</option>
                                                            @foreach ($sizes as $size)
                                                                <option value="{{ $size->id }}">{{ $size->name }}
                                                                </option>
                                                            @endforeach
                                                            <option value="new">Nhập kích thước mới</option>
                                                        </select>
                                                        <input type="text" name="new_sizes[]" class="form-control mb-2"
                                                            placeholder="Nhập kích thước mới" style="display:none;">
                                                    </div>

                                                    <!-- Màu sắc -->
                                                    <div class="col-md-6">
                                                        <label for="color_id">Màu sắc</label>
                                                        <select name="colors[]" class="form-control mb-2 color-select">
                                                            <option value="">Chọn màu sắc</option>
                                                            @foreach ($colors as $color)
                                                                <option value="{{ $color->id }}">{{ $color->name }}
                                                                </option>
                                                            @endforeach
                                                            <option value="new">Nhập màu sắc mới</option>
                                                        </select>
                                                        <input type="text" name="new_colors[]"
                                                            class="form-control mb-2" placeholder="Nhập màu sắc mới"
                                                            style="display:none;">
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <!-- Giá biến thể -->
                                                    <div class="col-md-6">
                                                        <label for="variant_price">Giá biến thể</label>
                                                        <input type="number" name="variant_prices[]"
                                                            class="form-control mb-2" placeholder="Nhập giá biến thể"
                                                            step="0.01">
                                                    </div>

                                                    <!-- Số lượng -->
                                                    <div class="col-md-6">
                                                        <label for="quantity">Số lượng</label>
                                                        <input type="number" name="variant_quantities[]"
                                                            class="form-control mb-2" placeholder="Nhập số lượng"
                                                            min="0">
                                                    </div>
                                                </div>



                                                <button type="button" class="btn btn-danger remove-variant">Xóa</button>
                                            </div>
                                        </div>
                                        <button type="button" class="btn btn-primary add-variant">Thêm biến thể</button>
                                    </div>

                                    <div class="mb-3 d-flex">
                                        <a href="{{ route('admin.products.index') }}"
                                            class="btn btn-secondary btn-lg flex-fill me-1">Quay
                                            lại</a>
                                        <button type="reset"
                                            class="btn btn-warning btn-lg flex-fill me-1">Reset</button>
                                        <button type="submit" class="btn btn-primary btn-lg flex-fill">Thêm Mới</button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        // Hiện thị trường nhập kích thước mới hoặc màu sắc mới khi chọn
        document.addEventListener('change', function(e) {
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

        document.querySelector('.add-variant').addEventListener('click', function() {
            const variantCount = document.querySelectorAll('.variant').length;
            const variantDiv = document.createElement('div');
            variantDiv.classList.add('variant', 'mb-3');
            variantDiv.innerHTML = `
                           <div class="row">
                                                    <!-- Hình ảnh biến thể -->
                                                   <div class="col-md-12">
                                                        <label for="variant_images_${variantCount}" class="form-label">Hình ảnh biến
                                                            thể</label>
                                                        <input type="file" name="variant_images_${variantCount}[]"
                                                            class="form-control mb-2" accept="image/*" multiple>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <!-- Kích thước -->
                                                    <div class="col-md-6">
                                                        <label for="size_id">Kích thước</label>
                                                        <select name="sizes[]" class="form-control mb-2 size-select">
                                                            <option value="">Chọn kích thước</option>
                                                            @foreach ($sizes as $size)
                                                                <option value="{{ $size->id }}">{{ $size->name }}</option>
                                                            @endforeach
                                                            <option value="new">Nhập kích thước mới</option>
                                                        </select>
                                                        <input type="text" name="new_sizes[]" class="form-control mb-2"
                                                               placeholder="Nhập kích thước mới" style="display:none;">
                                                    </div>
                                                
                                                    <!-- Màu sắc -->
                                                    <div class="col-md-6">
                                                        <label for="color_id">Màu sắc</label>
                                                        <select name="colors[]" class="form-control mb-2 color-select">
                                                            <option value="">Chọn màu sắc</option>
                                                            @foreach ($colors as $color)
                                                                <option value="{{ $color->id }}">{{ $color->name }}</option>
                                                            @endforeach
                                                            <option value="new">Nhập màu sắc mới</option>
                                                        </select>
                                                        <input type="text" name="new_colors[]" class="form-control mb-2"
                                                               placeholder="Nhập màu sắc mới" style="display:none;">
                                                    </div>
                                                </div>
                                                
                                                <div class="row">
                                                    <!-- Giá biến thể -->
                                                    <div class="col-md-6">
                                                        <label for="variant_price">Giá biến thể</label>
                                                        <input type="number" name="variant_prices[]" class="form-control mb-2"
                                                               placeholder="Nhập giá biến thể" step="0.01">
                                                    </div>
                                                
                                                    <!-- Số lượng -->
                                                    <div class="col-md-6">
                                                        <label for="quantity">Số lượng</label>
                                                        <input type="number" name="variant_quantities[]" class="form-control mb-2"
                                                               placeholder="Nhập số lượng" min="0">
                                                    </div>
                                                </div>
                    <button type="button" class="btn btn-danger remove-variant">Xóa</button>
            `;
            document.querySelector('.variants').appendChild(variantDiv);
        });

        document.querySelector('.variants').addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-variant')) {
                e.target.closest('.variant').remove();
            }
        });
    </script>
@endsection
