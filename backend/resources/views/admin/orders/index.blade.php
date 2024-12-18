@extends('admin.layout')

@section('search')
    <form action="{{ route('admin.orders.index') }}" method="GET">
        <div class="input-group mt-1">
            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm đơn hàng"
                value="{{ request()->input('search') }}">
            <button class="btn btn-outline-secondary" type="submit"><i class="bi bi-search"></i></button>
        </div>
    </form>
@endsection

@section('content')
    <style>
        .text-truncate {
            max-width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .custom-select-small {
            font-size: 0.75rem;
            height: 25px;
            padding: 2px 6px;
            width: auto;
        }
    </style>

    <div id="list" class="row">
        <div class="col-sm-12">
            <section class="card">
                <header class="card-header">
                    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Danh Sách Đơn Hàng</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.orders.index') }}" style="color: inherit;">Orders</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Danh Sách Đơn Hàng</li>
                            </ol>
                        </nav>
                    </div>
                </header>

                <div class="card-body">
                    <div class="adv-table">
                    @if (session('success'))
                        <div class="alert alert-success">
                            {{ session('success') }}
                        </div>
                    @endif

                    @if (session('error'))
                        <div class="alert alert-danger">
                            {{ session('error') }}
                        </div>
                    @endif
                        <div id="hidden-table-info_wrapper" class="dataTables_wrapper form-inline" role="grid">
                            <div class="row-fluid">
                                <div class="span6">
                                    <div id="hidden-table-info_length" class="dataTables_length">
                                        <form action="{{ route('admin.orders.index') }}" method="GET">
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
                                        @if (auth()->user()->hasRole(['admin']))
                                            <a href="{{ route('admin.orders.create') }}" class="btn btn-success btn-sm">Tạo
                                                mới</a>
                                        @endif
                                    </div>
                                </div>
                            </div>

                            <table class="display table table-bordered" id="hidden-table-info"
                                aria-describedby="hidden-table-info_info">
                                <thead class="">
                                    <tr class="text-center">
                                        <th>#</th>
                                        <th>Tên</th>
                                        <th>Số điện thoại</th>
                                        <th>PTTT</th>
                                        <th>Địa chỉ</th>
                                        <th>Tổng tiền</th>
                                        <th>Ngày tạo</th>
                                        <th>Ngày cập nhật</th>
                                        <th>Trạng Thái Thanh Toán</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($orders as $order)
                                        <tr>
                                            <td>{{ $order->id }}</td>
                                            <td style="width: 120px;">{{ $order->name }}</td>
                                            <td class="text-end">{{ $order->phone }}</td>
                                            <td>{{ $order->payment_method }}</td>
                                            <td class="text-truncate">{{ $order->address }}</td>
                                            <td class="text-end" style="width: 150px;">
                                                {{ number_format($order->total_amount, 0, ',', '.') }} VND
                                            </td>
                                            <td style="width: 100px;">{{ $order->order_date }}</td>
                                            <td style="width: 100px;">{{ $order->updated_at }}</td>
                                            <td style="width: 120px;">
                                                @if ($order->payment_status === 'unpaid')
                                                    @if ($order->status === 'cancelled')
                                                        <p class="text-secondary text-center">Đã hủy</p>
                                                    @else
                                                        <form
                                                            action="{{ route('admin.orders.updatePaymentStatus', $order->id) }}"
                                                            method="POST">
                                                            @csrf
                                                            @method('PUT')
                                                            <select name="payment_status" class="form-select"
                                                                onchange="this.form.submit()">
                                                                <option value="unpaid"
                                                                    {{ $order->payment_status === 'unpaid' ? 'selected' : '' }}>
                                                                    Chưa thanh toán</option>
                                                                <option value="paid"
                                                                    {{ $order->payment_status === 'paid' ? 'selected' : '' }}>
                                                                    Đã thanh toán</option>
                                                            </select>
                                                        </form>
                                                    @endif
                                                @else
                                                    @if ($order->payment_status === 'paid')
                                                        <form
                                                            action="{{ route('admin.orders.updatePaymentStatus', $order->id) }}"
                                                            method="POST">
                                                            @csrf
                                                            @method('PUT')
                                                            <select name="payment_status" class="form-select"
                                                                onchange="this.form.submit()">
                                                                <option value="paid"
                                                                    {{ $order->payment_status === 'paid' ? 'selected' : '' }}>
                                                                    Đã thanh toán</option>
                                                                <option value="refund"
                                                                    {{ $order->payment_status === 'refund' ? 'selected' : '' }}>
                                                                    Đã hoàn tiền</option>
                                                            </select>
                                                        </form>
                                                    @else
                                                        <p class="text-success text-center">Đã hoàn tiền</p>
                                                    @endif
                                                @endif
                                            </td>
                                            <td>
                                                @if ($order->status === 'cancelled' || $order->status === 'completed')
                                                    <p class="text-success text-center">{{ ucfirst($order->status) }}</p>
                                                @else
                                                    <form action="{{ route('admin.orders.updateStatus', $order->id) }}"
                                                        method="POST">
                                                        @csrf
                                                        @method('PUT')
                                                        <select name="status" class="form-select"
                                                            onchange="this.form.submit()">
                                                            @foreach ($allowedTransitions[$order->status] as $status)
                                                                <option value="{{ $status }}"
                                                                    {{ $order->status == $status ? 'selected' : '' }}>
                                                                    {{ ucfirst($status) }}
                                                                </option>
                                                            @endforeach
                                                        </select>
                                                    </form>
                                                @endif
                                            </td>
                                            <td>
                                                <a href="{{ route('admin.orders.show', $order->id) }}"
                                                    class="btn btn-primary"><i class="fa fa-eye"></i></a>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>

                            <div class="row-fluid">
                                <div class="span6">
                                    <div class="dataTables_info" id="hidden-table-info_info">
                                        Hiển thị từ {{ $orders->firstItem() }} đến {{ $orders->lastItem() }} của tổng cộng
                                        {{ $orders->total() }} mục
                                    </div>
                                </div>
                                <div class="span6">
                                    <div class="dataTables_paginate paging_bootstrap pagination">
                                        <ul class="pagination">
                                            <li class="prev">
                                                <a href="{{ $orders->previousPageUrl() }}" aria-label="Previous">←
                                                    Trước</a>
                                            </li>
                                            @foreach ($orders->getUrlRange(1, $orders->lastPage()) as $page => $url)
                                                <li class="{{ $page == $orders->currentPage() ? 'active' : '' }}">
                                                    <a href="{{ $url }}">{{ $page }}</a>
                                                </li>
                                            @endforeach
                                            <li class="next">
                                                <a href="{{ $orders->nextPageUrl() }}" aria-label="Next">Sau →</a>
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

    <script src="{{ asset('assets') }}/admin/js/dynamic_table_init.js"></script>

@endsection
