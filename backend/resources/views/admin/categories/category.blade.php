@extends('admin.layout')

@section('search')
    <form action="{{ route('admin.categories.index') }}" method="GET">
        <div class="input-group mt-1">
            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm thể loại"
                value="{{ request()->input('search') }}">
            <button class="btn btn-outline-secondary" type="submit"><i class="bi bi-search"></i></button>
        </div>
    </form>
@endsection

@section('content')
    @if (session('success'))
    @endif
    @if (session('error'))
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            {{ session('error') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
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
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Danh Sách Thể Loại</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.categories.index') }}" style="color: inherit;">Thể Loại</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Danh Sách Thể Loại</li>
                            </ol>
                        </nav>
                    </div>
                </header>
                <div class="card-body">
                    <div class="adv-table">
                        <div class="dataTables_wrapper">
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <form action="{{ route('admin.categories.index') }}" method="GET">
                                        <label>Xem
                                            <select class="form-control-sm custom-select-small" name="per_page"
                                                onchange="this.form.submit()">
                                                <option value="10" {{ request('per_page') == 10 ? 'selected' : '' }}>10
                                                </option>
                                                <option value="25" {{ request('per_page') == 25 ? 'selected' : '' }}>25
                                                </option>
                                                <option value="50" {{ request('per_page') == 50 ? 'selected' : '' }}>50
                                                </option>
                                                <option value="100" {{ request('per_page') == 100 ? 'selected' : '' }}>
                                                    100</option>
                                            </select> mục
                                        </label>
                                    </form>
                                </div>
                                <div class="col-sm-6 text-end">
                                    <a href="{{ route('admin.categories.create') }}" class="btn btn-success btn-sm">Tạo
                                        mới</a>
                                </div>
                            </div>

                            <table class="display table table-bordered">
                                <thead>
                                    <tr class="text-center">
                                        <th>#</th>
                                        <th>Tên thể loại</th>
                                        <th>Mô tả</th>
                                        <th>Ngày tạo</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse ($categories as $category)
                                        <tr>
                                            <td>{{ $category->id }}</td>
                                            <td class="text-truncate">{{ $category->name }}</td>
                                            <td class="text-truncate">{{ $category->description }}</td>
                                            <td>{{ $category->created_at }}</td>
                                            <td>
                                                @if ($category->trashed())
                                                    <span class="badge bg-danger">Đã xóa</span>
                                                @else
                                                    <span class="badge bg-success">Còn</span>
                                                @endif
                                            </td>
                                            <td class="text-center">
                                                <a href="{{ route('admin.categories.edit', $category->id) }}"
                                                    class="btn btn-warning ">
                                                    <i class="fa fa-edit"></i>
                                                </a>
                                                @if ($category->trashed())
                                                    <form action="{{ route('admin.categories.restore', $category->id) }}"
                                                        method="POST" class="d-inline-block">
                                                        @csrf
                                                        <button type="submit" class="btn btn-info "><i
                                                                class="bi bi-arrow-repeat"></i></button>
                                                    </form>
                                                @else
                                                    <form action="{{ route('admin.categories.destroy', $category->id) }}"
                                                        method="POST" class="d-inline-block">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button type="submit" class="btn btn-danger "
                                                            onclick="return confirm('Bạn có chắc muốn xóa thể loại này?');">
                                                            <i class="fa fa-trash"></i>
                                                        </button>
                                                    </form>
                                                @endif
                                            </td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="6" class="text-center">Không có thể loại phù hợp</td>
                                        </tr>
                                    @endforelse
                                </tbody>
                            </table>
                            <div class="row-fluid">
                                <div class="span6">
                                    <div class="dataTables_info">
                                        Hiển thị từ {{ $categories->firstItem() }} đến {{ $categories->lastItem() }} của
                                        tổng cộng {{ $categories->total() }} mục
                                    </div>
                                </div>
                                <div class="span6">
                                    <div class="dataTables_paginate paging_bootstrap pagination">
                                        <ul class="pagination">
                                            <li class="prev">
                                                <a href="{{ $categories->previousPageUrl() }}" aria-label="Previous">←
                                                    Previous</a>
                                            </li>
                                            @foreach ($categories->getUrlRange(1, $categories->lastPage()) as $page => $url)
                                                <li class="{{ $page == $categories->currentPage() ? 'active' : '' }}">
                                                    <a href="{{ $url }}">{{ $page }}</a>
                                                </li>
                                            @endforeach
                                            <li class="next">
                                                <a href="{{ $categories->nextPageUrl() }}" aria-label="Next">Next →</a>
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
