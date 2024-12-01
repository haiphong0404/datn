@extends('admin.layout')
@section('content')
    <div class="row">
        <div class="col-sm-12">
            <section class="card">

                <header class="card-header">
                    <!--state overview start-->
                    <div class="row state-overview">
                        <div class="col-lg-4 col-sm-6">
                            <section class="card">
                                <div class="symbol red">
                                    <i class="fa fa-shopping-cart"></i>
                                </div>
                                <div class="value">
                                    <h1 class="">
                                        {{ $totalProducts }}
                                    </h1>
                                    <p>Số loại mặt hàng đang bán</p>
                                </div>
                            </section>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <section class="card">
                                <div class="symbol yellow">
                                    <i class="fa fa-shopping-cart"></i>
                                </div>
                                <div class="value">
                                    <h1 class="">
                                        {{ $totalOrders }}
                                    </h1>
                                    <p>Số đơn hàng trong tháng</p>
                                </div>
                            </section>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <section class="card">
                                <div class="symbol blue">
                                    <i class="fa fa-bar-chart-o"></i>
                                </div>
                                <div class="value">
                                    <h1 class="">
                                        {{ $totalRevenue }}
                                    </h1>
                                    <p>Doanh thu tháng</p>
                                </div>
                            </section>
                        </div>
                    </div>
                    <!--state overview end-->
                </header>
                <div class="card-body">

                <h2 class="mt-5 mb-3">Thống Kê Doanh Thu Theo Từng Sản Phẩm</h2>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Số lượng tồn kho</th>
                            <th>Doanh Thu (VND)</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($revenueByProduct as $key => $product)
                            <tr>
                                <td>{{ $key + 1 }}</td>
                                <td>{{ $product['name'] }}</td>
                                <td>{{ $product['total_quantity_in_stock'] }}</td>
                                <td>{{ number_format($product['total_revenue'], 0, ',', '.') }} VND</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>

                <!-- Hiển thị doanh thu theo tháng -->
                <h3 class="mt-5 mb-3">Biểu Đồ Doanh Thu 12 Tháng Gần Nhất</h3>
                <canvas id="revenueChart"></canvas>
                </div>
            </section>
        </div>
    </div>
@endsection
@section('js')
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        var months = @json($revenueByMonth['months']);
        var revenues = @json($revenueByMonth['revenues']);

        var ctx = document.getElementById('revenueChart').getContext('2d');
        var revenueChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'Revenue by Month',
                    data: revenues,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    </script>
@endsection
