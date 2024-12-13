@extends('admin.layout')
@section('content')
<div class="row">
    <div class="col-sm-12">
        <section class="card">
            <div class="card-header mt-4 d-flex justify-content-between">
                <form method="GET" action="{{ route('admin.index') }}" class="row g-3 align-items-center ms-1">
                    <select id="timeFrame" name="timeFrame" class="form-select" onchange="this.form.submit()">
                        <option value="day" {{ request('timeFrame') === 'day' || ($timeFrame == 'day') ? 'selected' : '' }}>Theo ngày</option>
                        <option value="week" {{ request('timeFrame') === 'week' || ($timeFrame == 'week') ? 'selected' : '' }}>Theo tuần</option>
                        <option value="month" {{ (request('timeFrame') === 'month' || ($timeFrame == 'month')) || (empty(request('timeFrame')) && !$timeFrame)? 'selected' : '' }}>Theo tháng</option>
                        <option value="quarter" {{ request('timeFrame') === 'quarter' || ($timeFrame == 'quarter') ? 'selected' : '' }}>Theo quý</option>
                        <option value="year" {{ request('timeFrame') === 'year' || ($timeFrame == 'year') ? 'selected' : '' }}>Theo năm</option>
                    </select>
                </form>
                <form method="GET" action="{{ route('admin.index') }}" id="dateRangeForm" class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="startDate" class="form-label mb-0">Từ ngày:</label>
                    </div>
                    <div class="col-auto">
                        <input type="date" id="startDate" name="startDate" class="form-control" value="{{ request('startDate') }}">
                    </div>
                    <div class="col-auto">
                        <label for="endDate" class="form-label mb-0">Đến ngày:</label>
                    </div>
                    <div class="col-auto">
                        <input type="date" id="endDate" name="endDate" class="form-control" value="{{ request('endDate') }}">
                    </div>
                    <div class="col-auto">
                        <button type="submit" class="btn btn-primary">Lọc</button>
                    </div>
                </form>
            </div>
            <header class="card-header">
                <!--state overview start-->
                <div class="row state-overview">
                    <div class="col-lg-4 col-sm-6">
                        <section class="card">
                            <div class="symbol red">
                                <i class="bi bi-box-seam"></i>
                            </div>
                            <div class="value">
                                <h1 class="text-truncate" style="max-width: 100%;" data-bs-toggle="tooltip"
                                    title="{{ $totalProducts['total_sold'] }}">
                                    {{ $totalProducts['total_sold'] }}
                                </h1>
                                <p class="text-truncate" style="max-width: 100%;" data-bs-toggle="tooltip"
                                    title="{{ $totalProducts['product_name']}}">{{ $totalProducts['product_name'] }}</p>
                                <p>Sản phẩm bán chạy nhất {{ strtolower($timeFrameText['subTextTimeFrame']) }}</p>
                            </div>
                        </section>
                    </div>
                    <div class="col-lg-4 col-sm-6">
                        <section class="card">
                            <div class="symbol yellow">
                                <i class="bi bi-receipt"></i>
                            </div>
                            <div class="value">
                                <h1 class="text-truncate" style="max-width: 100%;" data-bs-toggle="tooltip"
                                    title="{{ $totalOrders }}">
                                    {{ $totalOrders }}
                                </h1>
                                <p>Số đơn hàng trong {{ strtolower($timeFrameText['subTextTimeFrame']) }}</p>
                            </div>
                        </section>
                    </div>
                    <div class="col-lg-4 col-sm-6">
                        <section class="card">
                            <div class="symbol blue">
                                <i class="bi bi-reception-4"></i>
                            </div>
                            <div class="value">
                                <h1 class="text-truncate" style="max-width: 100%;" data-bs-toggle="tooltip"
                                    title="{{ number_format($totalRevenue, 0, ',', '.') }} VND">
                                    {{ number_format($totalRevenue, 0, ',', '.') }} VND
                                </h1>
                                <p>Doanh thu {{ strtolower($timeFrameText['subTextTimeFrame']) }}</p>
                            </div>
                        </section>
                    </div>
                </div>
                <!--state overview end-->
            </header>
            <div class="card-body">

                <h2 class="mt-5 mb-3">Thống Kê Doanh Thu Theo Từng Sản Phẩm Trong {{ $timeFrameText['subTextTimeFrame'] }}</h2>
                <table class="table table-bordered">
                    <thead>
                        <tr class="text-center">
                            <th>STT</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Số lượng sản phẩm đã bán</th>
                            <th>Số lượng tồn kho</th>
                            <th>Doanh Thu (VND)</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($revenueByProduct as $key => $product)
                        <tr>
                            <td class="text-center">{{ $key + 1 }}</td>
                            <td style="max-width: 500px;">{{ $product['name'] }}</td>
                            <td class="text-right">{{ $product['total_sold'] }}</td>
                            <td class="text-right">{{ $product['total_quantity_in_stock'] }}</td>
                            <td class="text-right">{{ number_format($product['total_revenue'], 0, ',', '.') }} VND</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
                <!-- Hiển thị doanh thu theo tháng -->
                <h3 class="mt-5 mb-3">Biểu Đồ Doanh Thu {{ $timeFrameText['textHeaderChar'] }} Gần Nhất</h3>
                <canvas id="revenueChart"></canvas>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <h3>Danh sách trạng thái đơn hàng trong {{ strtolower($timeFrameText['subTextTimeFrame']) }}</h3>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Trạng thái</th>
                                <th>Số lượng</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($tableData as $data)
                            <tr>
                                <td>{{ $data['status'] }}</td>
                                <td>{{ $data['count'] }}</td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                <div class="col-md-6">
                    <h3>Biểu đồ trạng thái đơn hàng trong {{ strtolower($timeFrameText['subTextTimeFrame']) }}</h3>
                    <div style="width:400px; height:400px; margin-top:-70px">
                        <canvas id="orderStatusChart"></canvas>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
@endsection
@section('js')
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    var months = @json($revenueChart['labels']);
    var revenues = @json($revenueChart['revenues']);
    var textTimeFrame = @json($revenueChart['textTimeFrame']);

    var revenueCtx = document.getElementById('revenueChart').getContext('2d');
    var revenueChart = new Chart(revenueCtx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'Doanh thu theo ' + textTimeFrame,
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
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
    // Khởi tạo tooltip
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
</script>
<script>
    var labels = @json($pieChartData['labels']);
    var data = @json($pieChartData['values']);

    // Khởi tạo biểu đồ tròn với Chart.js
    const orderStatusCtx = document.getElementById('orderStatusChart').getContext('2d');
    const orderStatusChart = new Chart(orderStatusCtx, {
        type: 'pie',
        data: {
            labels: labels, // Mảng các trạng thái đơn hàng
            datasets: [{
                data: data, // Mảng các giá trị số lượng
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'], // Màu sắc cho các phần của biểu đồ
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'right', // Chuyển chú thích sang bên trái
                }
            }
        }
    });
</script>
@endsection