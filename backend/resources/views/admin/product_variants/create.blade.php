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
                            Thêm mới biến thể cho sản phẩm: {{ $product->name }}
                        </h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.products.index') }}" style="color: inherit;">Sản phẩm</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Thêm biến thể</li>
                            </ol>
                        </nav>
                    </div>
                </header>

                <div class="row">
                    <div class="col-sm-12">
                        <section class="card">
                            <div class="card-body">
                                @if ($errors->any())
                                    <div class="alert alert-danger">
                                        <ul>
                                            @foreach ($errors->all() as $error)
                                                <li>{{ $error }}</li>
                                            @endforeach
                                        </ul>
                                    </div>
                                @endif

                                @if (session()->has('success'))
                                    <div class="alert alert-success">
                                        {{ session()->get('success') }}
                                    </div>
                                @endif

                                <form action="{{ route('admin.products.variants.store', $product->id) }}" method="POST" enctype="multipart/form-data">
                                    @csrf

                                    <!-- Kích thước -->
                                    <div class="form-group">
                                        <label for="size_id">Kích thước</label>
                                        <select name="size_id" id="size_id" class="form-control" required>
                                            <option value="">Chọn kích thước</option>
                                            @foreach ($sizes as $size)
                                                <option value="{{ $size->id }}">{{ $size->name }}</option>
                                            @endforeach
                                            <option value="new">Kích thước mới</option>
                                        </select>
                                        <input type="text" name="new_size" class="form-control mt-2" placeholder="Nhập kích thước mới (nếu có)" style="display:none;" id="new_size_input">
                                    </div>

                                    <!-- Màu sắc -->
                                    <div class="form-group">
                                        <label for="color_id">Màu sắc</label>
                                        <select name="color_id" id="color_id" class="form-control" required>
                                            <option value="">Chọn màu sắc</option>
                                            @foreach ($colors as $color)
                                                <option value="{{ $color->id }}">{{ $color->name }}</option>
                                            @endforeach
                                            <option value="new">Màu sắc mới</option>
                                        </select>
                                        <input type="text" name="new_color" class="form-control mt-2" placeholder="Nhập màu sắc mới (nếu có)" style="display:none;" id="new_color_input">
                                    </div>

                                    <!-- Giá -->
                                    <div class="form-group">
                                        <label for="price">Giá</label>
                                        <input type="number" name="price" class="form-control" required>
                                    </div>

                                    <!-- Số lượng -->
                                    <div class="form-group">
                                        <label for="quantity">Số lượng</label>
                                        <input type="number" name="quantity" class="form-control" required>
                                    </div>

                                    <!-- Hình ảnh -->
                                    <div class="form-group">
                                        <label for="variant_images">Hình ảnh biến thể</label>
                                        <input type="file" name="variant_images[]" class="form-control" multiple>
                                    </div>

                                    <!-- Nút hành động -->
                                    <div class="d-flex">
                                        <a href="{{ route('admin.products.variants.index', $product->id) }}" class="btn btn-secondary btn-lg flex-fill me-1">Quay lại</a>
                                        <button type="reset" class="btn btn-warning btn-lg flex-fill me-1">Reset</button>
                                        <button type="submit" class="btn btn-primary btn-lg flex-fill">Lưu biến thể</button>
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
        document.getElementById('size_id').addEventListener('change', function() {
            document.getElementById('new_size_input').style.display = this.value === 'new' ? 'block' : 'none';
        });

        document.getElementById('color_id').addEventListener('change', function() {
            document.getElementById('new_color_input').style.display = this.value === 'new' ? 'block' : 'none';
        });
    </script>
@endsection
