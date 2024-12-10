@extends('admin.layout')

@section('css')
@endsection
@section('search')
    <form action="{{ route('admin.brands.index') }}" method="GET">
        <div class="input-group mt-1">
            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm thương hiệu"
                value="{{ request()->input('search') }}">
            <button class="btn btn-outline-secondary" type="submit">
                <i class="bi bi-search"></i>
            </button>
        </div>
    </form>
@endsection

@section('content')
    

    <div class="row">
        <div class="col-sm-12">
            <div class="card shadow-sm">
                <header class="card-header">
                    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Thêm Mới Thương Hiệu</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.brands.index') }}" style="color: inherit;">Thương Hiệu</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Thêm Mới Thương Hiệu</li>
                            </ol>
                        </nav>
                    </div>
                </header>

                <div class="card-body">
                    <form action="{{ route('admin.brands.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        <!-- Ảnh Đại Diện -->
                        <div class="form-group mb-3">
                            <label for="image" class="form-label">Ảnh Đại Diện:</label>
                            <div class="input-group">
                                <input type="file" name="image" id="image"
                                    class="form-control @error('image') is-invalid @enderror" accept="image/*">
                            </div>
                            @error('image')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                        <!-- Tên Thương Hiệu -->
                        <div class="form-group mb-3">
                            <label for="name" class="form-label">Tên Thương Hiệu:</label>
                            <div class="input-group">
                                <input type="text" name="name" id="name"
                                    class="form-control @error('name') is-invalid @enderror" value="{{ old('name') }}"
                                    placeholder="Nhập tên thương hiệu">
                            </div>
                            @error('name')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Mô Tả -->
                        <div class="form-group mb-3">
                            <label for="description" class="form-label">Mô Tả:</label>
                            <div class="input-group">
                                <textarea name="description" id="description" class="form-control @error('description') is-invalid @enderror"
                                    rows="4" placeholder="Nhập mô tả thương hiệu">{{ old('description') }}</textarea>
                            </div>
                            @error('description')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Địa Chỉ Bản Đồ -->
                        <div class="form-group mb-3">
                            <label for="link" class="form-label">Đường Dẫn Website:</label>
                            <div class="input-group">
                                <input type="url" name="link" id="link"
                                    class="form-control @error('link') is-invalid @enderror" value="{{ old('link') }}"
                                    placeholder="Nhập đường dẫn Website">
                            </div>
                            @error('link')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>



                        <!-- Nút Tạo Thương Hiệu -->
                        <div class="mb-3 d-flex">
                            <a href="{{ route('admin.brands.index') }}"
                                class="btn btn-secondary btn-lg flex-fill me-1">Quay lại</a>
                            <button type="reset" class="btn btn-warning btn-lg flex-fill me-1">Reset</button>
                            <button type="submit" class="btn btn-primary btn-lg flex-fill">Thêm Mới</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('js')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const fields = ['name', 'description', 'link', 'image'];

            fields.forEach(function(field) {
                const inputElement = document.getElementById(field);
                const errorElement = document.getElementById(`${field}-error`);

                if (inputElement) {
                    inputElement.addEventListener('input', function() {

                        if (inputElement.classList.contains('is-invalid')) {
                            inputElement.classList.remove('is-invalid');
                        }

                        if (errorElement) {
                            errorElement.style.display = 'none';
                        }
                    });
                }
            });
        });
    </script>
@endsection
