<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $products = Product::with(['category', 'brand'])->get();
        if ($products->isEmpty()) {
            return response()->json([
                'message' => 'Không có thể loại nào được tìm thấy!'
            ], 404);
        }
        return response()->json($products->map(function ($products) {
            return [
                'id' => $products->id,
                'name' => $products->name,
                'description' => $products->description,
                'category' => $products->category ? $products->category->name : null,
                'brand' => $products->brand ? $products->brand->name : null,
                'image' => $products->image,

            ];
        }),200);
    }



    /**
     * Display the specified resource.
     */
    public function show($id)
{
    $product = Product::with(['category', 'brand'])->findOrFail($id);
    if ($product->isEmpty()) {
        return response()->json([
            'message' => 'Không có thể loại nào được tìm thấy!'
        ], 404);
    }
    return response()->json([
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,
            'category' => $product->category ? $product->category->name : null,
            'brand' => $product->brand ? $product->brand->name : null,
            'image' => $product->image,
                
        ],200);
}


    /**
     * Show the form for editing the specified resource.
     */
}
