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
    </style>

    <div id="list" class="row">
        <div class="col-sm-12">
            <section class="card">
                <header class="card-header">
                    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Danh Sách Banner</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.banners.index') }}" style="color: inherit;">Banner</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Danh Sách Banner</li>
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
                                        <label><select class="form-control" size="1" name="hidden-table-info_length"
                                                aria-controls="hidden-table-info">
                                                <option value="10" selected="selected">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select> records per page</label>
                                    </div>
                                </div>
                                <div class="span6">
                                    <div class="dataTables_filter" id="hidden-table-info_filter">
                                        <a href="{{ route('admin.banners.create') }}"
                                            class=" btn btn-success btn-sm">CREATE</a>

                                    </div>
                                </div>
                            </div>

                            <table class="display table table-bordered" id="hidden-table-info"
                                aria-describedby="hidden-table-info_info">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Ảnh</th>
                                        <th>Tiêu đề</th>
                                        <th>Tiêu đề phụ</th>
                                        <th>Tiêu đề phụ - 2</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if ($noResults)
                                        <tr>
                                            <td colspan="7" class="text-center">Không có banner phù hợp</td>
                                        </tr>
                                    @else
                                        @foreach ($banners as $banner)
                                            <tr>
                                                <td>{{ $banner->id }}</td>
                                                <td><img class="text-truncate "src="{{ asset('storage/' . $banner->image_url) }}"
                                                        alt="{{ $banner->title }}" width="150"></td>
                                                <td class="text-truncate">{{ $banner->title }}</td>
                                                <td class="text-truncate">{{ $banner->sub_title }}</td>
                                                <td class="text-truncate">{{ $banner->span_title }}</td>

                                                <td>
                                                    <a href="{{ route('admin.banners.show', $banner->id) }}"
                                                        class="btn btn-primary"><i class="fa fa-eye"></i></a>
                                                    @if ($banner->deleted_at)
                                                        <form action="{{ route('admin.banners.restore', $banner->id) }}"
                                                            method="POST" style="display:inline;">
                                                            @csrf
                                                            <button type="submit" class="btn btn-warning"><i
                                                                    class="bi bi-arrow-repeat"></i></button>
                                                        </form>
                                                    @else
                                                        <form action="{{ route('admin.banners.destroy', $banner->id) }}"
                                                            method="POST" class="d-inline-block">
                                                            @csrf
                                                            @method('DELETE')
                                                            <button type="submit" class="btn btn-danger"
                                                                onclick="return confirm('Bạn có chắc muốn xóa banner này?')"><i
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
                                    <div class="dataTables_info" id="hidden-table-info_info">Showing 11 to 20 of 57
                                        entries</div>
                                </div>
                                <div class="span6">
                                    <div class="dataTables_paginate paging_bootstrap pagination">
                                        <ul>
                                            <li class="prev"><a href="#">← Previous</a></li>
                                            <li><a href="#">1</a></li>
                                            <li class="active"><a href="#">2</a></li>
                                            <li><a href="#">3</a></li>
                                            <li><a href="#">4</a></li>
                                            <li><a href="#">5</a></li>
                                            <li class="next"><a href="#">Next → </a></li>
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
