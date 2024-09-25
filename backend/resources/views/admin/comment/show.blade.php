@extends('admin.layout')
@section('content')
    <div class="container">
        <div class="row ">
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h4 class="mb-0">Chi Tiết Bình Luận</h4>
                </div>

                <div class="card-body">

                    <form action="{{ route('comments.show', $comments->id) }}" method="POST" enctype="multipart/form-data">
                        @csrf

                        <div class="mb-3">
                            <label class="form-label"><strong>Người dùng:</strong></label>
                            <input type="text" class="form-control" value="{{ $comments->user->username }}" readonly>
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label"><strong>Sản phẩm:</strong></label>
                            <input type="text" class="form-control" value="{{ $comments->product->name }}" readonly>
                        </div>

                        <div class="mb-3">
                            <label class="form-label"><strong>Nội dung bình luận:</strong></label>
                            <textarea class="form-control" readonly>{{ $comments->comment }}</textarea>
                        </div>

                        @if ($comments->file)
                            <div class="mb-3">
                                <label class="form-label"><strong>File đính kèm:</strong></label>
                                <a href="{{ Storage::url($comments->file) }}" target="_blank" class="d-block">Tải file</a>
                            </div>
                        @endif
        
                        <div class="mb-3">
                            <label class="form-label"><strong>Đánh giá:</strong></label>
                            <input type="text" class="form-control" value="{{ $comments->star_rating }} / 5" readonly>
                        </div>
        
                        <div class="d-flex">
                            <a href="{{ route('comments.index') }}" class="btn btn-secondary flex-fill ">Quay lại</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
