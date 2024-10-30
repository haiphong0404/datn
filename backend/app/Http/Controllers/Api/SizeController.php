<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Size; // Đảm bảo bạn đã import model Size
use Illuminate\Http\Request;

class SizeController extends Controller
{
    /**
     * Display a listing of sizes.
     */
    public function index()
    {
        $sizes = Size::all(); // Lấy tất cả kích thước

        return response()->json($sizes->map(function ($size) {
            return [
                'id' => $size->id,
                'name' => $size->name,
            ];
        }), 200);
    }

    /**
     * Display the specified size.
     */
}

