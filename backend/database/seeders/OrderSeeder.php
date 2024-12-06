<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        // Tắt kiểm tra khóa ngoại nếu cần thiết (nếu dùng truncate thay vì delete)
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Xóa dữ liệu trong bảng order_details và orders
        DB::table('order_details')->delete(); // Xóa tất cả dữ liệu trong bảng order_details
        DB::table('orders')->delete(); // Xóa tất cả dữ liệu trong bảng orders

        // Tạo faker instance
        $faker = Faker::create();

        for ($i = 0; $i < 10; $i++) {
            // Random payment method
            $paymentMethod = $faker->randomElement(['online', 'cash']);

            // Set valid statuses based on payment method
            $validStatuses = $paymentMethod === 'online' ? ['pending', 'processing', 'completed'] : ['pending', 'processing', 'completed', 'cancelled'];

            // Random status from valid options
            $status = $faker->randomElement($validStatuses);

            // Determine payment status
            $paymentStatus = ($paymentMethod === 'online' || $status === 'completed') ? 'paid' : 'unpaid';

            // Insert data into the orders table
            DB::table('orders')->insert([
                'user_id' => User::inRandomOrder()->first()->id, // Lấy user_id ngẫu nhiên từ bảng users
                'order_date' => $faker->date(), // Ngày đặt hàng
                'status' => $status, // Trạng thái đơn hàng
                'payment_method' => $paymentMethod,
                'payment_status' => $paymentStatus, // Trạng thái thanh toán
                'total_amount' => $faker->numberBetween(1000, 50000),
                'shipping_fee' => $faker->numberBetween(1000, 50000),
                'voucher_discount' => $faker->numberBetween(1000, 50000), 
                'name' => $faker->name(), // Tên người nhận
                'phone' => $faker->phoneNumber(), // Số điện thoại người nhận
                'address' => $faker->address(), // Địa chỉ người nhận
                'infor' => $faker->text(), // Thông tin bổ sung
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }

        // Bật lại kiểm tra khóa ngoại sau khi xóa
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
