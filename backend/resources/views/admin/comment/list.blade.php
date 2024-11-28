@extends('admin.layout')
@section('search')
    <form action="{{ route('admin.comments.index') }}" method="GET">
        <div class="input-group mt-1">
            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm comment"
                value="{{ request()->input('search') }}">
            <button class="btn btn-outline-secondary" type="submit"><i class="bi bi-search"></i></button>
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
            /* Đặt độ rộng cố định cho cột */
            white-space: nowrap;
            /* Không cho phép xuống dòng */
            overflow: hidden;
            /* Ẩn phần văn bản vượt quá */
            text-overflow: ellipsis;
            /* Hiển thị dấu "..." khi văn bản bị cắt */
        }
        .custom-select-small {
            font-size: 0.70rem;
            /* Giảm kích thước font */
            height: 20px;
            /* Giảm chiều cao */
            padding: 2px 6px;
            /* Giảm padding trong dropdown */
            width: auto;
            /* Điều chỉnh tự động theo nội dung */
        }
    </style>
    <div id="list" class="row">
        <div class="col-sm-12">
            <section class="card">
                <header class="card-header">
                    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Danh Sách Comment</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.comments.index') }}" style="color: inherit;">Comment</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Danh Sách Comment</li>
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
                                        <form action="{{ route('admin.comments.index') }}" method="GET">
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
                            </div>

                            <table class="display table table-bordered" id="hidden-table-info"
                                aria-describedby="hidden-table-info_info">
                                <thead>
                                    <tr role="row">
                                        <th>Id</th>
                                        <th>User</th>
                                        <th>Product</th>
                                        <th>Comment</th>
                                        <th>File</th>
                                        <th>Rating</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody role="alert" aria-live="polite" aria-relevant="all">
                                    @if ($noResults)
                                        <tr>
                                            <td colspan="7" class="text-center">Không có bình luận phù hợp</td>
                                        </tr>
                                    @else
                                        @foreach ($comments as $item)
                                            <tr>
                                                <td>{{ $item->id }}</td>
                                                <td>{{ $item->user->username }}</td>
                                                <td class="text-truncate">{{ $item->product->name }}</td>
                                                <td style="max-width: 300px;">{{ $item->comment }}</td>
                                                <td>
                                                    @if ($item->file)
                                                        <a href="{{ Storage::url($item->file) }}" target="_blank">Tải
                                                            file</a>
                                                    @else
                                                        Không có file
                                                    @endif
                                                </td>
                                                <td>{{ $item->star_rating }} / 5</td>
                                                <td>
                                                    <a href="{{ route('admin.comments.show', $item->id) }}"
                                                        class="btn btn-primary"><i class="fa fa-eye"></i></a>

                                                    @if ($item->deleted_at)
                                                        <form action="{{ route('admin.comments.restore', $item->id) }}"
                                                            method="POST" style="display:inline;">
                                                            @csrf
                                                            <button type="submit" class="btn btn-warning"><i
                                                                    class="bi bi-arrow-repeat"></i></button>
                                                        </form>
                                                    @else
                                                        <form action="{{ route('admin.comments.destroy', $item->id) }}"
                                                            method="POST" class="d-inline-block">
                                                            @csrf
                                                            @method('DELETE')
                                                            <button type="submit" class="btn btn-danger"
                                                                onclick="return confirm('Bạn có chắc muốn xóa comment này?')"><i
                                                                    class="fa fa-trash-o"></i></button>
                                                        </form>
                                                    @endif
                                                </td>
                                            </tr>
                                        @endforeach
                                    @endif
                                </tbody>
                            </table>
                            <div class="row-fluid">
                                <div class="span6">
                                    <div class="dataTables_info" id="hidden-table-info_info">
                                        Hiển thị từ {{ $comments->firstItem() }} đến {{ $comments->lastItem() }} của tổng
                                        cộng {{ $comments->total() }} mục
                                    </div>
                                </div>
                                <div class="span6">
                                    <div class="dataTables_paginate paging_bootstrap pagination">
                                        <ul class="pagination">
                                            <li class="prev">
                                                <a href="{{ $comments->previousPageUrl() }}" aria-label="Previous">←
                                                    Previous</a>
                                            </li>
                                            @foreach ($comments->getUrlRange(1, $comments->lastPage()) as $page => $url)
                                                <li class="{{ $page == $comments->currentPage() ? 'active' : '' }}">
                                                    <a href="{{ $url }}">{{ $page }}</a>
                                                </li>
                                            @endforeach
                                            <li class="next">
                                                <a href="{{ $comments->nextPageUrl() }}" aria-label="Next">Next →</a>
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
    <!--dynamic table initialization -->
    <script src="{{ asset('assets') }}/admin/js/dynamic_table_init.js"></script>
@endsection
