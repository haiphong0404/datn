<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Product;
use App\Models\Voucher;
use App\Models\ProductVariant;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class OrderService
{
    // Hàm tính lại tổng số lượng sản phẩm tồn kho
    protected function updateTotalQuantityInStock($productIds)
    {
        foreach ($productIds as $productId) {
            $product = Product::find($productId);

            if ($product) {
                // Tính tổng số lượng từ tất cả các biến thể của sản phẩm
                $totalQuantity = $product->variants()->sum('quantity');
                $product->total_quantity_in_stock = $totalQuantity;
                $product->save();
            }
        }
    }

    // Hàm khôi phục số lượng biến thể
    protected function restoreQuantities(array $originalQuantities)
    {
        foreach ($originalQuantities as $variantId => $originalQuantity) {
            $variant = ProductVariant::find($variantId);
            if ($variant) {
                $variant->quantity = $originalQuantity; // Khôi phục về số lượng ban đầu
                $variant->save();
            }
        }
    }

    /**
     * Tạo chi tiết đơn hàng
     *
     * @param Order $order
     * @param array $products
     * @return float Tổng số tiền của đơn hàng
     */
    protected function createOrderDetails(Order $order, array $products)
    {
        $totalAmount = 0;
        $originalQuantities = []; // Mảng lưu trữ số lượng ban đầu của biến thể
        $arrProduct_id = [];

        // Tạo một mảng để lưu trữ các biến thể
        $variantIds = array_column($products, 'variant_id');
        $variants = ProductVariant::whereIn('id', $variantIds)->get()->keyBy('id');

        foreach ($products as $productData) {
            // Kiểm tra dữ liệu đầu vào
            if (!isset($productData['variant_id'], $productData['quantity'], $productData['price'])) {
                throw new \Exception('Thông tin sản phẩm không hợp lệ.');
            }

            $variant = $variants->get($productData['variant_id']);
            if (!$variant) {
                throw new \Exception("Biến thể ID {$productData['variant_id']} không tồn tại.");
            }

            // Kiểm tra đủ hàng tồn kho
            if ($variant->quantity < $productData['quantity']) {
                throw new \Exception("Không đủ hàng cho biến thể ID {$productData['variant_id']}.");
            }

            // Ghi lại số lượng ban đầu
            $originalQuantities[$productData['variant_id']] = $variant->quantity;

            // Ghi lại id của product
            $arrProduct_id[] = $variant->product_id;

            // Tạo chi tiết đơn hàng
            $orderDetail = new OrderDetail();
            $orderDetail->order_id = $order->id;
            $orderDetail->product_variant_id = $productData['variant_id'];
            $orderDetail->quantity = $productData['quantity'];
            $orderDetail->price = $productData['price'];
            $orderDetail->save();

            // Tính tổng tiền
            $totalAmount += $orderDetail->quantity * $orderDetail->price;

            // Trừ số lượng từ biến thể
            $variant->quantity -= $productData['quantity'];
            $variant->save();

        }

        // Tính lại tổng số sản phẩm tồn kho
        $this->updateTotalQuantityInStock($arrProduct_id);

        return [$totalAmount, $originalQuantities, $arrProduct_id]; // Trả về tổng tiền và số lượng ban đầu
    }


    /**
     * Tạo một đơn hàng mới
     *
     * @param Request $request
     * @return Order
     */
    public function createOrder(Request $request)
    {
        // Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu
        DB::beginTransaction();
        try {
            // Tạo đơn hàng
            $order = new Order();
            $order->user_id = Auth::id();
            $order->order_date = now();
            $order->status = 'pending';
            $order->total_amount = 0;
            $order->name = $request->input('name');
            $order->phone = $request->input('phone');
            $order->address = $request->input('address');
            $order->infor = $request->input('infor');
            $order->payment_method = $request->input('payment_method');
            $order->payment_status = $request->input('payment_status');

            $order->save();

            // Xử lý chi tiết đơn hàng
            list($totalAmount, $originalQuantities,$arrProduct_id) = $this->createOrderDetails($order, $request->input('products'));

            // Áp dụng mã giảm giá
            $voucherCode = $request->input('voucher_code');
            $discount = 0; // Lưu giá trị giảm giá cuối cùng

            if ($voucherCode) {
                $voucher = Voucher::where('code', $voucherCode)
                    ->where('quantity', '>', 0) // Chỉ chọn mã còn khả dụng
                    ->where(DB::raw('DATE(start_date)'), '<=', now()->toDateString()) // Kiểm tra mã đã bắt đầu có hiệu lực
                    ->where(DB::raw('DATE(expiration_date)'), '>=', now()->toDateString()) // Kiểm tra mã vẫn còn trong thời gian sử dụng
                    ->first();

                if (!$voucher) {
                    throw new \Exception('Mã giảm giá không hợp lệ hoặc đã hết.');
                }

                // Tính giảm giá dựa trên loại voucher
                switch ($voucher->type) {
                    case 'percentage':
                        // Giảm giá theo phần trăm, tối đa không vượt quá `max_discount_value`
                        $discount = min(
                            ($totalAmount * $voucher->discount_percentage) / 100,
                            $voucher->max_discount_value
                        );
                        break;

                    case 'fixed':
                        // Giảm giá cố định nếu đạt giá trị tối thiểu của đơn hàng
                        if ($totalAmount >= $voucher->min_order_value) {
                            $discount = $voucher->discount_value;
                        }
                        break;

                    case 'category_discount':
                        // Giảm giá theo danh mục
                        $products = $request->input('products');
                        foreach ($products as $product) {
                            $variant = ProductVariant::find($product['variant_id']);
                            if ($variant && $variant->product && $variant->product->category_id == $voucher->category_id) {
                                $discount += ($variant->price * $product['quantity'] * $voucher->discount_percentage) / 100;
                            }
                        }
                        break;
    
                    case 'first_order':
                        // Giảm giá cố định cho đơn hàng đầu tiên nếu đạt giá trị tối thiểu
                        if ($totalAmount >= $voucher->min_order_value) {
                            $discount = $voucher->discount_value;
                        }
                        break;
    
                    default:
                        throw new \Exception('Loại mã giảm giá không hợp lệ.');
                }

                // Cập nhật số lượng mã giảm giá
                if ($discount > 0) {
                    $voucher->quantity -= 1;
                    $voucher->save();
                }
            }

            // Cập nhật tổng tiền đơn hàng sau giảm giá
            $order->total_amount = $totalAmount - $discount;
            $order->save();

            // Commit transaction
            DB::commit();

            return $order;
        } catch (\Exception $e) {
            // Nếu có lỗi, rollback lại các thay đổi
            DB::rollBack();
            $this->restoreQuantities($originalQuantities); // Khôi phục số lượng biến thể
            $this->updateTotalQuantityInStock($arrProduct_id); // Tính lại tổng sản phẩm tồn kho
            throw $e; // Ném lại lỗi để xử lý ở nơi khác nếu cần
        }
    }

    public function getAllowedTransitions()
    {
        return [
            'pending' => ['pending', 'processing', 'completed', 'cancelled'],
            'processing' => ['processing', 'completed', 'cancelled'],
            'completed' => ['completed'], // Không thể thay đổi khi đã completed
            'cancelled' => ['cancelled'], // Không thể thay đổi khi đã cancelled
        ];
    }

    public function updateOrderStatus(Order $order, $newStatus)
    {
        $currentStatus = $order->status;
        $allowedTransitions = $this->getAllowedTransitions();

        // Kiểm tra trạng thái mới có hợp lệ không
        if (!in_array($newStatus, $allowedTransitions[$currentStatus])) {
            return false; // Không hợp lệ
        }

        // Nếu trạng thái mới giống trạng thái hiện tại, không cần cập nhật
        if ($newStatus === $currentStatus) {
            return true; // Không cần thay đổi
        }

        // Nếu trạng thái mới là 'cancelled', cộng lại số lượng cho các biến thể
        if ($newStatus === 'cancelled') {
            $arrProduct_id = [];
            foreach ($order->orderDetails as $orderDetail) {
                $variant = ProductVariant::find($orderDetail->product_variant_id);
                if ($variant) {
                    $variant->quantity += $orderDetail->quantity; // Cộng lại số lượng
                    $variant->save();
                    $arrProduct_id[] = $variant->product_id;
                }
            }
            $arrProduct_id = array_unique($arrProduct_id);
            $this->updateTotalQuantityInStock($arrProduct_id);
        }

        // Nếu trạng thái mới là 'completed', cập nhật payment_status thành 'paid'
        if ($newStatus === 'completed') {
            $order->payment_status = 'paid'; // Cập nhật payment_status thành 'paid'
        }

        // Cập nhật trạng thái nếu hợp lệ
        $order->status = $newStatus;
        $order->save();

        return true; // Thành công
    }
}
