@extends('admin.layout')

@section('title')
    Thêm mới thể loại
@endsection

@section('content')
    @if (session()->has('error'))
        <div class="alert alert-danger">
            {{ session()->get('error') }}
        </div>
    @endif

    @if (session()->has('success'))
        <div class="alert alert-success">
            {{ session()->get('success') }}
        </div>
    @endif

    <div class="row">
        <div class="col-sm-12">
            <section class="card">
                <header class="card-header">
                    Thêm mới thể loại
                </header>
                <div class="card-body">
                    <form action="{{ route(admin.'categories.store') }}" method="POST">
                        @csrf
                        <div class="form-group">
                            <label for="name">Tên thể loại</label>
                            <input type="text" name="name" class="form-control @error('name') is-invalid @enderror" placeholder="Nhập tên thể loại" value="{{ old('name') }}">
                            @error('name')
                            <div class="invalid-feedback">
                                {{ $message }}
                            </div>
                            @enderror
                        </div>
                        <div class="form-group">
                            <label for="description">Mô tả</label>
                            <textarea name="description" class="form-control" placeholder="Nhập mô tả" rows="3">{{ old('description') }}</textarea>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">Lưu</button>
                            <a href="{{ route(admin.'categories.index') }}" class="btn btn-secondary">Quay lại</a>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    </div>
@endsection
