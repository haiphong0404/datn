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
            $table->string('code')->unique(); // Mã voucher
            $table->string('type'); // Loại voucher
            $table->decimal('discount_percentage', 5, 2)->nullable(); // Phần trăm giảm giá
            $table->decimal('discount_value', 10, 2)->nullable(); // Giá trị giảm cố định
            $table->unsignedBigInteger('category_id')->nullable(); // ID danh mục
            $table->date('start_date'); // Ngày bắt đầu
            $table->date('expiration_date'); // Ngày hết hạn
            $table->decimal('max_discount_value', 10, 2)->nullable(); // Giá trị giảm tối đa
            $table->decimal('min_order_value', 10, 2)->nullable(); // Giá trị đơn hàng tối thiểu
            $table->integer('quantity'); // Số lượng voucher có sẵn
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Người dùng (FK)
            $table->timestamps();

            // Khóa ngoại liên kết tới bảng categories
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
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
