@extends('admin.layout')

@section('css')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<link href="{{ asset('assets')}}/admin/css/list-brand.css" rel="stylesheet">
@endsection

@section('content')
<!-- Hero -->
<div class="bg-body-light py-3">
    <div class="content content-full">
        <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
            <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Danh sách đơn hàng</h1>
            <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.orders.index') }}" class="text-decoration-none text-dark">Orders</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Danh sách đơn hàng</li>
                </ol>
            </nav>
        </div>
    </div>
</div>
<!-- END Hero -->

<div class="content">
    <div class="block block-rounded">
        <div class="block-header block-header-default d-flex justify-content-between">
            <h3 class="block-title">Danh sách đơn hàng</h3>
            <div class="block-options">
                <a href="{{ route('admin.orders.create') }}" class="btn btn-alt-primary btn-sm" data-bs-toggle="tooltip" title="Thêm đơn hàng">
                    <i class="fa fa-plus"></i> Thêm
                </a>
            </div>
        </div>
        
        @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
        @endif

        @if (session('info'))
        <div class="alert alert-info">
            {{ session('info') }}
        </div>
        @endif

        @if (session('error'))
        <div class="alert alert-danger">
            {{ session('error') }}
        </div>
        @endif

        <div class="block-content">
            <div class="table-responsive">
                <table class="table table-hover table-striped table-bordered align-middle" id="ordersTable">
                    <thead class="table-dark">
                        <tr>
                            <th class="text-center" style="width: 50px;">#</th>
                            <th>Tên</th>
                            <th>Số điện thoại</th>
                            <th>Phương thức thanh toán</th>
                            <th>Địa chỉ</th>
                            <th class="text-end">Tổng tiền</th>
                            <th>Ngày tạo</th>
                            <th>Ngày cập nhật</th>
                            <th>Trạng thái thanh toán</th>
                            <th>Trạng thái</th>
                            <th class="text-center" style="width: 100px;">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($orders as $order)
                        <tr>
                            <td class="text-center">{{ $order->id }}</td>
                            <td>{{ $order->name }}</td>
                            <td>{{ $order->phone }}</td>
                            <td>{{ $order->payment_method }}</td>
                            <td>{{ \Str::limit($order->address, 30, '...') }}</td>
                            <td class="text-end">{{ number_format($order->total_amount, 0, ',', '.') }} VND</td>
                            <td>{{ $order->order_date }}</td>
                            <td>{{ $order->updated_at }}</td>
                            <td>
                                @if ($order->payment_status === 'unpaid')
                                    @if ($order->status === 'cancelled')
                                        <p class="text-secondary">Đã hủy</p>
                                    @else
                                        <form action="{{ route('admin.orders.updatePaymentStatus', $order->id) }}" method="POST">
                                            @csrf
                                            @method('PUT')
                                            <select name="payment_status" class="form-select" onchange="this.form.submit()">
                                                <option value="unpaid" {{ $order->payment_status === 'unpaid' ? 'selected' : '' }}>Chưa thanh toán</option>
                                                <option value="paid" {{ $order->payment_status === 'paid' ? 'selected' : '' }}>Đã thanh toán</option>
                                            </select>
                                        </form>
                                    @endif
                                @else
                                    <p class="text-success">Đã thanh toán</p>
                                @endif
                            </td>
                            <td>
                                @if ($order->payment_method === 'online')
                                    <p class="text-success">{{ ucfirst($order->status) }}</p>
                                @else
                                    @if ($order->status === 'cancelled' || $order->status === 'completed')
                                        <p class="text-success">{{ ucfirst($order->status) }}</p>
                                    @else
                                        <form action="{{ route('admin.orders.updateStatus', $order->id) }}" method="POST">
                                            @csrf
                                            @method('PUT')
                                            <select name="status" class="form-select" onchange="this.form.submit()">
                                                @foreach($allowedTransitions[$order->status] as $status)
                                                <option value="{{ $status }}" {{ $order->status == $status ? 'selected' : '' }}>
                                                    {{ ucfirst($status) }}
                                                </option>
                                                @endforeach
                                            </select>
                                        </form>
                                    @endif
                                @endif
                            </td>
                            <td class="text-center">
                                <a href="{{ route('admin.orders.show', $order->id) }}" class="btn btn-sm btn-info">
                                    <i class="fas fa-eye"></i> Show
                                </a>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection