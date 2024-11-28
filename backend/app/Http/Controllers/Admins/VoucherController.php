<?php

namespace App\Http\Controllers\Admins;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Voucher;
use App\Models\Category;
use App\Services\VoucherService;
use App\Http\Requests\StoreVoucherRequest;
use App\Http\Requests\UpdateVoucherRequest;
use Illuminate\Support\Facades\Auth;

class VoucherController extends Controller
{
    protected $voucher;
    protected $voucherService;
    protected $category;

    public function __construct(Voucher $voucher, VoucherService $voucherService, Category $category)
    {
        $this->voucher = $voucher;
        $this->voucherService = $voucherService;
        $this->category = $category;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Lấy danh sách voucher và nhóm theo loại
        $vouchers = $this->voucher->all()->groupBy('type'); // Sử dụng $this->voucher
        return view('admin.vouchers.index', compact('vouchers'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = $this->category->all();
        return view('admin.vouchers.create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVoucherRequest $request) // Sử dụng StoreVoucherRequest
    {
        $categories = $this->category->all();
        try {
            $this->voucherService->createVoucher($request->validated());
            return redirect()->route('admin.vouchers.index')->with('success', 'Tạo mã giảm giá thành công.');
        } catch (\InvalidArgumentException $e) {
            return redirect()->back()
                ->withInput($request->all()) // Giữ lại dữ liệu cũ khi có lỗi
                ->with('error', $e->getMessage())
                ->with('categories', $categories);
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput($request->all())
                ->with('error', 'Có lỗi xảy ra. Vui lòng thử lại.')
                ->with('categories', $categories);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Voucher $voucher)
    {
        return view('admin.vouchers.show', compact('voucher'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Voucher $voucher)
    {
        $categories = $this->category->all();
        return view('admin.vouchers.edit', compact('voucher','categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVoucherRequest $request, Voucher $voucher)
    {
        // Chỉ cập nhật các trường có trong request
        $data = $request->validated();
        
        // Ghi lại ID người dùng chỉnh sửa vào trường user_id
        $data['user_id'] = Auth::id(); // Lấy ID của người dùng đã đăng nhập

        // Cập nhật voucher
        $voucher->update($data);
        
        // Chuyển hướng về giao diện edit với thông báo thành công
        return redirect()->route('admin.vouchers.edit', $voucher)->with('success', 'Cập nhật thông tin mã giảm giá thành công!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Voucher $voucher)
    {
        $voucher->delete();

        return redirect()->route('admin.vouchers.index')->with('success', 'Xóa mã giảm giá thành công');
    }
}
