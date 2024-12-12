@extends('admin.layout')
@section('content')
    <div class="row">
        <div class="col-sm-12">
            <section class="card">
            <div>
                <form method="GET" action="{{ route('admin.index') }}">
                    <label for="timeFrame">Chọn khoảng thời gian:</label>
                    <select id="timeFrame" name="timeFrame" onchange="this.form.submit()">
                        <option value="day" {{ request('timeFrame') === 'day' ? 'selected' : '' }}>Theo ngày</option>
                        <option value="week" {{ request('timeFrame') === 'week' || ($timeFrame == 'week') ? 'selected' : '' }}>Theo tuần</option>
                        <option value="month" {{ (request('timeFrame') === 'month' || (!request('startDate') && !request('endDate') && !request('timeFrame') && (!$timeFrame || $timeFrame != 'month'))) ? 'selected' : '' }}>Theo tháng</option>
                        <option value="quarter" {{ request('timeFrame') === 'quarter' ? 'selected' : '' }}>Theo quý</option>
                        <option value="year" {{ request('timeFrame') === 'year' ? 'selected' : '' }}>Theo năm</option>
                    </select>
                </form>
                <form method="GET" action="{{ route('admin.index') }}" id="dateRangeForm">
                    <label for="startDate">Từ ngày:</label>
                    <input type="date" id="startDate" name="startDate" value="{{ request('startDate') }}">

                    <label for="endDate">Đến ngày:</label>
                    <input type="date" id="endDate" name="endDate" value="{{ request('endDate') }}">

                    <button type="submit">Lọc</button>
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
                                    <p>Doanh thu {{  $timeFrameText['subTextTimeFrame']  }}</p>
                                </div>
                            </section>
                        </div>
                    </div>
                    <!--state overview end-->
                </header>
                <div class="card-body">

                    <h2 class="mt-5 mb-3">Thống Kê Doanh Thu Theo Từng Sản Phẩm Trong {{ strtolower($timeFrameText['subTextTimeFrame']) }}</h2>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
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
                                    <td>{{ $key + 1 }}</td>
                                    <td>{{ $product['name'] }}</td>
                                    <td>{{ $product['total_sold'] }}</td>
                                    <td>{{ $product['total_quantity_in_stock'] }}</td>
                                    <td>{{ number_format($product['total_revenue'], 0, ',', '.') }} VND</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                        <!-- Hiển thị doanh thu theo tháng -->
                        <h3 class="mt-5 mb-3">Biểu Đồ Doanh Thu {{ $timeFrameText['textHeaderChar'] }} Gần Nhất</h3>
                        <canvas id="revenueChart"></canvas>
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

        var ctx = document.getElementById('revenueChart').getContext('2d');
        var revenueChart = new Chart(ctx, {
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
@endsection