@extends('admin.layout')

@section('title')
    Chỉnh sửa biến thể của sản phẩm: {{ $product->name }}
@endsection

@section('content')
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

    <h1>
        Chỉnh sửa biến thể của sản phẩm: {{ $product->name }}
    </h1>

    <form action="{{ route('admin.products.variants.update', [$product->id, $variant->id]) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')

        <div class="form-group">
            <label for="size_id">Kích thước</label>
            <select name="size_id" id="size_id" class="form-control" required>
                <option value="">Chọn kích thước</option>
                @foreach ($sizes as $size)
                    <option value="{{ $size->id }}" {{ $variant->size_id == $size->id ? 'selected' : '' }}>
                        {{ $size->name }}
                    </option>
                @endforeach
                <option value="new">Kích thước mới</option>
            </select>
            <input type="text" name="new_size" class="form-control mt-2" placeholder="Nhập kích thước mới (nếu có)" style="display: none;" id="new_size_input">
        </div>

        <div class="form-group">
            <label for="color_id">Màu sắc</label>
            <select name="color_id" id="color_id" class="form-control" required>
                <option value="">Chọn màu sắc</option>
                @foreach ($colors as $color)
                    <option value="{{ $color->id }}" {{ $variant->color_id == $color->id ? 'selected' : '' }}>
                        {{ $color->name }}
                    </option>
                @endforeach
                <option value="new">Màu sắc mới</option>
            </select>
            <input type="text" name="new_color" class="form-control mt-2" placeholder="Nhập màu sắc mới (nếu có)" style="display: none;" id="new_color_input">
        </div>

        <div class="form-group">
            <label for="price">Giá</label>
            <input type="number" name="price" class="form-control" value="{{ $variant->price }}" required>
        </div>

        <div class="form-group">
            <label for="quantity">Số lượng</label>
            <input type="number" name="quantity" class="form-control" value="{{ $variant->quantity }}" required>
        </div>

        <div class="form-group">
            <label for="variant_images">Hình ảnh biến thể</label>
            <input type="file" name="variant_images[]" class="form-control" multiple>

            @if ($variant->images->isNotEmpty())
                <div class="mt-3">
                    <p>Hình ảnh hiện tại:</p>
                    <div class="d-flex flex-wrap">
                        @foreach ($variant->images as $image)
                            <div class="me-2 mb-2">
                                <img src="{{ asset('storage/' . $image->image) }}" alt="Variant Image" width="80">
                            </div>
                        @endforeach
                    </div>
                </div>
            @endif
        </div>

        <button type="submit" class="btn btn-success">Cập nhật biến thể</button>
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
