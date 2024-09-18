<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // Mã giảm giá
            $table->decimal('discount_percentage', 5, 2); // Phần trăm giảm giá
            $table->date('start_date'); // Ngày bắt đầu
            $table->date('expiration_date'); // Ngày hết hạn
            $table->decimal('max_discount_value', 10, 2); // Giá trị giảm tối đa
            $table->decimal('min_order_value', 10, 2); // Giá trị đơn hàng tối thiểu để áp dụng voucher
            $table->integer('quantity'); // Số lượng voucher có sẵn
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Liên kết với bảng users (FK)
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
