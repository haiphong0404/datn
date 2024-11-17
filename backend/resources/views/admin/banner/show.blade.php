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
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Chi Tiết Banner</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.banners.index') }}" style="color: inherit;">Banner</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Chi Tiết Banner</li>
                            </ol>
                        </nav>
                    </div>
                </header>

                <div class="card-body">

                    <form action="{{ route('admin.banners.show', $banner->id) }}" method="POST"
                        enctype="multipart/form-data">
                        @csrf

                        @if ($banner->image_url)
                            <label class="form-label"><strong>Image Banner:</strong></label>
                            <div class="d-flex justify-content-center">
                                <img src="{{ Storage::url($banner->image_url) }}" alt="{{ $banner->title }}"
                                    class="img-thumbnail" style="max-width: 800px;">
                            </div>
                        @endif

                        <div class="form-group mb-3">
                            <label for="title" class="form-label"><strong>Title :</strong></label>
                            <div class="input-group">
                                <input type="text" name="title" id="title" class="form-control"
                                    value="{{ $banner->title }}" readonly>
                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <label for="sub_title" class="form-label"><strong>Sub_title :</strong></label>
                            <div class="input-group">
                                <input type="text" name="sub_title" id="sub_title" class="form-control"
                                    value="{{ $banner->sub_title }}" readonly>
                            </div>
                        </div>


                        <div class="form-group mb-3">
                            <label for="span_title" class="form-label"><strong>Span_title :</strong></label>
                            <div class="input-group">
                                <input type="text" name="span_title" id="span_title" class="form-control"
                                    value="{{ $banner->span_title }}" readonly>
                            </div>
                        </div>
                        <div class="d-flex">
                            <a href="{{ route('admin.banners.index') }}" class="btn btn-secondary flex-fill me-1">Quay
                                lại</a>
                            <a href="{{ route('admin.banners.edit', $banner->id) }}"
                                class="btn btn-warning flex-fill me-1">Chỉnh
                                sửa</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
@endsection
