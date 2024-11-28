@extends('admin.layout')

@section('content')
<div class="bg-body-light py-3">
    <div class="content content-full">
        <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
            <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Chi tiết đơn hàng</h1>
            <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.orders.index') }}" class="text-decoration-none text-dark">Orders</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Chi tiết đơn hàng</li>
                </ol>
            </nav>
        </div>
    </div>
</div>

<div class="content">
    <div class="block block-rounded">
        <div class="block-header block-header-default">
            <h3 class="block-title">Chi tiết đơn hàng</h3>
        </div>
        <div class="block-content">
            <!-- Thông tin chung của đơn hàng -->
            <div class="row mb-4">
                <div class="col-md-6">
                    <p><strong>Ngày đặt hàng:</strong> {{ $order->order_date }}</p>
                    <p><strong>Trạng thái:</strong> <span class="badge bg-info">{{ ucfirst($order->status) }}</span></p>
                    <p><strong>Tên khách hàng:</strong> {{ $order->name }}</p>
                    <p><strong>Số điện thoại:</strong> {{ $order->phone }}</p>
                </div>
                <div class="col-md-6">
                    <p><strong>Phương thức thanh toán:</strong> {{ ($order->payment_method == "cash") ? "Thanh toán offline" : "Thanh toán online"}}</p>
                    <p><strong>Trạng thái thanh toán:</strong> {{ ($order->payment_status == "unpaid") ? "Chưa thanh toán" : "Đã thanh toán"}}</p>
                    <p><strong>Địa chỉ giao hàng:</strong> {{ $order->address }}</p>
                    <p><strong>Thông tin thêm:</strong> {{ $order->infor ?? 'Không có thông tin thêm' }}</p>
                </div>
            </div>

            <!-- Danh sách sản phẩm -->
            <h4>Sản phẩm đã mua</h4>
            <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Biến thể (Kích thước / Màu sắc)</th>
                            <th class="text-center">Số lượng</th>
                            <th class="text-end">Đơn giá</th>
                            <th class="text-end">Tổng</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($order->orderDetails as $detail)
                        <tr>
                            <td>{{ $detail->productVariant->product->name }}</td>
                            <td>{{ $detail->productVariant->size->name }} / {{ $detail->productVariant->color->name }}</td>
                            <td class="text-center">{{ $detail->quantity }}</td>
                            <td class="text-end">{{ number_format($detail->price, 0, ',', '.') }} VND</td>
                            <td class="text-end">{{ number_format($detail->quantity * $detail->price, 0, ',', '.') }} VND</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            <!-- Tổng số tiền của đơn hàng -->
            <div class="row">
                <div class="col-md-6 offset-md-6">
                    <div class="table-responsive">
                        <table class="table">
                            <tr>
                                <th>Tổng số tiền:</th>
                                <td class="text-end">{{ number_format($order->total_amount, 0, ',', '.') }} VND</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
@endsection
