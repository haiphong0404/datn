@extends('admin.layout')
@section('search')
<form action="{{ route('admin.user.index') }}" method="GET">
    <div class="input-group mt-1">
        <input type="text" name="search" class="form-control" placeholder="Tìm kiếm người dùng"
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
                    <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Danh Sách User</h1>
                    <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="{{ route('admin.user.index') }}" style="color: inherit;">User</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Danh Sách User </li>
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
                                    <form action="{{ route('admin.user.index') }}" method="GET">
                                        <label>Xem
                                            <select class="form-control-sm ml-1 custom-select-small" name="per_page"
                                                onchange="this.form.submit()">
                                                <option value="10" {{ request('per_page') == 10 ? 'selected' : '' }}>10
                                                </option>
                                                <option value="25" {{ request('per_page') == 25 ? 'selected' : '' }}>25
                                                </option>
                                                <option value="50" {{ request('per_page') == 50 ? 'selected' : '' }}>50
                                                </option>
                                                <option value="100" {{ request('per_page') == 100 ? 'selected' : '' }}>
                                                    100</option>
                                            </select><span style="margin-left:-5px;">mục</span>
                                        </label>
                                    </form>
                                </div>
                            </div>
                            <div class="span6">
                                <div class="dataTables_filter" id="hidden-table-info_filter">
                                    <a href="{{ route('admin.user.create') }}"
                                        class=" btn btn-success btn-sm">CREATE</a>

                                </div>
                            </div>
                        </div>

                        <table class="display table table-bordered" id="hidden-table-info"
                            aria-describedby="hidden-table-info_info">
                            <thead>
                                <tr role="row">
                                    <th>Id</th>
                                    <th>Avatar</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Role</th>
                                    <th>Active</th>
                                </tr>
                            </thead>
                            <tbody role="alert" aria-live="polite" aria-relevant="all">
                                @if ($noResults)
                                <tr>
                                    <td colspan="7" class="text-center">Không có người dùng phù hợp</td>
                                </tr>
                                @else
                                @foreach ($users as $item)
                                <tr>
                                    <td>{{ $item->id }}</td>
                                    <td style="width: 100px;"> <img src="{{ Storage::url($item->avatar_img) }}"
                                            width="100" height="100" alt="{{ $item->username }}"></td>
                                    <td class="text-truncate">{{ $item->username }}</td>
                                    <td>{{ $item->phone }}</td>
                                    <td class="text-truncate">{{ $item->email }}</td>
                                    <td class="text-truncate">{{ $item->address }}</td>
                                    <td class="text-td">{{ $item->role }}</td>
                                    <td>
                                        <a href="{{ route('admin.user.show', $item->id) }}" class="btn btn-primary"><i
                                                class="fa fa-eye"></i></a>
                                        @if ($item->role !== 'admin')
                                        <form action="{{ route('admin.user.destroy', $item->id) }}" method="POST"
                                            class="d-inline-block">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-danger"
                                                onclick="return confirm('Bạn có chắc muốn xóa người dùng này?')">
                                                <i class="fa fa-trash-o"></i>
                                            </button>
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
                                    Hiển thị từ {{ $users->firstItem() }} đến {{ $users->lastItem() }} của tổng
                                    cộng {{ $users->total() }} mục
                                </div>
                            </div>
                            <div class="span6">
                                <div class="dataTables_paginate paging_bootstrap pagination">
                                    <ul class="pagination">
                                        <li class="prev">
                                            <a href="{{ $users->previousPageUrl() }}" aria-label="Previous">←
                                                Previous</a>
                                        </li>
                                        @foreach ($users->getUrlRange(1, $users->lastPage()) as $page => $url)
                                        <li class="{{ $page == $users->currentPage() ? 'active' : '' }}">
                                            <a href="{{ $url }}">{{ $page }}</a>
                                        </li>
                                        @endforeach
                                        <li class="next">
                                            <a href="{{ $users->nextPageUrl() }}" aria-label="Next">Next →</a>
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