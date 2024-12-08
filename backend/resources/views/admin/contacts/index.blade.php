@extends('admin.layout')

@section('search')
    <form action="{{ route('admin.contacts.index') }}" method="GET">
        <div class="input-group mt-1">
            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm liên hệ"
                value="{{ request()->input('search') }}">
            <button class="btn btn-outline-secondary" type="submit"><i class="bi bi-search"></i></button>
        </div>
    </form>
@endsection

@section('content')
    @if (session('success'))
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
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Danh Sách Liên Hệ</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.contacts.index') }}" style="color: inherit;">Liên Hệ</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Danh Sách Liên Hệ</li>
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
                                        <form action="{{ route('admin.contacts.index') }}" method="GET">
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
                                        <a href="{{ route('admin.contacts.create') }}" class="btn btn-success">Tạo Mới</a>
                                    </div>
                                </div>
                            </div>

                            <table class="display table table-bordered" id="hidden-table-info"
                                aria-describedby="hidden-table-info_info">
                                <thead>
                                    <tr class="text-center">
                                        <th>#</th>
                                        <th>Tên</th>
                                        <th>Email</th>
                                        <th>Số điện thoại</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if ($contacts->isEmpty())
                                        <tr>
                                            <td colspan="5" class="text-center">Không có liên hệ phù hợp</td>
                                        </tr>
                                    @else
                                        @foreach ($contacts as $contact)
                                            <tr>
                                                <td>{{ $contact->id }}</td>
                                                <td class="text-truncate">{{ $contact->name }}</td>
                                                <td class="text-truncate">{{ $contact->email }}</td>
                                                <td class="text-truncate text-end">{{ $contact->phone }}</td>
                                                <td class="text-center">
                                                    <a href="{{ route('admin.contacts.edit', $contact->id) }}"
                                                        class="btn btn-warning mx-1">
                                                        <i class="fa fa-edit"></i>
                                                    </a>
                                                    <form action="{{ route('admin.contacts.destroy', $contact) }}"
                                                        method="POST" style="display:inline;">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button type="submit" class="btn btn-danger"
                                                            onclick="return confirm('Bạn có chắc muốn xóa liên hệ này?')"><i
                                                                class="bi bi-trash"></i>
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
                                        Hiển thị từ {{ $contacts->firstItem() }} đến {{ $contacts->lastItem() }} của tổng
                                        cộng {{ $contacts->total() }} mục
                                    </div>
                                </div>
                                <div class="span6">
                                    <div class="dataTables_paginate paging_bootstrap pagination">
                                        <ul class="pagination">
                                            <li class="prev">
                                                <a href="{{ $contacts->previousPageUrl() }}" aria-label="Previous">←
                                                    Trước</a>
                                            </li>
                                            @foreach ($contacts->getUrlRange(1, $contacts->lastPage()) as $page => $url)
                                                <li class="{{ $page == $contacts->currentPage() ? 'active' : '' }}">
                                                    <a href="{{ $url }}">{{ $page }}</a>
                                                </li>
                                            @endforeach
                                            <li class="next">
                                                <a href="{{ $contacts->nextPageUrl() }}" aria-label="Next">Sau →</a>
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

@section('js')
    <script src="{{ asset('assets') }}/admin/js/dynamic_table_init.js"></script>
@endsection
<script>
    document.addEventListener('DOMContentLoaded', function() {
        @if (session('success'))
            toastr.success('{{ session('success') }}', 'Thành công', {
                closeButton: true,
                progressBar: true,
                timeOut: 3000,
                positionClass: "toast-top-right"
            });
        @endif
    });
</script>
@endsection
