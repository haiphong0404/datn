<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIncomingQuantityToProductsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Thêm cột incoming_quantity với giá trị mặc định là 0
            $table->integer('incoming_quantity')->default(0)->after('total_quantity_in_stock');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Xóa cột incoming_quantity nếu migration bị rollback
            $table->dropColumn('incoming_quantity');
        });
    }
}
