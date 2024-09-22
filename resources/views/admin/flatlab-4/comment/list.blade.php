@extends('admin.layout')
@section('content')
    @if (session('success'))
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif

    <div id="list" class="row">
        <div class="col-sm-12">
            <section class="card">
                <header class="card-header">
                    Danh Sách Bình Luận
                    <span class="tools pull-right">
                        <a href="javascript:;" class="fa fa-chevron-down"></a>
                    </span>
                </header>
                <div class="card-body">
                    <div class="adv-table">
                        <div id="hidden-table-info_wrapper" class="dataTables_wrapper form-inline" role="grid">
                            <div class="row-fluid">
                                <div class="span6">
                                    <div id="hidden-table-info_length" class="dataTables_length">
                                        <label><select class="form-control" size="1" name="hidden-table-info_length"
                                                aria-controls="hidden-table-info">
                                                <option value="10" selected="selected">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select> records per page</label>
                                    </div>
                                </div>
                                <div class="span6">
                                    <div class="dataTables_filter" id="hidden-table-info_filter">
                                        <form action="{{ route('comments.index') }}" method="GET">
                                            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm bình luận"
                                                   value="{{ request()->input('search') }}">
                                            <button type="submit" class="btn btn-primary">Tìm kiếm</button>
                                        </form>                                    </div>
                                </div>
                            </div>

                            <table class="display table table-bordered" id="hidden-table-info"
                                aria-describedby="hidden-table-info_info">
                                <thead>
                                    <tr role="row">
                                        <th>Id</th>
                                        <th>User</th>
                                        <th>Product</th>
                                        <th>Comment</th>
                                        <th>File</th>
                                        <th>Rating</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody role="alert" aria-live="polite" aria-relevant="all">
                                    @foreach ($comments as $item)
                                        <tr>
                                            <td>{{ $item->id }}</td>
                                            <td>{{ $item->user->username }}</td> <!-- Hiển thị tên người dùng -->
                                            <td>{{ $item->product->name }}</td> <!-- Hiển thị tên sản phẩm -->
                                            <td>{{ $item->comment }}</td>
                                            <td>
                                                @if ($item->file)
                                                    <a href="{{ Storage::url($item->file) }}" target="_blank">Tải file</a>
                                                @else
                                                    Không có file
                                                @endif
                                            </td>
                                            <td>{{ $item->star_rating }} / 5</td>
                                            <td>
                                                <a href="{{ route('comments.show', $item->id) }}"
                                                    class="btn btn-primary btn-sm">
                                                    <i class="fa fa-eye"></i>
                                                </a>

                                                @if ($item->deleted_at)
                                                    <form action="{{ route('comments.restore', $item->id) }}"
                                                        method="POST" style="display:inline;">
                                                        @csrf
                                                        <button type="submit" class="btn btn-warning"><i class="bi bi-arrow-repeat"></i></button>
                                                    </form>
                                                @else
                                                    <form action="{{ route('comments.destroy', $item->id) }}"
                                                        method="POST" style="display:inline;">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button type="submit" class="btn btn-danger"><i
                                                            class="fa fa-trash-o"></i></button>
                                                    </form>
                                                @endif

                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                            {{-- <div class="row-fluid">
                                <div class="span6">
                                    <div class="dataTables_info" id="hidden-table-info_info">Showing {{ $comments->firstItem() }} to {{ $comments->lastItem() }} of {{ $comments->total() }} entries</div>
                                </div>
                                <div class="span6">
                                    <div class="dataTables_paginate paging_bootstrap pagination">
                                        {{ $comments->links() }}
                                    </div>  
                                </div>
                            </div> --}}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <!--dynamic table initialization -->
    <script src="{{ asset('assets') }}/admin/js/dynamic_table_init.js"></script>
@endsection
