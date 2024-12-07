@extends('admin.layout')

@section('search')
    <form action="{{ route('admin.brands.index') }}" method="GET">
        <div class="input-group mt-1">
            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm thương hiệu"
                value="{{ request()->input('search') }}">
            <button class="btn btn-outline-secondary" type="submit">
                <i class="bi bi-search"></i>
            </button>
        </div>
    </form>
@endsection

@section('content')
    @if (session('success'))
    @endif

    <style>
        .text-truncate {
            max-width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .custom-select-small {
            font-size: 0.70rem;
            height: 20px;
            padding: 2px 6px;
            width: auto;
        }
    </style>

    <div id="list" class="row">
        <div class="col-sm-12">
            <section class="card">
                <header class="card-header">
                    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Danh sách thương hiệu</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.brands.index') }}" style="color: inherit;">Thương hiệu</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Danh sách thương hiệu</li>
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
                                        <form action="{{ route('admin.brands.index') }}" method="GET">
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
                                        <a href="{{ route('admin.brands.create') }}" class="btn btn-success btn-sm">Tạo
                                            mới</a>
                                    </div>
                                </div>
                            </div>
                            <table class="display table table-bordered" id="hidden-table-info"
                                aria-describedby="hidden-table-info_info">
                                <thead>
                                    <tr class="text-center">
                                        <th>#</th>
                                        <th>Tên thương hiệu</th>
                                        <th>Ảnh</th>
                                        <th>Mô tả</th>
                                        <th>Địa chỉ</th>
                                        <th>Ngày tạo</th>
                                        <th>Ngày cập nhật</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if ($brands->isEmpty())
                                        <tr>
                                            <td colspan="8" class="text-center">Không có thương hiệu nào phù hợp</td>
                                        </tr>
                                    @else
                                        @foreach ($brands as $item)
                                            <tr>
                                                <td>{{ $loop->iteration }}</td>
                                                <td class="fw-semibold text-truncate">{{ $item->name }}</td>
                                                <td>
                                                    @if ($item->image)
                                                        <img src="{{ Storage::url($item->image) }}"
                                                            alt="Hình ảnh thương hiệu" width="150">
                                                    @endif
                                                </td>
                                                <td class="text-truncate">{{ \Str::limit($item->description, 50) }}</td>
                                                <td class="text-truncate">{{ \Str::limit($item->link, 50) }}</td>
                                                <td>{{ $item->created_at }}</td>
                                                <td>{{ $item->updated_at }}</td>
                                                <td class="text-center">
                                                    @if (!$item->deleted_at)
                                                        <a href="{{ route('admin.brands.edit', $item->id) }}"
                                                            class="btn btn-warning mx-1">
                                                            <i class="fa fa-edit"></i>
                                                        </a>
                                                    @endif
                                                    @if ($item->deleted_at)
                                                        <form action="{{ route('admin.brands.restore', $item->id) }}"
                                                            method="POST" style="display:inline;">
                                                            @csrf
                                                            <button type="submit" class="btn btn-info "><i
                                                                    class="bi bi-arrow-repeat"></i></button>
                                                        </form>
                                                    @else
                                                        <form action="{{ route('admin.brands.destroy', $item->id) }}"
                                                            method="POST" class="d-inline-block">
                                                            @csrf
                                                            @method('DELETE')
                                                            <button type="submit" class="btn btn-danger"
                                                                onclick="return confirm('Bạn có chắc muốn xóa thương hiệu này?')">
                                                                <i class="bi bi-trash"></i>
                                                            </button>
                                                        </form>
                                                    @endif
                                                </td>
                                            </tr>
                                        @endforeach
                                    @endif
                                </tbody>
                            </table>
                            <div class="row-fluid">
                                <div class="span6">
                                    <div class="dataTables_info" id="hidden-table-info_info">
                                        Hiển thị từ {{ $brands->firstItem() }} đến {{ $brands->lastItem() }} trong tổng số
                                        {{ $brands->total() }} thương hiệu
                                    </div>
                                </div>
                                <div class="span6">
                                    <div class="dataTables_paginate paging_bootstrap pagination">
                                        <ul class="pagination">
                                            <li class="prev">
                                                <a href="{{ $brands->previousPageUrl() }}" aria-label="Previous">←
                                                    Previous</a>
                                            </li>
                                            @foreach ($brands->getUrlRange(1, $brands->lastPage()) as $page => $url)
                                                <li class="{{ $page == $brands->currentPage() ? 'active' : '' }}">
                                                    <a href="{{ $url }}">{{ $page }}</a>
                                                </li>
                                            @endforeach
                                            <li class="next">
                                                <a href="{{ $brands->nextPageUrl() }}" aria-label="Next">Next →</a>
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
@endsection
@section('js')
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            toastr.success('{{ session('success') }}', 'Thành công', {
                closeButton: true,
                progressBar: true,
                timeOut: 3000,
                positionClass: "toast-top-right"
            });
        });


        document.addEventListener('DOMContentLoaded', function() {
            const deleteBtns = document.querySelectorAll('.form-delete');

            for (const btn of deleteBtns) {
                btn.addEventListener('submit', function(e) {
                    e.preventDefault();

                    Swal.fire({
                        title: "Xác nhận xóa?",
                        text: "Nếu xóa bạn sẽ xóa cả những sản phẩm thuộc thương hiệu này!",
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
