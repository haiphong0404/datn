@extends('admin.layout')

@section('css')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.3/css/dataTables.bootstrap5.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<link href="{{ asset('assets')}}/admin/css/list-brand.css" rel="stylesheet">
@endsection

@section('content')
<!-- Hero -->
<div class="bg-body-light">
    <div class="content content-full">
        <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
            <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Danh sách mã giảm giá</h1>
            <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="{{ route('vouchers.index') }}" style="color: inherit;">Vouchers</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Danh sách mã giảm giá</li>
                </ol>
            </nav>
        </div>
    </div>
</div>
<!-- END Hero -->

@if (session('success'))
<div class="alert alert-success">
    {{ session('success') }}
</div>
@endif

@if (session('info'))
<div class="alert alert-info">
    {{ session('info') }}
</div>
@endif

@if (session('error'))
<div class="alert alert-danger">
    {{ session('error') }}
</div>
@endif

<div class="content">
    @foreach ($vouchers as $type => $items)
    <div class="block block-rounded mb-4">
        <div class="block-header block-header-default">
            <h4 class="block-title">Voucher Type: {{ ucfirst($type) }}</h4>
            <div class="block-options">
                <div class="block-options-item">
                    <a href="{{ route('vouchers.create') }}" class="btn btn-sm btn-alt-primary" data-bs-toggle="tooltip" title="Thêm mã giảm giá"><i class="fa fa-plus"></i></a>
                </div>
            </div>
        </div>
        <div class="block-content">
            <table class="table table-hover" id="vouchersTable">
                <thead>
                    <tr>
                        <th class="text-center" style="width: 50px;">#</th>
                        <th>Mã giảm giá</th>
                        <th class="d-none d-sm-table-cell">Ngày bắt đầu</th>
                        <th class="d-none d-sm-table-cell">Ngày hết hạn</th>

                        @if ($type == 'percentage')
                        <th class="d-none d-sm-table-cell">Phần trăm chiết khấu</th>
                        <th class="d-none d-sm-table-cell">Giá trị chiết khấu tối đa</th>
                        @elseif ($type == 'fixed')
                        <th class="d-none d-sm-table-cell">Giá trị giảm</th>
                        <th class="d-none d-sm-table-cell">Giá trị tối thiểu của đơn hàng</th>
                        @elseif ($type == 'category_discount')
                        <th class="d-none d-sm-table-cell">Danh mục áp dụng</th>
                        <th class="d-none d-sm-table-cell">Phần trăm chiết khấu</th>
                        @elseif ($type == 'first_order')
                        <th class="d-none d-sm-table-cell">Giá trị giảm</th>
                        <th class="d-none d-sm-table-cell">Giá trị tối thiểu của đơn hàng</th>
                        @endif

                        <th class="d-none d-sm-table-cell">Số lượng</th>
                        <th class="d-none d-sm-table-cell">Người tạo</th>
                        <th class="d-none d-sm-table-cell">Ngày tạo</th>
                        <th class="d-none d-sm-table-cell">Ngày cập nhật</th>
                        <th class="text-center" style="width: 100px;">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($items as $item)
                    <tr>
                        <td class="text-center">{{ $loop->iteration }}</td>
                        <td class="fw-semibold">{{ $item->code }}</td>
                        <td class="fw-semibold">{{ $item->start_date }}</td>
                        <td class="fw-semibold">{{ $item->expiration_date }}</td>

                        @if ($type == 'percentage')
                        <td class="fw-semibold">{{ $item->discount_percentage }}</td>
                        <td class="fw-semibold">{{ $item->max_discount_value }}</td>
                        @elseif ($type == 'fixed')
                        <td class="fw-semibold">{{ $item->discount_value }}</td>
                        <td class="fw-semibold">{{ $item->min_order_value }}</td>
                        @elseif ($type == 'category_discount')
                        <td class="fw-semibold">{{ $item->category_id }}</td>
                        <td class="fw-semibold">{{ $item->discount_percentage }}</td>
                        @elseif ($type == 'first_order')
                        <td class="fw-semibold">{{ $item->discount_value }}</td>
                        <td class="fw-semibold">{{ $item->min_order_value }}</td>
                        @endif

                        <td class="fw-semibold">{{ $item->quantity }}</td>
                        <td class="fw-semibold">{{ $item->user_id }}</td>
                        <td class="fw-semibold">{{ $item->created_at }}</td>
                        <td class="fw-semibold">{{ $item->updated_at }}</td>
                        <td class="text-center">
                            <div class="btn-group">
                                <a href="{{ route('vouchers.show', $item) }}" class="btn btn-sm btn-info">
                                    <i class="fas fa-eye"></i> Show
                                </a>
                                {{-- EDIT --}}
                                <a href="{{ route('vouchers.edit', $item) }}" type="button" class="btn btn-sm btn-alt-warning mx-2" data-bs-toggle="tooltip" title="Chỉnh sửa">
                                    <i class="fa fa-pencil-alt"></i>
                                </a>

                                {{-- DELETE --}}
                                <form action="{{ route('vouchers.destroy', $item) }}" method="POST" class="form-delete">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-alt-danger" data-bs-toggle="tooltip" title="Xóa">
                                        <i class="fa fa-times"></i>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    @endforeach
</div>
@endsection

@section('js')
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const deleteBtns = document.querySelectorAll('.form-delete');

        for (const btn of deleteBtns) {
            btn.addEventListener('submit', function(e) {
                e.preventDefault();

                Swal.fire({
                    title: "Xác nhận xóa?",
                    text: "Bạn có chắc chắn muốn xóa mã giảm giá này không?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Đồng ý',
                    cancelButtonText: 'Hủy'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.submit();
                    }
                });
            });
        }
    });
</script>
@endsection