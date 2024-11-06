@extends('admin.layout')
@section('content')
    <div class="container">
        <div class="row ">
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h4 class="mb-0"><strong>Thêm Banner</strong></h4>
                </div>

                <div class="card-body">

                    <form action="{{ route('admin.banners.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf

                        <div class="form-group mb-3">
                            <label for="image_url" class="form-label">Image :</label>
                            <div class="input-group">
                                <input type="file" name="image_url" id="image_url" class="form-control">
                            </div>
                            @error('image_url')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group mb-3">
                            <label for="title" class="form-label">Title :</label>
                            <div class="input-group">
                                <input type="text" name="title" id="title" class="form-control" >
                            </div>
                            @error('title')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                        </div>

                        <div class="form-group mb-3">
                            <label for="sub_title" class="form-label">Sub_title :</label>
                            <div class="input-group">
                                <input type="text" name="sub_title" id="sub_title" class="form-control" >
                            </div>
                            @error('sub_title')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                        </div>


                        <div class="form-group mb-3">
                            <label for="span_title" class="form-label">Span_title :</label>
                            <div class="input-group">
                                <input type="text" name="span_title" id="span_title" class="form-control" >
                            </div>
                            @error('span_title')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror

                        </div>
                        <div class="mb-3 d-flex">
                            <a href="{{ route('admin.banners.index') }}" class="btn btn-secondary btn-lg flex-fill me-1">Quay lại</a>
                            <button type="reset" class="btn btn-warning btn-lg flex-fill me-1">Reset</button>
                            <button type="submit" class="btn btn-primary btn-lg flex-fill">Thêm Mới</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
@endsection
