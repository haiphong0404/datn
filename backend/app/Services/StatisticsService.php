<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StatisticsService
{
    /**
     * Lấy tổng số sản phẩm
     *
     * @return int
     */
    public function getTotalProducts(): int
    {
        return Product::count(); // Truy vấn tổng số sản phẩm trong bảng products
    }

    public function gettotalOrders(): int
    {
        $role = Auth::user()->role;
        if ($role === "admin") {
            // Admin: Đếm đơn hàng trong tháng hiện tại
            return Order::whereMonth('created_at', Carbon::now()->month)
                        ->whereYear('created_at', Carbon::now()->year)
                        ->count();
        } else {
            // Người dùng khác: Đếm đơn hàng trong ngày hiện tại
            return Order::whereDate('created_at', Carbon::today())
                        ->count();
        }
    }

    public function gettotalRevenue(): int
    {
        $role = Auth::user()->role;
        if ($role === "admin") {
            // Admin: Tổng doanh thu trong tháng hiện tại
            return Order::whereMonth('created_at', Carbon::now()->month)
                        ->whereYear('created_at', Carbon::now()->year)
                        ->sum('total_amount');
        } else {
            // Khác: Tổng doanh thu trong ngày hiện tại
            return Order::whereDate('created_at', Carbon::today())
                        ->sum('total_amount');
        }
    }

    public function getRevenueByProduct(): array
    {
        $role = Auth::user()->role;
        // Khởi tạo query lấy thông tin sản phẩm, doanh thu và số lượng tồn kho
        $query = Product::query()
            ->select(
                'products.id',
                'products.name',
                'products.total_quantity_in_stock', // Thêm trường quantity_in_stock từ bảng products
                DB::raw('SUM(order_details.quantity * order_details.price) as total_revenue')
            )
            ->join('product_variants', 'products.id', '=', 'product_variants.product_id') // Join với bảng product_variants
            ->join('order_details', 'product_variants.id', '=', 'order_details.product_variant_id') // Join với bảng order_details qua product_variant_id
            ->groupBy('products.id', 'products.name', 'products.total_quantity_in_stock'); // Thêm trường quantity_in_stock vào group by

        // Nếu là admin, lấy doanh thu theo tháng hiện tại
        if ($role === "admin") {
            $query->whereMonth('order_details.created_at', Carbon::now()->month)
                  ->whereYear('order_details.created_at', Carbon::now()->year);
        } else {
            // Nếu không phải admin, lấy doanh thu theo ngày hiện tại
            $query->whereDate('order_details.created_at', Carbon::today());
        }

        // Lấy dữ liệu và trả về dưới dạng mảng
        return $query->orderByDesc('total_revenue')->get()->toArray();
    }

    public function getRevenueByMonth(): array
    {
        $months = [];
        $revenues = [];

        // Lấy 12 tháng gần nhất
        for ($i = 0; $i < 12; $i++) {
            // Lùi tháng từ hiện tại
            $month = Carbon::now()->subMonths($i);

            // Thêm tên tháng vào mảng months
            $months[] = $month->format('F Y');

            // Tính tổng doanh thu cho mỗi tháng
            $totalRevenue = Order::whereMonth('created_at', $month->month)
                ->whereYear('created_at', $month->year)
                ->sum('total_amount');

            // Thêm tổng doanh thu vào mảng revenues
            $revenues[] = $totalRevenue;
        }

        // Đảo lại thứ tự tháng và doanh thu để có tháng gần nhất ở bên phải
        return [
            'months' => array_reverse($months),
            'revenues' => array_reverse($revenues),
        ];
    }
}
