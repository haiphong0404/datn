<?php

namespace App\Http\Controllers\Admins;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Product;
use App\Models\Order;
use App\Models\ProductVariant;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    protected $orderService;
    protected $order;

    // Inject OrderService vào Controller
    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Lấy tất cả orders từ cơ sở dữ liệu
        $orders = Order::all();

        // Quy tắc chuyển trạng thái
        $allowedTransitions = $this->orderService->getAllowedTransitions();

        // Truyền dữ liệu vào view
        return view('admin.orders.index', compact('orders', 'allowedTransitions'));
    }

    public function show(Order $order)
    {
        // Load các quan hệ cần thiết để hiển thị sản phẩm, biến thể và chi tiết đơn hàng
        $order->load('orderDetails.productVariant.product', 'orderDetails.productVariant.size', 'orderDetails.productVariant.color');

        return view('admin.orders.show', compact('order'));
    }

    // Hiển thị form tạo đơn hàng
    public function create()
    {
        return view('admin.orders.create');
    }

    // Lưu thông tin đơn hàng và chi tiết đơn hàng
    public function store(StoreOrderRequest $request)
    {
        try {
            // Gọi phương thức createOrder từ service để tạo đơn hàng
            $this->orderService->createOrder($request);

            // Redirect thành công với thông báo
            return redirect()->back()->with('success', 'Đơn hàng đã được tạo thành công');
        } catch (\Exception $e) {
            // Xử lý lỗi nếu có
            return redirect()->back()->with('error', 'Xảy ra lỗi trong khi tạo đơn hàng: ' . $e->getMessage());
        }
    }

    public function updateStatus(Request $request, Order $order)
    {
        // Lấy trạng thái mới từ request
        $newStatus = $request->status;
    
        // Sử dụng service để kiểm tra và cập nhật trạng thái
        $statusUpdated = $this->orderService->updateOrderStatus($order, $newStatus);
    
        // Kiểm tra kết quả
        if ($newStatus === $order->status) {
            return redirect()->route('admin.orders.index')
                ->with('info', 'Trạng thái đơn hàng đã là '.$newStatus.'. Không có thay đổi nào được thực hiện.');
        }
    
        if (!$statusUpdated) {
            return redirect()->route('admin.orders.index')
                ->with('error', 'Chuyển trạng thái không hợp lệ.');
        }
    
        // Trả về kết quả thành công nếu trạng thái được cập nhật
        return redirect()->route('admin.orders.index')->with('success', 'Trạng thái đơn hàng đã được cập nhật thành công.');
    }
    
    public function search(Request $request)
    {
        $search = $request->get('q');
        $products = Product::where('name', 'LIKE', "%{$search}%")->get();

        return response()->json($products);
    }

    // Tìm kiếm sản phẩm theo tên (sử dụng cho Select2)
    public function searchProducts(Request $request)
    {
        try {
            // Lấy từ khóa tìm kiếm
            $query = $request->input('q');
            $products = Product::where('name', 'LIKE', '%' . $query . '%')->get();

            // Ghi log kết quả tìm kiếm
            Log::info('Kết quả tìm kiếm:', $products->toArray());

            // Trả về JSON
            return response()->json($products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'text' => $product->name
                ];
            }));
        } catch (\Exception $e) {
            // Ghi log nếu có lỗi
            Log::error('Lỗi trong quá trình tìm kiếm sản phẩm: ' . $e->getMessage());
            return response()->json(['error' => 'Đã xảy ra lỗi'], 500);
        }
    }

    // Lấy các biến thể của sản phẩm
    public function getVariants($productId)
    {
        // Lấy danh sách biến thể của sản phẩm, đồng thời lấy tên màu sắc và kích thước thông qua bảng liên quan
        $variants = ProductVariant::with(['color', 'size'])
            ->where('product_id', $productId)
            ->get()
            ->map(function ($variant) {
                // Xây dựng text hiển thị cho mỗi biến thể dựa trên màu sắc và kích thước
                $variantName = "{$variant->color->name} - {$variant->size->name}";
                return [
                    'id' => $variant->id,
                    'name' => $variantName,
                    'price' => $variant->price,
                    'quantity' => $variant->quantity
                ];
            });

        return response()->json($variants);
    }
}
