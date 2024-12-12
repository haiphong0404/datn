<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class StatisticsService
{
    public function getTimeFrameFromDateRange($startDate, $endDate, $timeFrame)
    {
        if ($startDate && $endDate) {
            $start = Carbon::parse($startDate);
            $end = Carbon::parse($endDate);
            $differenceInDays = $start->diffInDays($end);

            if ($differenceInDays >= 365) {
                return 'year';
            } else if ($differenceInDays >= 90) {
                return 'quarter';
            } else if ($differenceInDays >= 30) {
                return 'month';
            } else if ($differenceInDays >= 7) {
                return 'week';
            } else if ($differenceInDays < 7) {
                return 'day';
            }
        }
        
        return $timeFrame;
    }
    


    protected function applyTimeFilter($query, string $timeFrame, ?string $startDate = null, ?string $endDate = null, string $dateField = 'created_at'): void
    {
        // Nếu có startDate và endDate thì áp dụng lọc theo khoảng thời gian
        if ($startDate && $endDate) {
            $query->whereBetween($dateField, [$startDate, $endDate]);
            return;
        } 

        // Nếu chỉ có startDate, lọc từ startDate đến hiện tại
        if ($startDate) {
            $query->where($dateField, '>=', $startDate);
            return;
        }

        // Nếu chỉ có endDate, lọc đến endDate
        if ($endDate) {
            $query->where($dateField, '<=', $endDate);
            return;
        }

        // Nếu không có khoảng thời gian cụ thể, áp dụng theo timeFrame
        switch ($timeFrame) {
            case 'day':
                $query->whereDate($dateField, Carbon::today());
                break;
            case 'week':
                $query->where(DB::raw('WEEK(' . $dateField . ', 1)'), Carbon::now()->weekOfYear)
                    ->whereYear($dateField, Carbon::now()->year);
                break;
            case 'month':
                $query->whereMonth($dateField, Carbon::now()->month)
                    ->whereYear($dateField, Carbon::now()->year);
                break;
            case 'quarter':
                $query->where(DB::raw('QUARTER(' . $dateField . ')'), Carbon::now()->quarter)
                    ->whereYear($dateField, Carbon::now()->year);
                break;
            case 'year':
                $query->whereYear($dateField, Carbon::now()->year);
                break;
            default:
                throw new InvalidArgumentException("Invalid time frame: $timeFrame");
        }
    }

    /**
     * Lấy tổng số sản phẩm
     *
     * @return int
     */
    public function getTopSellingProduct(string $timeFrame, ?string $startDate = null, ?string $endDate = null, string $dateField = 'orders.created_at'): array
    {
        // Truy vấn sản phẩm bán chạy nhất, lọc theo trạng thái đơn hàng 'completed'
        $query = OrderDetail::select('product_variants.product_id', DB::raw('SUM(order_details.quantity) as total_sold'))
                            ->join('orders', 'orders.id', '=', 'order_details.order_id') // Kết nối bảng orders
                            ->join('product_variants', 'product_variants.id', '=', 'order_details.product_variant_id') // Kết nối bảng product_variants
                            ->join('products', 'products.id', '=', 'product_variants.product_id') // Kết nối bảng products qua product_variants
                            ->where('orders.status', 'completed'); // Lọc theo trạng thái 'completed'
                            
        $this->applyTimeFilter($query, $timeFrame, $startDate, $endDate, $dateField);

        $topSelling = $query->groupBy('product_variants.product_id')
        ->orderByDesc(DB::raw('SUM(order_details.quantity)'))
        ->first(); // Lấy sản phẩm bán chạy nhất

        if ($topSelling) {
            // Lấy tên sản phẩm từ bảng products
            $product = Product::find($topSelling->product_id);

            return [
            'product_name' => $product ? $product->name : 'Không tìm thấy sản phẩm',
            'total_sold' => $topSelling->total_sold ?? 0, // Truy cập thuộc tính thay vì key mảng
            ];
        }

        return [
            'product_name' => $product?->name ?? 'Không có sản phẩm bán chạy',
            'total_sold' => $topSelling->total_sold ?? 0, // Truy cập thuộc tính thay vì key mảng
        ];
    }

    public function gettotalOrders(string $timeFrame, ?string $startDate = null, ?string $endDate = null): int
    {
        $role = Auth::user()->role;
        $query = Order::query();
        $userID = Auth::user()->id;

        if ($role === "admin") {
            $this->applyTimeFilter($query, $timeFrame, $startDate, $endDate);
            return $query->count();
        } else {
            Order::where('handler_id', $userID);
            $this->applyTimeFilter($query, $timeFrame, $startDate, $endDate);
            return $query->count();
        }
    }
//yes
    public function gettotalRevenue(): int
    {
        $role = Auth::user()->role;
        $userID = Auth::user()->id;
        if ($role === "admin") {
            // Tổng doanh thu trong tháng hiện tại
            return Order::where('status', 'completed')
                        ->whereMonth('created_at', Carbon::now()->month)
                        ->whereYear('created_at', Carbon::now()->year)
                        ->sum('total_amount');
        } else {
            // Tổng doanh thu trong tháng hiện tại handler_id của người dùng hiện tại
            return Order::where('status', 'completed')
                        ->where('handler_id', $userID)
                        ->whereMonth('created_at', Carbon::now()->month)
                        ->whereYear('created_at', Carbon::now()->year)
                        ->sum('total_amount');
        }
    }
//yes
    public function getRevenueByProduct(): array
    {
        $role = Auth::user()->role;
        $userID = Auth::user()->id;
        // Khởi tạo query lấy thông tin sản phẩm, doanh thu và số lượng tồn kho
        $query = Product::query()
            ->select(
                'products.id',
                'products.name',
                'products.total_quantity_in_stock', // Thêm trường quantity_in_stock từ bảng products
                DB::raw('SUM(order_details.quantity) as total_sold'),
                DB::raw('SUM(order_details.quantity * order_details.price) as total_revenue')
            )
            ->join('product_variants', 'products.id', '=', 'product_variants.product_id') // Join với bảng product_variants
            ->join('order_details', 'product_variants.id', '=', 'order_details.product_variant_id') // Join với bảng order_details qua product_variant_id
            ->join('orders', 'order_details.order_id', '=', 'orders.id') // Join thêm với bảng orders
            ->where('orders.status', 'completed')
            ->groupBy('products.id', 'products.name', 'products.total_quantity_in_stock'); // Thêm trường quantity_in_stock vào group by

        // Nếu là admin, lấy doanh thu theo tháng hiện tại
        if ($role === "admin") {
            $query->whereMonth('order_details.created_at', Carbon::now()->month)
                  ->whereYear('order_details.created_at', Carbon::now()->year);
        } else {
            // Nếu không phải admin, lấy doanh thu theo tháng hiện tại nhưng phải có handler_id là chính staff đó
            $query->where('orders.handler_id', $userID)
              ->whereMonth('order_details.created_at', Carbon::now()->month)
              ->whereYear('order_details.created_at', Carbon::now()->year);
        }

        // Lấy dữ liệu và trả về dưới dạng mảng
        return $query->orderByDesc('total_revenue')->get()->toArray();
    }

    public function getTimeFrameText($timeFrame)
{
    switch ($timeFrame) {
        case 'day':
            return [
                'subTextTimeFrame' => 'Ngày',
                'textHeaderChar' => '30 Ngày'
            ];
        case 'week':
            return [
                'subTextTimeFrame' => 'Tuần',
                'textHeaderChar' => '12 Tuần'
            ];
        case 'month':
            return [
                'subTextTimeFrame' => 'Tháng',
                'textHeaderChar' => '12 Tháng'
            ];
        case 'quarter':
            return [
                'subTextTimeFrame' => 'Quý',
                'textHeaderChar' => '12 Quý'
            ];
        case 'year':
            return [
                'subTextTimeFrame' => 'Năm',
                'textHeaderChar' => '5 Năm'
            ];
        default:
            return [
                'subTextTimeFrame' => 'Tháng',
                'textHeaderChar' => '12 Tháng'
            ];
    }
}

    public function getRevenueByTimeFrameForChart(string $timeFrame): array
    {
        $user = Auth::user();
        $labels = [];
        $revenues = [];
        $textTimeFrame = "";
        // Tính toán theo timeFrame
        switch ($timeFrame) {
            case 'day':
                // Lấy doanh thu theo từng ngày trong tháng hiện tại
                $textTimeFrame = "ngày";
                for ($i = 0; $i < 30; $i++) { // 30 ngày gần nhất
                    $day = Carbon::now()->subDays($i);
                    $labels[] = $day->format('d M Y'); // Format ngày theo dạng 'dd MMM YYYY'

                    $query = Order::where('status', 'completed')
                        ->whereDate('created_at', $day);

                    if ($user->role === 'staff') {
                        $query->where('handler_id', $user->id);
                    }

                    $totalRevenue = $query->sum('total_amount');
                    $revenues[] = $totalRevenue;
                }
                break;

            case 'week':
                // Lấy doanh thu theo từng tuần trong 12 tuần gần nhất
                $textTimeFrame = "tuần";
                for ($i = 0; $i < 12; $i++) { // 12 tuần gần nhất
                    $week = Carbon::now()->subWeeks($i);
                    $startOfWeek = $week->startOfWeek()->format('Y-m-d H:i:s');
                    $endOfWeek = $week->endOfWeek()->format('Y-m-d H:i:s');
                    $labels[] = 'Tuần ' . $week->format('W') . ' - ' . $week->format('Y'); // Format tuần theo 'W - YYYY'

                    $query = Order::where('status', 'completed')
                        ->whereBetween('created_at', [$startOfWeek, $endOfWeek]);

                    if ($user->role === 'staff') {
                        $query->where('handler_id', $user->id);
                    }

                    $totalRevenue = $query->sum('total_amount');
                    $revenues[] = $totalRevenue;
                }
                break;

            case 'month':
                // Lấy doanh thu theo tháng trong năm
                $textTimeFrame = "tháng";
                for ($i = 0; $i < 12; $i++) { // 12 tháng gần nhất
                    $month = Carbon::now()->subMonths($i);
                    $labels[] = $month->format('F Y'); // Format tháng theo 'Month YYYY'

                    $query = Order::where('status', 'completed')
                        ->whereMonth('created_at', $month->month)
                        ->whereYear('created_at', $month->year);

                    if ($user->role === 'staff') {
                        $query->where('handler_id', $user->id);
                    }

                    $totalRevenue = $query->sum('total_amount');
                    $revenues[] = $totalRevenue;
                }
                break;

            case 'quarter':
                // Lấy doanh thu theo quý trong năm
                $textTimeFrame = "quý";
                for ($i = 0; $i < 12; $i++) { // 4 quý gần nhất
                    $quarter = Carbon::now()->subQuarters($i);
                    $labels[] = 'Quý ' . ceil(($quarter->month) / 3) . ' - ' . $quarter->format('Y'); // Format quý theo 'Q - YYYY'

                    $query = Order::where('status', 'completed')
                        ->whereQuarter('created_at', ceil(($quarter->month) / 3))
                        ->whereYear('created_at', $quarter->year);

                    if ($user->role === 'staff') {
                        $query->where('handler_id', $user->id);
                    }

                    $totalRevenue = $query->sum('total_amount');
                    $revenues[] = $totalRevenue;
                }
                break;

            case 'year':
                // Lấy doanh thu theo 5 năm gần nhất
                $textTimeFrame = "năm";
                for ($i = 0; $i < 5; $i++) {
                    // Lùi lại từng năm
                    $year = Carbon::now()->subYears($i);
                    $labels[] = $year->format('Y'); // Thêm năm vào mảng labels

                    // Truy vấn doanh thu trong năm đó
                    $query = Order::where('status', 'completed')
                        ->whereYear('created_at', $year->year);

                    if ($user->role === 'staff') {
                        $query->where('handler_id', $user->id);
                    }

                    // Tính tổng doanh thu trong năm
                    $totalRevenue = $query->sum('total_amount');
                    $revenues[] = $totalRevenue;
                }
                break;

            default:
                throw new InvalidArgumentException("Invalid time frame: $timeFrame");
        }

        // Đảo lại thứ tự để có dữ liệu gần nhất ở bên phải
        return [
            'textTimeFrame' => $textTimeFrame,
            'labels' => array_reverse($labels),
            'revenues' => array_reverse($revenues)
        ];
    }

}
