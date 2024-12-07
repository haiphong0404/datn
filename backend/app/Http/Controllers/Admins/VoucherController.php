<?php

namespace App\Http\Controllers\Admins;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Voucher;
use App\Models\Category;
use App\Services\VoucherService;
use App\Http\Requests\StoreVoucherRequest;
use App\Http\Requests\UpdateVoucherRequest;
use Illuminate\Pagination\LengthAwarePaginator;
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
   public function index(Request $request)
{
    $search = $request->input('search');
    $perPage = $request->input('per_page', 10); // Mặc định là 2 bản ghi mỗi trang

    // Truy vấn và lọc các voucher
    $vouchers = $this->voucher->when($search, function ($query, $search) {
        return $query->where('code', 'LIKE', "%{$search}%")
                     ->orWhere('type', 'LIKE', "%{$search}%")
                     ->orWhere('user_id', 'LIKE', "%{$search}%");
    })
    ->orderBy('id', 'desc') // Sắp xếp theo ID giảm dần
    ->get(); // Lấy tất cả dữ liệu không phân trang ở đây để nhóm theo type

    // Nhóm các voucher theo 'type'
    $groupedVouchers = $vouchers->groupBy('type');

    // Phân trang cho từng nhóm
    foreach ($groupedVouchers as $type => $items) {
        // Lấy trang hiện tại cho nhóm cụ thể từ query string
        $currentPage = $request->input("page_{$type}", 1); // Mỗi nhóm có trang riêng, mặc định là 1 nếu không có tham số

        // Tạo phân trang cho nhóm 'type'
        $itemsForCurrentPage = $items->slice(($currentPage - 1) * $perPage, $perPage); // Lấy các bản ghi của trang hiện tại

        $groupedVouchers[$type] = new \Illuminate\Pagination\LengthAwarePaginator(
            $itemsForCurrentPage, // Các bản ghi cho trang hiện tại
            $items->count(), // Tổng số bản ghi trong nhóm
            $perPage, // Số bản ghi trên mỗi trang
            $currentPage, // Trang hiện tại
            ['path' => url()->current(), 'query' => array_merge($request->query(), ["page_{$type}" => $currentPage])] // Thêm tham số trang riêng biệt cho từng nhóm
        );
    }

    // Kiểm tra xem có kết quả hay không
    $noResults = $vouchers->isEmpty();

    return view('admin.vouchers.index', compact('groupedVouchers', 'noResults'));
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
