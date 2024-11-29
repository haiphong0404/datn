@extends('admin.layout')

@section('title')
    Thêm mới sản phẩm
@endsection

@section('content')
    @if (session()->has('error'))
        <div class="alert alert-danger">{{ session()->get('error') }}</div>
    @endif

    @if (session()->has('success'))
        <div class="alert alert-success">{{ session()->get('success') }}</div>
    @endif

    <div class="row">
        <div class="col-sm-12">
            <section class="card">
                <header class="card-header">Thêm mới sản phẩm</header>
                <div class="card-body">
                    <form action="{{ route('admin.products.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group">
                            <label for="name">Tên sản phẩm</label>
                            <input type="text" name="name" class="form-control" placeholder="Nhập tên sản phẩm" required>
                            @error('name')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="description">Mô tả</label>
                            <textarea name="description" class="form-control" placeholder="Nhập mô tả" rows="3"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="price">Giá sản phẩm</label>
                            <input type="number" step="0.01" class="form-control" name="price" placeholder="Nhập giá sản phẩm">
                        </div>

                        <div class="form-group">
                            <label for="category_id">Thể loại</label>
                            <select name="category_id" class="form-control">
                                <option value="">Chọn thể loại</option>
                                @foreach($categories as $category)
                                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="brand_id">Thương hiệu</label>
                            <select name="brand_id" class="form-control">
                                <option value="">Chọn thương hiệu</option>
                                @foreach($brands as $brand)
                                    <option value="{{ $brand->id }}">{{ $brand->name }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="image">Hình ảnh sản phẩm</label>
                            <input type="file" name="image" class="form-control" accept="image/*">
                        </div>

                        <!-- Biến thể sản phẩm -->
                        <div class="form-group">
                            <h4>Biến thể sản phẩm</h4>
                            <div class="variants">
                                <div class="variant mb-3">
                                    <label for="size_id">Kích thước</label>
                                    <select name="sizes[]" class="form-control mb-2 size-select">
                                        <option value="">Chọn kích thước</option>
                                        @foreach($sizes as $size)
                                            <option value="{{ $size->id }}">{{ $size->name }}</option>
                                        @endforeach
                                        <option value="new">Nhập kích thước mới</option>
                                    </select>
                                    <input type="text" name="new_sizes[]" class="form-control mb-2"
                                           placeholder="Nhập kích thước mới" style="display:none;">

                                    <label for="color_id">Màu sắc</label>
                                    <select name="colors[]" class="form-control mb-2 color-select">
                                        <option value="">Chọn màu sắc</option>
                                        @foreach($colors as $color)
                                            <option value="{{ $color->id }}">{{ $color->name }}</option>
                                        @endforeach
                                        <option value="new">Nhập màu sắc mới</option>
                                    </select>
                                    <input type="text" name="new_colors[]" class="form-control mb-2"
                                           placeholder="Nhập màu sắc mới" style="display:none;">

                                    <label for="variant_price">Giá biến thể</label>
                                    <input type="number" name="variant_prices[]" class="form-control mb-2"
                                           placeholder="Nhập giá biến thể" step="0.01">

                                    <label for="variant_quantity">Số lượng</label>
                                    <input type="number" name="variant_quantities[]" class="form-control mb-2"
                                           placeholder="Nhập số lượng" min="0">

                                    <label for="variant_images_0">Hình ảnh biến thể</label>
                                    <input type="file" name="variant_images_0[]" class="form-control mb-2"
                                           accept="image/*" multiple>

                                    <button type="button" class="btn btn-danger remove-variant">Xóa</button>
                                </div>
                            </div>
                            <button type="button" class="btn btn-primary add-variant">Thêm biến thể</button>
                        </div>

                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">Lưu</button>
                            <a href="{{ route('admin.products.index') }}" class="btn btn-secondary">Quay lại</a>
                        </div>
                    </form>
                </div>
            </section>
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
                <label for="size_id">Kích thước</label>
                <select name="sizes[]" class="form-control mb-2 size-select">
                    <option value="">Chọn kích thước</option>
                    @foreach($sizes as $size)
            <option value="{{ $size->id }}">{{ $size->name }}</option>
                    @endforeach
            <option value="new">Nhập kích thước mới</option>
        </select>
        <input type="text" name="new_sizes[]" class="form-control mb-2" placeholder="Nhập kích thước mới" style="display:none;">

        <label for="color_id">Màu sắc</label>
        <select name="colors[]" class="form-control mb-2 color-select">
            <option value="">Chọn màu sắc</option>
@foreach($colors as $color)
            <option value="{{ $color->id }}">{{ $color->name }}</option>
                    @endforeach
            <option value="new">Nhập màu sắc mới</option>
        </select>
        <input type="text" name="new_colors[]" class="form-control mb-2" placeholder="Nhập màu sắc mới" style="display:none;">

        <label for="variant_price">Giá biến thể</label>
        <input type="number" name="variant_prices[]" class="form-control mb-2" placeholder="Nhập giá biến thể" step="0.01">

        <label for="variant_quantity">Số lượng</label>
        <input type="number" name="variant_quantities[]" class="form-control mb-2" placeholder="Nhập số lượng" min="0">

        <label for="variant_images_${variantCount}">Hình ảnh biến thể</label>
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
