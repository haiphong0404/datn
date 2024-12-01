@extends('admin.layout')

@section('search')
    <form action="{{ route('admin.articles.index') }}" method="GET">
        <div class="input-group mt-1">
            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm"
                value="{{ request()->input('search') }}">
            <button class="btn btn-outline-secondary" type="submit">
                <i class="bi bi-search"></i>
            </button>
        </div>
    </form>
@endsection

@section('content')
    @if (session('success'))
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif

    <style>
        .text-truncate {
            max-width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .custom-select-small {
            font-size: 0.70rem;
            height: 20px;
            padding: 2px 6px;
            width: auto;
        }
    </style>

    <div id="list" class="row">
        <div class="col-sm-12">
            <section class="card">
                <header class="card-header">
                    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Danh sách bài viết</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.articles.index') }}" style="color: inherit;">Bài viết</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Danh sách bài viết</li>
                            </ol>
                        </nav>
                    </div>
                </header>
                <div class="card-body">
                    <div class="adv-table">
                        <div id="hidden-table-info_wrapper" class="dataTables_wrapper form-inline" role="grid">
                            <div class="row-fluid">
                                <div class="span6">
                                    <div id="hidden-table-info_length" class="dataTables_length">
                                        <form action="{{ route('admin.articles.index') }}" method="GET">
                                            <label>Xem
                                                <select class="form-control-sm ml-1 custom-select-small" name="per_page"
                                                    onchange="this.form.submit()">
                                                    <option value="10"
                                                        {{ request('per_page') == 10 ? 'selected' : '' }}>10</option>
                                                    <option value="25"
                                                        {{ request('per_page') == 25 ? 'selected' : '' }}>25</option>
                                                    <option value="50"
                                                        {{ request('per_page') == 50 ? 'selected' : '' }}>50</option>
                                                    <option value="100"
                                                        {{ request('per_page') == 100 ? 'selected' : '' }}>100</option>
                                                </select><span style="margin-left:-5px;">mục</span>
                                            </label>
                                        </form>
                                    </div>
                                </div>
                                <div class="span6">
                                    <div class="dataTables_filter" id="hidden-table-info_filter">
                                        <a href="{{ route('admin.articles.create') }}"
                                            class="btn btn-success btn-sm">Tạo mới</a>
                                    </div>
                                </div>
                            </div>
                            <table class="display table table-bordered" id="hidden-table-info"
                                aria-describedby="hidden-table-info_info">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên</th>
                                        <th>Tiêu đề</th>
                                        <th>Nội dung</th>
                                        <th>Hình ảnh</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if ($noResults)
                                        <tr>
                                            <td colspan="6" class="text-center">Không có bài viết phù hợp</td>
                                        </tr>
                                    @else
                                        @foreach ($articles as $item)
                                            <tr>
                                                <td>{{ $item->id }}</td>
                                                <td class="text-truncate">{{ $item->name }}</td>
                                                <td class="text-truncate">{{ $item->title }}</td>
                                                <td class="text-truncate">{{ Str::limit($item->content, 50) }}</td>
                                                <td>
                                                    @if ($item->image)
                                                        <img src="{{ Storage::url($item->image) }}" alt="Hình ảnh bài viết"
                                                            width="150">
                                                    @endif
                                                </td>
                                                <td>
                                                    <a href="{{ route('admin.articles.show', $item->id) }}"
                                                        class="btn btn-primary">
                                                        <i class="fa fa-eye"></i>
                                                    </a>
                                                    <form action="{{ route('admin.articles.destroy', $item->id) }}"
                                                        method="POST" class="d-inline-block">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button type="submit" class="btn btn-danger"
                                                            onclick="return confirm('Bạn có chắc muốn xóa bài viết này?')">
                                                            <i class="fa fa-trash-o"></i>
                                                        </button>
                                                    </form>
                                                </td>
                                            </tr>
                                        @endforeach
                                    @endif
                                </tbody>
                            </table>
                            <div class="row-fluid">
                                <div class="span6">
                                    <div class="dataTables_info" id="hidden-table-info_info">
                                        Hiển thị từ {{ $articles->firstItem() }} đến {{ $articles->lastItem() }} của tổng
                                        cộng {{ $articles->total() }} mục
                                    </div>
                                </div>
                                <div class="span6">
                                    <div class="dataTables_paginate paging_bootstrap pagination">
                                        <ul class="pagination">
                                            <li class="prev">
                                                <a href="{{ $articles->previousPageUrl() }}" aria-label="Previous">←
                                                    Previous</a>
                                            </li>
                                            @foreach ($articles->getUrlRange(1, $articles->lastPage()) as $page => $url)
                                                <li class="{{ $page == $articles->currentPage() ? 'active' : '' }}">
                                                    <a href="{{ $url }}">{{ $page }}</a>
                                                </li>
                                            @endforeach
                                            <li class="next">
                                                <a href="{{ $articles->nextPageUrl() }}" aria-label="Next">Next →</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
@endsection
