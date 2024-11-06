@extends('admin.layout')
@section('content')
    <div class="container">
        <div class="row ">
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h4 class="mb-0"><strong>Chi Tiết Banner</strong></h4>
                </div>

                <div class="card-body">

                    <form action="{{ route('admin.banners.show', $banner->id) }}" method="POST" enctype="multipart/form-data">
                        @csrf

                        @if ($banner->image_url)
                            <label class="form-label"><strong>Image Banner:</strong></label>
                            <div class="d-flex justify-content-center">
                                <img src="{{ Storage::url($banner->image_url) }}" alt="{{$banner->title}}" class="img-thumbnail"
                                    style="max-width: 800px;">
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
                            <a href="{{ route('admin.banners.index') }}" class="btn btn-secondary flex-fill me-1">Quay lại</a>
                            <a href="{{ route('admin.banners.edit', $banner->id) }}" class="btn btn-warning flex-fill me-1">Chỉnh
                                sửa</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
@endsection
