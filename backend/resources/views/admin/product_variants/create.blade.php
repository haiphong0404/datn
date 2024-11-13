@extends('admin.layout')

@section('title')
    Thêm mới biến thể cho sản phẩm: {{ $product->name }}
@endsection

@section('content')
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

    <h1>
        Thêm mới biến thể cho sản phẩm: {{ $product->name }}
    </h1>

    <form action="{{ route('admin.products.variants.store', $product->id) }}" method="POST" enctype="multipart/form-data">
        @csrf

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

        <div class="form-group">
            <label for="price">Giá</label>
            <input type="number" name="price" class="form-control" required>
        </div>

        <div class="form-group">
            <label for="quantity">Số lượng</label>
            <input type="number" name="quantity" class="form-control" required>
        </div>

        <div class="form-group">
            <label for="variant_images">Hình ảnh biến thể</label>
            <input type="file" name="variant_images[]" class="form-control" multiple>
        </div>

        <button type="submit" class="btn btn-success">Lưu biến thể</button>
        <a href="{{ route('admin.products.variants.index', $product->id) }}" class="btn btn-secondary">Hủy</a>
    </form>

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
