@extends('admin.layout')

@section('title')
    Chỉnh sửa sản phẩm
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

    <div class="row">
        <div class="col-sm-12">
            <section class="card">
                <header class="card-header">
                    Chỉnh sửa sản phẩm
                </header>
                <div class="card-body">
                    <form action="{{ route('admin.products.update', $product->id) }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="form-group">
                            <label for="name">Tên sản phẩm</label>
                            <input type="text" name="name" class="form-control" placeholder="Nhập tên sản phẩm" value="{{ $product->name }}">
                            @error('name')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        <div class="form-group">
                            <label for="description">Mô tả</label>
                            <textarea name="description" class="form-control" placeholder="Nhập mô tả" rows="3">{{ $product->description }}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="category_id">Thể loại</label>
                            <select name="category_id" class="form-control">
                                <option value="">Chọn thể loại</option>
                                @foreach($categories as $category)
                                    <option value="{{ $category->id }}" {{ $category->id == $product->category_id ? 'selected' : '' }}>{{ $category->name }}</option>
                                @endforeach
                            </select>
                            @error('category_id')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        <div class="form-group">
                            <label for="brand_id">Thương hiệu</label>
                            <select name="brand_id" class="form-control">
                                <option value="">Chọn thương hiệu</option>
                                @foreach($brands as $brand)
                                    <option value="{{ $brand->id }}" {{ $brand->id == $product->brand_id ? 'selected' : '' }}>{{ $brand->name }}</option>
                                @endforeach
                            </select>
                            @error('brand_id')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        <div class="form-group">
                            <label for="image">Hình ảnh</label>
                            <input type="file" name="image" class="form-control">
                            <img src="{{ asset('storage/' . $product->image) }}" alt="{{ $product->name }}" width="100">
                            @error('image')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">Cập nhật</button>
                            <a href="{{ route('admin.products.index') }}" class="btn btn-secondary">Quay lại</a>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    </div>
@endsection
