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
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Chỉnh Sửa Sản Phẩm</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.products.index') }}" style="color: inherit;">Sản phẩm</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Chỉnh sửa sản phẩm</li>
                            </ol>
                        </nav>
                    </div>
                </header>

                <div class="card-body">
                    <form action="{{ route('admin.products.update', $product->id) }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        
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
                        <div class="form-group mb-3">
                            <label for="image" class="form-label">Hình ảnh</label>
                            <div class="d-flex flex-column align-items-center">
                                <img src="{{ asset('storage/' . $product->image) }}" alt="{{ $product->name }}" class="img-thumbnail" width="100" style="margin-bottom: 10px;">
                                <label class="form-label"><strong>Thay đổi hình ảnh:</strong></label>
                                <input type="file" name="image" class="form-control" style="width: auto;">
                            </div>
                            @error('image')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        <div class="form-group mb-3">
                            <label for="name" class="form-label">Tên sản phẩm</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-box"></i></span>
                                <input type="text" name="name" class="form-control" placeholder="Nhập tên sản phẩm" value="{{ old('name', $product->name) }}">
                            </div>
                            @error('name')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>

                        

                        <div class="form-group mb-3">
                            <label for="price" class="form-label">Giá sản phẩm</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                                <input type="number" step="0.01" class="form-control" id="price" name="price" value="{{ old('price', $product->price) }}">
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label for="description" class="form-label">Mô tả</label>
                            <textarea name="description" class="form-control" placeholder="Nhập mô tả" rows="3">{{ old('description', $product->description) }}</textarea>
                        </div>
                        <div class="form-group mb-3">
                            <label for="category_id" class="form-label">Thể loại</label>
                            <select name="category_id" class="form-select">
                                <option value="">Chọn thể loại</option>
                                @foreach($categories as $category)
                                    <option value="{{ $category->id }}" {{ $category->id == $product->category_id ? 'selected' : '' }}>{{ $category->name }}</option>
                                @endforeach
                            </select>
                            @error('category_id')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="form-group mb-3">
                            <label for="brand_id" class="form-label">Thương hiệu</label>
                            <select name="brand_id" class="form-select">
                                <option value="">Chọn thương hiệu</option>
                                @foreach($brands as $brand)
                                    <option value="{{ $brand->id }}" {{ $brand->id == $product->brand_id ? 'selected' : '' }}>{{ $brand->name }}</option>
                                @endforeach
                            </select>
                            @error('brand_id')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>

                        

                        <div class="mb-3 d-flex">
                            <a href="{{ route('admin.products.index') }}" class="btn btn-secondary btn-lg flex-fill me-1">Quay lại</a>
                            <button type="reset" class="btn btn-warning btn-lg flex-fill me-1">Reset</button>
                            <button type="submit" class="btn btn-primary btn-lg flex-fill">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
