@extends('admin.layout')

@section('search')
    <form action="{{ route('admin.categories.index') }}" method="GET">
        <div class="input-group mt-1">
            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm thể loại"
                value="{{ request()->input('search') }}">
            <button class="btn btn-outline-secondary" type="submit"><i class="bi bi-search"></i></button>
        </div>
    </form>
@endsection

@section('content')
<div class="row">
    <div class="col-sm-12">
            <div class="card shadow-sm">
                <header class="card-header">
                    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Thêm Thể Loại</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.categories.index') }}" style="color: inherit;">Thể Loại</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Thêm Thể Loại</li>
                            </ol>
                        </nav>
                    </div>
                </header>

                <div class="card-body">
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

                    <form action="{{ route('admin.categories.store') }}" method="POST">
                        @csrf
                        <div class="form-group mb-3">
                            <label for="name" class="form-label">Tên Thể Loại :</label>
                            <div class="input-group">
                                <input type="text" name="name" id="name" class="form-control @error('name') is-invalid @enderror" placeholder="Nhập tên thể loại" value="{{ old('name') }}">
                            </div>
                            @error('name')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group mb-3">
                            <label for="description" class="form-label">Mô Tả :</label>
                            <div class="input-group">
                                <textarea name="description" id="description" class="form-control" placeholder="Nhập mô tả" rows="3">{{ old('description') }}</textarea>
                            </div>
                            @error('description')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="mb-3 d-flex">
                            <a href="{{ route('admin.categories.index') }}" class="btn btn-secondary btn-lg flex-fill me-1">Quay lại</a>
                            <button type="reset" class="btn btn-warning btn-lg flex-fill me-1">Reset</button>
                            <button type="submit" class="btn btn-primary btn-lg flex-fill">Thêm Mới</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
