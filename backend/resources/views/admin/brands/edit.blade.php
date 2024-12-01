@extends('admin.layout')

@section('search')
    <form action="{{ route('admin.brands.index') }}" method="GET">
        <div class="input-group mt-1">
            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm thương hiệu"
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
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Cập nhật thương hiệu</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.brands.index') }}" style="color: inherit;">Brands</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Cập nhật thương hiệu</li>
                            </ol>
                        </nav>
                    </div>
                </header>

                <div class="card-body">
                    <form action="{{ route('admin.brands.update', $brand) }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')

                        <!-- Tên thương hiệu -->
                        <div class="form-group mb-3">
                            <label for="name" class="form-label"><strong>Tên thương hiệu:</strong></label>
                            <input type="text" class="form-control" id="name" name="name" value="{{ old('name', $brand->name) }}" placeholder="Nhập tên thương hiệu">
                            @error('name')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Mô tả -->
                        <div class="form-group mb-3">
                            <label for="description" class="form-label"><strong>Mô tả:</strong></label>
                            <textarea class="form-control" id="description" name="description" rows="4" placeholder="Nhập mô tả thương hiệu">{{ old('description', $brand->description) }}</textarea>
                            @error('description')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Địa chỉ bản đồ -->
                        <div class="form-group mb-3">
                            <label for="link" class="form-label"><strong>Đường dẫn bản đồ:</strong></label>
                            <input type="url" class="form-control" id="link" name="link" value="{{ old('link', $brand->link) }}" placeholder="Nhập đường dẫn Google Maps">
                            @error('link')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Ảnh đại diện -->
                        <div class="form-group mb-3">
                            <label for="image" class="form-label"><strong>Ảnh đại diện:</strong></label>
                            <input type="file" class="form-control" id="image" name="image" accept="image/*">
                            @if($brand->image)
                                <div class="d-flex justify-content-center">
                                    <img src="{{ Storage::url($brand->image) }}" width="100" height="50" alt="Ảnh đại diện hiện tại" class="mt-2 img-thumbnail">
                                </div>
                            @endif
                            @error('image')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="mb-3 d-flex">
                            <a href="{{ route('admin.brands.index') }}" class="btn btn-secondary btn-lg flex-fill me-1">Quay lại</a>
                            <button type="reset" class="btn btn-warning btn-lg flex-fill me-1">Reset</button>
                            <button type="submit" class="btn btn-primary btn-lg flex-fill">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
