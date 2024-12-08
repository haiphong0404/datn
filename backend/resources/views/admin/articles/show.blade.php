<!-- resources/views/admin/articles/show.blade.php -->

@extends('admin.layout')

@section('search')
    <form action="{{ route('admin.articles.index') }}" method="GET">
        <div class="input-group mt-1">
            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm"
                value="{{ request()->input('search') }}">
            <button class="btn btn-outline-secondary" type="submit"><i class="bi bi-search"></i></button>
        </div>
    </form>
@endsection

@section('content')
    <div class="container">
        <div class="row">
            <div class="card shadow-sm">
                <header class="card-header">
                    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Chi Tiết Bài Viết</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.articles.index') }}" style="color: inherit;">Bài Viết</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Chi Tiết Bài Viết</li>
                            </ol>
                        </nav>
                    </div>
                </header>

                <div class="card-body">
                    <form action="{{ route('admin.articles.show', $article->id) }}" method="POST"
                        enctype="multipart/form-data">
                        @csrf

                        @if ($article->image)
                            <label class="form-label"><strong>Hình ảnh:</strong></label>
                            <div class="d-flex justify-content-center">
                                <img src="{{ Storage::url($article->image) }}" alt="{{ $article->title }}"
                                    class="img-thumbnail" style="max-width: 400px;">
                            </div>
                        @endif

                        <div class="form-group mb-3">
                            <label for="name" class="form-label"><strong>Tên :</strong></label>
                            <div class="input-group">
                                <input type="text" name="name" id="name" class="form-control"
                                    value="{{ $article->name }}" readonly>
                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <label for="title" class="form-label"><strong>Tiêu Đề :</strong></label>
                            <div class="input-group">
                                <input type="text" name="title" id="title" class="form-control"
                                    value="{{ $article->title }}" readonly>
                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <label for="content" class="form-label"><strong>Nội Dung :</strong></label>
                            <div class="input-group">
                                <textarea name="content" id="content" class="form-control" rows="5" readonly>{{ $article->content }}</textarea>
                            </div>
                        </div>

                        <div class="d-flex">
                            <a href="{{ route('admin.articles.index') }}" class="btn btn-secondary flex-fill me-1">Quay lại</a>
                            <a href="{{ route('admin.articles.edit', $article->id) }}"
                                class="btn btn-warning flex-fill me-1">Chỉnh sửa</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
