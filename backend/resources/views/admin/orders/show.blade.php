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
    <div class="row">
        <div class="col-sm-12">
            <div class="card shadow-sm">
                <header class="card-header">
                    <div class="bg-body-light py-3">
                        <div class="content content-full">
                            <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                                <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Chi tiết đơn hàng</h1>
                                <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item">
                                            <a href="{{ route('admin.orders.index') }}"
                                                class="text-decoration-none text-dark">Đơn Hàng</a>
                                        </li>
                                        <li class="breadcrumb-item active" aria-current="page">Chi tiết đơn hàng</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>
                <div class="card-body">
                    <!-- Thông tin chung của đơn hàng -->
                    <form action="{{ route('admin.orders.show', $order->id) }}" method="POST">
                        @csrf
                        @method('PUT')
                        <div class="block-content">
                            <!-- Thông tin chung của đơn hàng -->
                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <p><strong>Ngày đặt hàng:</strong> {{ $order->order_date }}</p>
                                    <p><strong>Trạng thái:</strong> <span
                                            class="badge bg-info">{{ ucfirst($order->status) }}</span></p>
                                    <p><strong>Tên khách hàng:</strong> {{ $order->name }}</p>
                                    <p><strong>Số điện thoại:</strong> {{ $order->phone }}</p>
                                </div>
                                <div class="col-md-6">
                                    <p><strong>Phương thức thanh toán:</strong>
                                        {{ $order->payment_method == 'cash' ? 'Thanh toán offline' : 'Thanh toán online' }}
                                    </p>
                                    <p><strong>Trạng thái thanh toán:</strong>
                                        {{ $order->payment_status == 'unpaid' ? 'Chưa thanh toán' : 'Đã thanh toán' }}</p>
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
                                        @foreach ($order->orderDetails as $detail)
                                            <tr>
                                                <td>{{ $detail->productVariant->product->name }}</td>
                                                <td>{{ $detail->productVariant->size->name }} /
                                                    {{ $detail->productVariant->color->name }}</td>
                                                <td class="text-center">{{ $detail->quantity }}</td>
                                                <td class="text-end">{{ number_format($detail->price, 0, ',', '.') }} VND
                                                </td>
                                                <td class="text-end">
                                                    {{ number_format($detail->quantity * $detail->price, 0, ',', '.') }}
                                                    VND</td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>Tổng số tiền:</th>
                                            <th colspan="5" class="text-end ">
                                                {{ number_format($order->total_amount, 0, ',', '.') }} VND</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                        </div>
                        <!-- Các nút hành động -->
                        <div class="d-flex justify-content-end mt-4">
                            <a href="{{ route('admin.orders.index') }}" class="btn btn-secondary flex-fill me-1">Quay
                                lại</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
