@extends('admin.layout')

@section('search')
    <form action="{{ route('admin.vouchers.index') }}" method="GET">
        <div class="input-group mt-1">
            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm mã giảm giá"
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

    <div class="row">
        <div class="col-sm-12">
            <section class="card">
                <header class="card-header">
                    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Danh sách mã giảm giá</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.vouchers.index') }}" style="color: inherit;">Vouchers</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Danh sách mã giảm giá</li>
                            </ol>
                        </nav>
                    </div>
                </header>
                <div class="card-body">
                    <div class="adv-table">
                        <div id="voucher-table-wrapper" class="dataTables_wrapper form-inline">

                            <div class="content">
                                @foreach ($groupedVouchers as $type => $items)
                                    <div class="block block-rounded ">
                                        <div class="block-header block-header-default">
                                            <h4 class="block-title">Voucher Type: {{ ucfirst($type) }}</h4>
                                            <div class="row-fluid">
                                                <div class="span6">
                                                    <div id="voucher-table-length" class="dataTables_length">
                                                        <form action="{{ route('admin.vouchers.index') }}" method="GET">
                                                            <label>Xem
                                                                <select class="form-control-sm ml-1 custom-select-small"
                                                                    name="per_page" onchange="this.form.submit()">
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
                                                        <a href="{{ route('admin.vouchers.create') }}"
                                                            class=" btn btn-success btn-sm">Tạo mới</a>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div>
                                            <table class="display table table-bordered "
                                                aria-describedby="hidden-table-info_info" id="vouchersTable">
                                                <thead>
                                                    <tr>
                                                        <th class="text-center" style="width: 50px;">#</th>
                                                        <th>Mã giảm giá</th>
                                                        <th>Ngày bắt đầu</th>
                                                        <th>Ngày hết hạn</th>

                                                        @if ($type == 'percentage')
                                                            <th>Phần trăm chiết khấu</th>
                                                            <th>Giá trị chiết khấu tối đa
                                                            </th>
                                                        @elseif ($type == 'fixed')
                                                            <th>Giá trị giảm</th>
                                                            <th>Giá trị tối thiểu của đơn
                                                                hàng</th>
                                                        @elseif ($type == 'category_discount')
                                                            <th>Danh mục áp dụng</th>
                                                            <th>Phần trăm chiết khấu</th>
                                                        @elseif ($type == 'first_order')
                                                            <th>Giá trị giảm</th>
                                                            <th>Giá trị tối thiểu của đơn
                                                                hàng</th>
                                                        @endif

                                                        <th>Số lượng</th>
                                                        <th>Người tạo</th>
                                                        <th>Ngày tạo</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th class="text-center" style="width: 100px;">Thao tác</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    @foreach ($items as $item)
                                                        <tr>
                                                            <td class="text-center">{{ $loop->iteration }}</td>
                                                            <td>{{ $item->code }}</td>
                                                            <td>{{ $item->start_date }}</td>
                                                            <td>{{ $item->expiration_date }}</td>

                                                            @if ($type == 'percentage')
                                                                <td>
                                                                    {{ $item->discount_percentage }}</td>
                                                                <td>{{ $item->max_discount_value }}
                                                                </td>
                                                            @elseif ($type == 'fixed')
                                                                <td>{{ $item->discount_value }}
                                                                </td>
                                                                <td>{{ $item->min_order_value }}
                                                                </td>
                                                            @elseif ($type == 'category_discount')
                                                                <td>{{ $item->category_id }}</td>
                                                                <td>
                                                                    {{ $item->discount_percentage }}</td>
                                                            @elseif ($type == 'first_order')
                                                                <td>{{ $item->discount_value }}
                                                                </td>
                                                                <td>{{ $item->min_order_value }}
                                                                </td>
                                                            @endif

                                                            <td>{{ $item->quantity }}</td>
                                                            <td>{{ $item->user_id }}</td>
                                                            <td>{{ $item->created_at }}</td>
                                                            <td>{{ $item->updated_at }}</td>
                                                            <td class="text-center">
                                                                <div class="d-flex">
                                                                    {{-- EDIT --}}
                                                                    <a href="{{ route('admin.vouchers.edit', $item) }}"
                                                                        class="btn btn-warning mr-2">
                                                                        <i class="fa fa-edit"></i>
                                                                    </a>

                                                                    {{-- DELETE --}}
                                                                    <form
                                                                        action="{{ route('admin.vouchers.destroy', $item) }}"
                                                                        method="POST" class="form-delete">
                                                                        @csrf
                                                                        @method('DELETE')
                                                                        <button type="submit" class="btn btn-danger"
                                                                            data-bs-toggle="tooltip" title="Xóa">
                                                                            <i class="fa fa-trash"></i>
                                                                        </button>
                                                                    </form>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    @endforeach
                                                </tbody>
                                            </table>

                                            <!-- Phân trang cho từng nhóm -->
                                            <div class="row-fluid " style="margin-bottom: 100px">
                                                <div class="span6">
                                                    <div class="dataTables_info" id="hidden-table-info_info">
                                                        Hiển thị từ {{ $items->firstItem() }} đến
                                                        {{ $items->lastItem() }} của tổng
                                                        cộng {{ $items->total() }} mục
                                                    </div>
                                                </div>
                                                <div class="span6">
                                                    <div class="dataTables_paginate paging_bootstrap pagination">
                                                        <ul class="pagination">
                                                            <li class="prev">
                                                                <a href="{{ $items->previousPageUrl() }}"
                                                                    aria-label="Previous">←
                                                                    Previous</a>
                                                            </li>
                                                            @foreach ($items->getUrlRange(1, $items->lastPage()) as $page => $url)
                                                                <li
                                                                    class="{{ $page == $items->currentPage() ? 'active' : '' }}">
                                                                    <a href="{{ $url }}">{{ $page }}</a>
                                                                </li>
                                                            @endforeach
                                                            <li class="next">
                                                                <a href="{{ $items->nextPageUrl() }}"
                                                                    aria-label="Next">Next →</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
@endsection

@section('js')
    <script src="{{ asset('assets') }}/admin/js/dynamic_table_init.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const deleteBtns = document.querySelectorAll('.form-delete');

            for (const btn of deleteBtns) {
                btn.addEventListener('submit', function(e) {
                    e.preventDefault();

                    Swal.fire({
                        title: "Xác nhận xóa?",
                        text: "Bạn có chắc chắn muốn xóa mã giảm giá này không?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Đồng ý',
                        cancelButtonText: 'Hủy'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.submit();
                        }
                    });
                });
            }
        });
    </script>
@endsection
