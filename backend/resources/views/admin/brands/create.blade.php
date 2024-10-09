@extends('admin.layout')

@section('css')
@endsection

@section('content')
 <!-- Hero -->
 <div class="bg-body-light">
  <div class="content content-full">
      <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
          <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Thêm mới thương hiệu</h1>
          <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
              <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                      <a href="{{ route('admin.brands.index') }}" style="color: inherit;">Brands</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">Thêm mới thương hiệu</li>
              </ol>
          </nav>
      </div>
  </div>
</div>
<!-- END Hero -->
<div class="content">
  <div class="block block-rounded">
      <div class="block-content">
          <form action="{{ route('admin.brands.store') }}" method="POST" enctype="multipart/form-data">
              @csrf
              <div class="row">
                  <div class="col-lg-12 col-xl-8 offset-xl-2">
                      <!-- Tên thương hiệu -->
                      <div class="mb-4">
                        <label class="form-label" for="name">Tên thương hiệu</label>
                        <input type="text" class="form-control @error('name') is-invalid @enderror" id="name" name="name" value="{{ old('name') }}" placeholder="Nhập tên thương hiệu">
                        @error('name')
                            <div class="text-danger mt-2" id="name-error">{{ $message }}</div>
                        @enderror
                    </div>

                    <!-- Mô tả -->
                    <div class="mb-4">
                        <label class="form-label" for="description">Mô tả</label>
                        <textarea class="form-control @error('description') is-invalid @enderror" id="description" name="description" rows="4" placeholder="Nhập mô tả thương hiệu">{{ old('description') }}</textarea>
                        @error('description')
                            <div class="text-danger mt-2" id="description-error">{{ $message }}</div>
                        @enderror
                    </div>

                    <!-- Địa chỉ bản đồ -->
                    <div class="mb-4">
                        <label class="form-label" for="link">Đường dẫn bản đồ</label>
                        <input type="url" class="form-control @error('link') is-invalid @enderror" id="link" name="link" value="{{ old('link') }}" placeholder="Nhập đường dẫn Google Maps">
                        @error('link')
                            <div class="text-danger mt-2" id="link-error">{{ $message }}</div>
                        @enderror
                    </div>

                    <!-- Ảnh đại diện -->
                    <div class="mb-4">
                        <label class="form-label" for="image">Ảnh đại diện</label>
                        <input type="file" class="form-control @error('image') is-invalid @enderror" id="image" name="image" accept="image/*">
                        @error('image')
                            <div class="text-danger mt-2" id="image-error">{{ $message }}</div>
                        @enderror
                    </div>

                      <button type="submit" class="btn btn-primary mb-4">Tạo thương hiệu</button>
                  </div>
              </div>
          </form>
      </div>
  </div>
</div>

@endsection

@section('js')
<script >
document.addEventListener('DOMContentLoaded', function () {
    const fields = ['name', 'description', 'link', 'image'];

    fields.forEach(function(field) {
        const inputElement = document.getElementById(field);
        const errorElement = document.getElementById(`${field}-error`);

        if (inputElement) {
            inputElement.addEventListener('input', function () {
                
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