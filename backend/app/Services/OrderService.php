<?php

namespace App\Services;

use App\Models\Order;
use App\Models\ProductVariant;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderService
{
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

        return [$totalAmount, $originalQuantities]; // Trả về tổng tiền và số lượng ban đầu
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
            $order->user_id = $request->input('user_id');
            $order->order_date = now();
            $order->status = 'pending';
            $order->total_amount = 0;
            $order->name = $request->input('name');
            $order->phone = $request->input('phone');
            $order->address = $request->input('address');
            $order->infor = $request->input('infor');
            $order->save();

            // Xử lý chi tiết đơn hàng
            list($totalAmount, $originalQuantities) = $this->createOrderDetails($order, $request->input('products'));

            // Cập nhật tổng tiền đơn hàng
            $order->total_amount = $totalAmount;
            $order->save();

            // Commit transaction
            DB::commit();

            return $order;
        } catch (\Exception $e) {
            // Nếu có lỗi, rollback lại các thay đổi
            DB::rollBack();
            $this->restoreQuantities($originalQuantities); // Khôi phục số lượng biến thể
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
            foreach ($order->orderDetails as $orderDetail) {
                $variant = ProductVariant::find($orderDetail->product_variant_id);
                if ($variant) {
                    $variant->quantity += $orderDetail->quantity; // Cộng lại số lượng
                    $variant->save();
                }
            }
        }

        // Cập nhật trạng thái nếu hợp lệ
        $order->status = $newStatus;
        $order->save();

        return true; // Thành công
    }
}
