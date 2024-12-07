@extends('admin.layout')

@section('title')
    Danh sách sản phẩm
@endsection

@section('search')
    <form action="{{ route('admin.products.index') }}" method="GET">
        <div class="input-group mt-1">
            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm sản phẩm"
                value="{{ request()->input('search') }}">
            <button class="btn btn-outline-secondary" type="submit"><i class="bi bi-search"></i></button>
        </div>
    </form>
@endsection

@section('content')
    <style>
        .text-truncate {
            max-width: 150px;
            /* Đặt độ rộng cố định cho cột */
            white-space: nowrap;
            /* Không cho phép xuống dòng */
            overflow: hidden;
            /* Ẩn phần văn bản vượt quá */
            text-overflow: ellipsis;
            /* Hiển thị dấu "..." khi văn bản bị cắt */
        }

        .custom-select-small {
            font-size: 0.70rem;
            /* Giảm kích thước font */
            height: 20px;
            /* Giảm chiều cao */
            padding: 2px 6px;
            /* Giảm padding trong dropdown */
            width: auto;
            /* Điều chỉnh tự động theo nội dung */
        }
    </style>

    <div id="list" class="row">
        <div class="col-sm-12">
            <section class="card">
                <header class="card-header">
                    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Danh sách sản phẩm</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.products.index') }}" style="color: inherit;">Sản phẩm</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Danh sách sản phẩm</li>
                            </ol>
                        </nav>
                    </div>
                </header>
                <div class="card-body">
                    <div class="adv-table">
                        <div id="hidden-table-info_wrapper" class="dataTables_wrapper form-inline" role="grid">
                            <div class="row-fluid">
                                <div class="span6">
                                    <div id="hidden-table-info_length" class="dataTables_length">
                                        <form action="{{ route('admin.products.index') }}" method="GET">
                                            <label>Xem
                                                <select class="form-control-sm ml-1 custom-select-small" name="per_page"
                                                    onchange="this.form.submit()">
                                                    <option value="10"
                                                        {{ request('per_page') == 10 ? 'selected' : '' }}>10</option>
                                                    <option value="25"
                                                        {{ request('per_page') == 25 ? 'selected' : '' }}>25</option>
                                                    <option value="50"
                                                        {{ request('per_page') == 50 ? 'selected' : '' }}>50</option>
                                                    <option value="100"
                                                        {{ request('per_page') == 100 ? 'selected' : '' }}>100</option>
                                                </select><span style="margin-left:-5px;">mục</span>
                                            </label>
                                        </form>
                                    </div>
                                </div>
                                <div class="span6">
                                    <div class="dataTables_filter" id="hidden-table-info_filter">
                                        @if (auth()->user()->hasRole(['admin']))
                                            <a href="{{ route('admin.products.create') }}" class="btn btn-success ">Tạo
                                                mới</a>
                                        @endif
                                    </div>
                                </div>
                            </div>

                            <table class="display table table-bordered" id="hidden-table-info"
                                aria-describedby="hidden-table-info_info">
                                <thead class="text-center">
                                    <tr class="text-center">
                                        <th>#</th>
                                        <th>Ảnh sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Mô tả</th>
                                        <th>Giá</th>
                                        <th>Thể loại</th>
                                        <th>Thương hiệu</th>
                                        <th>Số lượng tồn kho</th>
                                        <th>Tổng số lượng nhập kho</th>
                                        <th>Trạng thái</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody role="alert" aria-live="polite" aria-relevant="all">
                                    @foreach ($products as $product)
                                        <tr>
                                            <td>{{ $product->id }}</td>
                                            <td style="width: 100px;">
                                                <img src="{{ Storage::url($product->image) }}" width="100"
                                                    height="100" alt="{{ $product->name }}">
                                            </td>
                                            <td class="text-truncate">{{ $product->name }}</td>
                                            <td class="text-truncate">{{ $product->description }}</td>
                                            <td style="width: 120px;"class="text-end">
                                                {{ number_format($product->price, 0, ',', '.') }} VNĐ</td>
                                            <td>{{ $product->category->name ?? 'Không có' }}</td>
                                            <td>{{ $product->brand->name ?? 'Không có' }}</td>
                                            <td class="text-end">{{ $product->total_quantity_in_stock }}</td>
                                            <td class="text-end">{{ $product->incoming_quantity }}</td>
                                            <td>
                                                @if ($product->trashed())
                                                    <span class="badge badge-danger">Đã xóa</span>
                                                @else
                                                    <span class="badge badge-success">Còn</span>
                                                @endif
                                            </td>
                                            <td>
                                                <div class="d-flex mb-3">
                                                    <a href="{{ route('admin.products.show', $product->id) }}"
                                                        class="btn btn-info mr-1">
                                                        <i class="fa fa-eye"></i>
                                                    </a>
                                                    @if (auth()->user()->hasRole(['admin']))
                                                        <a href="{{ route('admin.products.edit', $product->id) }}"
                                                            class="btn btn-warning">
                                                            <i class="fa fa-edit"></i>
                                                        </a>
                                                    @endif
                                                </div>
                                                @if (auth()->user()->hasRole(['admin']))
                                                    <a href="{{ route('admin.products.variants.index', $product->id) }}"
                                                        class="btn btn-secondary">
                                                        <i class="fa fa-list"></i>
                                                    </a>


                                                    @if ($product->trashed())
                                                        <form action="{{ route('admin.products.restore', $product->id) }}"
                                                            method="POST" style="display:inline;">
                                                            @csrf
                                                            <button type="submit" class="btn btn-info">
                                                                <i class="fa fa-undo"></i>
                                                            </button>
                                                        </form>
                                                    @else
                                                        <form action="{{ route('admin.products.destroy', $product->id) }}"
                                                            method="POST" style="display:inline;">
                                                            @csrf
                                                            @method('DELETE')
                                                            <button type="submit" class="btn btn-danger "
                                                                onclick="return confirm('Bạn có chắc chắn muốn xóa không?');">
                                                                <i class="fa fa-trash"></i>
                                                            </button>
                                                        </form>
                                                    @endif
                                                @endif
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                            <div class="row-fluid">
                                <div class="span6">
                                    <div class="dataTables_info" id="hidden-table-info_info">
                                        Hiển thị từ {{ $products->firstItem() }} đến {{ $products->lastItem() }} của tổng
                                        cộng {{ $products->total() }} sản phẩm
                                    </div>
                                </div>
                                <div class="span6">
                                    <div class="dataTables_paginate paging_bootstrap pagination">
                                        <ul class="pagination">
                                            <li class="prev">
                                                <a href="{{ $products->previousPageUrl() }}" aria-label="Previous">←
                                                    Previous</a>
                                            </li>
                                            @foreach ($products->getUrlRange(1, $products->lastPage()) as $page => $url)
                                                <li class="{{ $page == $products->currentPage() ? 'active' : '' }}">
                                                    <a href="{{ $url }}">{{ $page }}</a>
                                                </li>
                                            @endforeach
                                            <li class="next">
                                                <a href="{{ $products->nextPageUrl() }}" aria-label="Next">Next →</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        toastr.success('{{ session('success') }}', 'Thành công', {
            closeButton: true,
            progressBar: true,
            timeOut: 3000,
            positionClass: "toast-top-right"
        });
    });
</script>
@endsection
