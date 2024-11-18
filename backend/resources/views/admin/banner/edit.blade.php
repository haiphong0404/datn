@extends('admin.layout')
@section('search')
    <form action="{{ route('admin.banners.index') }}" method="GET">
        <div class="input-group mt-1">
            <input type="text" name="search" class="form-control" placeholder="Search"
                value="{{ request()->input('search') }}">
            <button class="btn btn-outline-secondary" type="submit"><i class="bi bi-search"></i></button>
        </div>
    </form>
@endsection
@section('content')
    <div class="container">
        <div class="row ">
            <div class="card shadow-sm">
                <header class="card-header">
                    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Chỉnh Sửa Banner</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.banners.index') }}" style="color: inherit;">Banner</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Chỉnh Sửa Banner</li>
                            </ol>
                        </nav>
                    </div>
                </header>

                <div class="card-body">

                    <form action="{{ route('admin.banners.update', $banner->id) }}" method="POST"
                        enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="mb-3">
                            <label for="image_url" class="form-label"><strong>Image Banner:</strong></label>

                            <div class="form-group mb-3">
                                @if ($banner->image_url)
                                    <div class="d-flex justify-content-center">
                                        <img src="{{ Storage::url($banner->image_url) }}" alt="{{ $banner->title }}"
                                            class="img-thumbnail" style="max-width: 800px; margin-bottom: 10px;">
                                    </div>
                                @else
                                    <div class="alert alert-warning" role="alert" style="margin-bottom: 10px;">
                                        Chưa có banner.
                                    </div>
                                @endif
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label"><strong>Thay đổi banner:</strong></label>
                                <input type="file" class="form-control" id="image_url" name="image_url"
                                    style="width: auto;">
                                @error('image_url')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <label for="title" class="form-label"><strong>Title :</strong></label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="title" name="title"
                                    value="{{ old('title', $banner->title) }}">
                            </div>
                            @error('title')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group mb-3">
                            <label for="sub_title" class="form-label"><strong>Sub_title :</strong></label>
                            <div class="input-group">
                                <input type="sub_title" class="form-control" id="sub_title" name="sub_title"
                                    value="{{ old('sub_title', $banner->sub_title) }}">
                            </div>
                            @error('sub_title')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group mb-3">
                            <label for="span_title" class="form-label">Span_title</label>
                            <div class="input-group">
                                <input type="span_title" class="form-control" id="span_title" name="span_title"
                                    value="{{ old('span_title', $banner->span_title) }}">
                            </div>
                            @error('span_title')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="mb-3 d-flex">
                            <a href="{{ route('admin.banners.index') }}"
                                class="btn btn-secondary btn-lg flex-fill me-1">Quay lại</a>
                            <button type="reset" class="btn btn-warning btn-lg flex-fill me-1">Reset</button>
                            <button type="submit" class="btn btn-primary btn-lg flex-fill">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
