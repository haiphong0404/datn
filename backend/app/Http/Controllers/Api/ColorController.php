<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Color;

// Đảm bảo bạn đã import model Color
use Illuminate\Http\Request;

class ColorController extends Controller
{
    /**
     * Display a listing of colors.
     */
    public function index()
    {
        $colors = Color::all(); // Lấy tất cả màu sắc

        return response()->json($colors->map(function ($color) {
            return [
                'id' => $color->id,
                'name' => $color->name,
            ];
        }), 200);
    }

    /**
     * Display the specified color.
     */
}

