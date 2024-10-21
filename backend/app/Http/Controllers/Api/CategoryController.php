<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = Category::withTrashed()->get();
        if ($categories->isEmpty()) {
            return response()->json([
                'message' => 'Không có thể loại nào được tìm thấy!'
            ], 404);
        }
        return response()->json($categories->map(function ($categories) {
            return [
                'id' => $categories->id,
                'name' => $categories->name,
                'description' => $categories->description,
            ];
        }),200);
    }
    /**
     * Store a newly created resource in storage.
     */
    
}
