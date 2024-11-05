@extends('admin.layout')

@section('css')
@endsection

@section('content')
<!-- Hero -->
<div class="bg-body-light">
  <div class="content content-full">
      <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
          <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Sửa bài viết</h1>
          <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
              <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                      <a href="{{ route('admin.articles.index') }}" style="color: inherit;">Bài viết</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">Sửa bài viết</li>
              </ol>
          </nav>
      </div>
  </div>
</div>
<!-- END Hero -->

<div class="content">
  <div class="block block-rounded">
      <div class="block-content">
          <form action="{{ route('admin.articles.update', $articles) }}" method="POST" enctype="multipart/form-data">
              @csrf
              @method('PUT')
              <div class="row">
                  <div class="col-lg-12 col-xl-8 offset-xl-2">
                      <!-- Tên bài viết -->
                      <div class="mb-4">
                          <label class="form-label" for="name">Tên bài viết</label>
                          <input type="text" class="form-control @error('name') is-invalid @enderror" id="name" name="name" value="{{ old('name', $articles->name) }}" placeholder="Nhập tên bài viết">
                          @error('name')
                              <div class="text-danger mt-2" id="name-error">{{ $message }}</div>
                          @enderror
                      </div>

                      <!-- Tiêu đề -->
                      <div class="mb-4">
                          <label class="form-label" for="title">Tiêu đề</label>
                          <input type="text" class="form-control @error('title') is-invalid @enderror" id="title" name="title" value="{{ old('title', $articles->title) }}" placeholder="Nhập tiêu đề">
                          @error('title')
                              <div class="text-danger mt-2" id="title-error">{{ $message }}</div>
                          @enderror
                      </div>

                      <!-- Mô tả -->
                      <div class="mb-4">
                          <label class="form-label" for="content">Mô tả</label>
                          <textarea class="form-control @error('content') is-invalid @enderror" id="content" name="content" rows="4" placeholder="Nhập mô tả">{{ old('content', $articles->content) }}</textarea>
                          @error('content')
                              <div class="text-danger mt-2" id="content-error">{{ $message }}</div>
                          @enderror
                      </div>

                      <!-- Ảnh đại diện -->
                      <div class="mb-4">
                          <label class="form-label" for="image">Ảnh đại diện</label> 
                          @if($articles->image)
                              <div class="mt-2">
                                  <img src="{{ Storage::url($articles->image) }}" width="100" height="100" alt="Ảnh đại diện hiện tại">
                              </div>
                          @endif
                          <input type="file" class="form-control @error('image') is-invalid @enderror" id="image" name="image" accept="image/*">
                          @error('image')
                              <div class="text-danger mt-2" id="image-error">{{ $message }}</div>
                          @enderror
                      </div>

                      <button type="submit" class="btn btn-primary mb-4">Cập nhật bài viết</button>
                  </div>
              </div>
          </form>
      </div>
  </div>
</div>
@endsection

@section('js')
<script>
document.addEventListener('DOMContentLoaded', function () {
    const fields = ['name', 'content', 'title', 'image'];

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
