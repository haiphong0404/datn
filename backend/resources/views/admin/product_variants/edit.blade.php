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
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">
                            Chỉnh sửa biến thể của sản phẩm: {{ $product->name }}
                        </h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.products.index') }}" style="color: inherit;">Sản phẩm</a>
                                </li>
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.products.variants.index', $product->id) }}"
                                        style="color: inherit;">Biến thể</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Chỉnh sửa</li>
                            </ol>
                        </nav>
                    </div>
                </header>

                <div class="card-body">
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

                    @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form action="{{ route('admin.products.variants.update', [$product->id, $variant->id]) }}"
                        method="POST" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="form-group mb-3">
                            <label for="variant_images" class="form-label">Hình ảnh biến thể</label>
                            <div class="d-flex ">
                                @if ($variant->images->isNotEmpty())
                                    @foreach ($variant->images as $image)
                                        <div class="mr-3">
                                            <img src="{{ asset('storage/' . $image->image) }}" alt="Variant Image"
                                                width="100" ><br>
                                        </div>
                                    @endforeach
                                @else
                                    <p class="text-muted">Chưa có hình ảnh nào cho biến thể này.</p>
                                @endif
                            </div>
                            <label class="form-label"><strong>Thay đổi hình ảnh:</strong></label>
                            <input type="file" name="variant_images[]" class="form-control" >
                            @error('variant_images')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        
                        <div class="form-group mb-3">
                            <label for="size_id">Kích thước</label>
                            <select name="size_id" id="size_id" class="form-control">
                                <option value="">Chọn kích thước</option>
                                @foreach ($sizes as $size)
                                    <option value="{{ $size->id }}"
                                        {{ $variant->size_id == $size->id ? 'selected' : '' }}>
                                        {{ $size->name }}
                                    </option>
                                @endforeach
                                <option value="new">Kích thước mới</option>
                            </select>
                            <input type="text" name="new_size" class="form-control mt-2"
                                placeholder="Nhập kích thước mới (nếu có)" style="display: none;" id="new_size_input">
                        </div>

                        <div class="form-group mb-3">
                            <label for="color_id">Màu sắc</label>
                            <select name="color_id" id="color_id" class="form-control">
                                <option value="">Chọn màu sắc</option>
                                @foreach ($colors as $color)
                                    <option value="{{ $color->id }}"
                                        {{ $variant->color_id == $color->id ? 'selected' : '' }}>
                                        {{ $color->name }}
                                    </option>
                                @endforeach
                                <option value="new">Màu sắc mới</option>
                            </select>
                            <input type="text" name="new_color" class="form-control mt-2"
                                placeholder="Nhập màu sắc mới (nếu có)" style="display: none;" id="new_color_input">
                        </div>

                        <div class="form-group mb-3">
                            <label for="price">Giá</label>
                            <input type="number" name="price" class="form-control" value="{{ $variant->price }}"
                                required>
                        </div>

                        <div class="form-group mb-3">
                            <label for="quantity">Số lượng</label>
                            <input type="number" name="quantity" class="form-control" value="{{ $variant->quantity }}"
                                required>
                        </div>



                        <div class="d-flex">
                            <a href="{{ route('admin.products.variants.index', $product->id) }}"
                                class="btn btn-secondary btn-lg flex-fill me-1">Quay lại</a>
                            <button type="reset" class="btn btn-warning btn-lg flex-fill me-1">Reset</button>
                            <button type="submit" class="btn btn-primary btn-lg flex-fill">Cập nhật biến thể</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Hiển thị input cho kích thước mới
        document.getElementById('size_id').addEventListener('change', function() {
            document.getElementById('new_size_input').style.display = this.value === 'new' ? 'block' : 'none';
        });

        // Hiển thị input cho màu sắc mới
        document.getElementById('color_id').addEventListener('change', function() {
            document.getElementById('new_color_input').style.display = this.value === 'new' ? 'block' : 'none';
        });
    </script>
@endsection
