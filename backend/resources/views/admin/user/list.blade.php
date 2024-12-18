@extends('admin.layout')
@section('search')
    <form action="{{ route('admin.user.index') }}" method="GET">
        <div class="input-group mt-1">
            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm tài khoản"
                value="{{ request()->input('search') }}">
            <button class="btn btn-outline-secondary" type="submit"><i class="bi bi-search"></i></button>
        </div>
    </form>
@endsection
@section('content')
    
    <style>
        .text-truncate {
            max-width: 150px;
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
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Danh Sách tài khoản</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.user.index') }}" style="color: inherit;">tài khoản</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Danh Sách tài khoản</li>
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
                                                    <option value="10"
                                                        {{ request('per_page') == 10 ? 'selected' : '' }}>10
                                                    </option>
                                                    <option value="25"
                                                        {{ request('per_page') == 25 ? 'selected' : '' }}>25
                                                    </option>
                                                    <option value="50"
                                                        {{ request('per_page') == 50 ? 'selected' : '' }}>50
                                                    </option>
                                                    <option value="100"
                                                        {{ request('per_page') == 100 ? 'selected' : '' }}>
                                                        100</option>
                                                </select><span style="margin-left:-5px;">mục</span>
                                            </label>
                                        </form>
                                    </div>
                                </div>
                                <div class="span6">
                                    <div class="dataTables_filter" id="hidden-table-info_filter">
                                        @if (auth()->user()->hasRole(['admin']))
                                            <a href="{{ route('admin.user.create') }}" class=" btn btn-success btn-sm">Tạo
                                                mới</a>
                                        @endif

                                    </div>
                                </div>
                            </div>

                            <table class="display table table-bordered" id="hidden-table-info"
                                aria-describedby="hidden-table-info_info">
                                <thead>
                                    <tr class="text-center">
                                        <th>#</th>
                                        <th>Ảnh đại diện</th>
                                        <th>Họ tên</th>
                                        <th>Số điện thoại</th>
                                        <th>Email</th>
                                        <th>Địa chỉ</th>
                                        <th>Quyền</th>
                                        <th>Trạng thái</th> <!-- Thêm cột Trạng thái -->
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody role="alert" aria-live="polite" aria-relevant="all">
                                    @if ($noResults)
                                        <tr>
                                            <td colspan="8" class="text-center">Không có tài khoản phù hợp</td>
                                            <!-- Cập nhật colspan -->
                                        </tr>
                                    @else
                                        @php
                                            $stt = 1;
                                            $loggedInUser = Auth::user();
                                        @endphp
                                        @foreach ($users as $item)
                                            @if ($loggedInUser->role !== 'staff' || $item->role !== 'admin')
                                                <tr>
                                                    <td>{{ $stt++ }}</td>
                                                    <td style="width: 100px;">
                                                        <img src="{{ Storage::url($item->avatar_img) }}" width="100"
                                                            height="100" alt="{{ $item->username }}">
                                                    </td>
                                                    <td class="text-truncate">{{ $item->username }}</td>
                                                    <td class="text-end">{{ $item->phone }}</td>
                                                    <td class="text-truncate">{{ $item->email }}</td>
                                                    <td class="text-truncate">{{ $item->address }}</td>
                                                    <td class="text-td">{{ $item->role }}</td>
                                                    <td>
                                                        <span id="userStatus-{{ $item->id }}"
                                                            class="badge {{ $item->status === 'active' ? 'bg-success' : 'bg-danger' }}">
                                                            {{ $item->status === 'active' ? 'Hoạt động' : 'Không hoạt động' }}
                                                        </span>
                                                    </td>
                                                    <td class="text-center">
                                                        @if (
                                                            $item->role !== 'admin' &&
                                                                auth()->user()->hasRole(['admin']))
                                                            <form id="toggleStatusForm-{{ $item->id }}"
                                                                data-id="{{ $item->id }}" class="d-inline-block">
                                                                @csrf
                                                                <button type="button"
                                                                    class="btn {{ $item->status === 'active' ? 'btn-warning' : 'btn-success' }}"
                                                                    onclick="toggleStatus({{ $item->id }})">
                                                                    <i
                                                                        class="bi {{ $item->status === 'active' ? 'bi-toggle-on' : 'bi-toggle-off' }}"></i>
                                                                </button>
                                                            </form>
                                                        @endif
                                                        <a href="{{ route('admin.user.show', $item->id) }}"
                                                            class="btn btn-primary">
                                                            <i class="fa fa-eye"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            @endif
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
                                                    Trước</a>
                                            </li>
                                            @foreach ($users->getUrlRange(1, $users->lastPage()) as $page => $url)
                                                <li class="{{ $page == $users->currentPage() ? 'active' : '' }}">
                                                    <a href="{{ $url }}">{{ $page }}</a>
                                                </li>
                                            @endforeach
                                            <li class="next">
                                                <a href="{{ $users->nextPageUrl() }}" aria-label="Next">Sau →</a>
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
    <script>
        function toggleStatus(userId) {
            const form = document.querySelector(`#toggleStatusForm-${userId}`);
            const url = `{{ route('admin.user.toggleStatus', ':id') }}`.replace(':id', userId);
            const token = form.querySelector('input[name="_token"]').value;

            fetch(url, {
                    method: 'PATCH',
                    headers: {
                        'X-CSRF-TOKEN': token,
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        const button = form.querySelector('button');
                        const icon = button.querySelector('i');
                        const badge = document.querySelector(`#userStatus-${userId}`);

                        // Update button style
                        if (data.status === 'active') {
                            button.classList.remove('btn-success');
                            button.classList.add('btn-warning');
                            icon.classList.remove('bi-toggle-off');
                            icon.classList.add('bi-toggle-on');
                        } else {
                            button.classList.remove('btn-warning');
                            button.classList.add('btn-success');
                            icon.classList.remove('bi-toggle-on');
                            icon.classList.add('bi-toggle-off');
                        }

                        // Update badge
                        if (badge) {
                            badge.textContent = data.status === 'active' ? 'Hoạt động' : 'Không hoạt động';
                            badge.classList.remove('bg-success', 'bg-danger');
                            badge.classList.add(data.status === 'active' ? 'bg-success' : 'bg-danger');
                        }

                        // Show success notification
                        toastr.success(data.message || 'Cập nhật trạng thái thành công!', 'Thành công', {
                            closeButton: true,
                            progressBar: true,
                            timeOut: 3000,
                            positionClass: "toast-top-right"
                        });
                    } else {
                        toastr.error(data.message || 'Không thể cập nhật trạng thái.', 'Lỗi', {
                            closeButton: true,
                            progressBar: true,
                            timeOut: 3000,
                            positionClass: "toast-top-right"
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    toastr.error('Đã xảy ra lỗi, vui lòng thử lại.', 'Lỗi', {
                        closeButton: true,
                        progressBar: true,
                        timeOut: 3000,
                        positionClass: "toast-top-right"
                    });
                });
        }
    </script>
@endsection
