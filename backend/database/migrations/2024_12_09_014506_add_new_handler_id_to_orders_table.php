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
        Schema::table('orders', function (Blueprint $table) {
            $table->unsignedBigInteger('handler_id')->nullable()->after('status');  // Thêm cột handler_id
            $table->foreign('handler_id')->references('id')->on('users')->onDelete('set null');  // Quan hệ với bảng users
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['handler_id']);  // Xóa khóa ngoại
            $table->dropColumn('handler_id');  // Xóa cột handler_id
        });
    }
};
