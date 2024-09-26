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
                    Danh Sách Người Dùng
                    <span class="tools pull-right">
                        <a href="{{ route('user.create') }}" class=" btn btn-success btn-sm">CRAETE</a>
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
                                        <form action="{{ route('user.index') }}" method="GET">
                                            <input type="text" name="search" class="form-control"
                                                placeholder="Tìm kiếm bình luận" value="{{ request()->input('search') }}">
                                            <button type="submit" class="btn btn-primary">Tìm kiếm</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <table class="display table table-bordered" id="hidden-table-info"
                                aria-describedby="hidden-table-info_info">
                                <thead>
                                    <tr role="row">
                                        <th>Id</th>
                                        <th>Avatar</th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                        <th>Role</th>
                                        <th>Active</th>
                                    </tr>
                                </thead>
                                <tbody role="alert" aria-live="polite" aria-relevant="all">
                                    @if ($noResults)
                                        <tr>
                                            <td colspan="7" class="text-center">Không có người dùng phù hợp</td>
                                        </tr>
                                    @else
                                        @foreach ($users as $item)
                                            <tr>
                                                <td>{{ $item->id }}</td>
                                                <td> <img src="{{ Storage::url($item->avatar_img) }}" width="100"
                                                        height="100" alt="{{ $item->username }}"></td>
                                                <td>{{ $item->username }}</td>
                                                <td>{{ $item->phone }}</td>
                                                <td>{{ $item->email }}</td>
                                                <td>{{ $item->address }}</td>
                                                <td>{{ $item->role }}</td>
                                                <td>
                                                    <a href="{{ route('user.show', $item->id) }}"
                                                        class="btn btn-primary btn-sm"><i class="fa fa-eye"></i></a>
                                                    <form action="{{ route('user.destroy', $item->id) }}" method="post">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button onclick="return confirm('Ban co muon xoa khong')"
                                                            class="btn btn-danger btn-sm" type="submit"> <i
                                                                class="fa fa-trash-o"></i></button>
                                                    </form>

                                                </td>

                                            </tr>
                                        @endforeach
                                    @endif
                                </tbody>
                            </table>
                            <div class="row-fluid">
                                <div class="span6">
                                    <div class="dataTables_info" id="hidden-table-info_info">Showing 11 to 20 of 57
                                        entries</div>
                                </div>
                                <div class="span6">
                                    <div class="dataTables_paginate paging_bootstrap pagination">
                                        <ul>
                                            <li class="prev"><a href="#">← Previous</a></li>
                                            <li><a href="#">1</a></li>
                                            <li class="active"><a href="#">2</a></li>
                                            <li><a href="#">3</a></li>
                                            <li><a href="#">4</a></li>
                                            <li><a href="#">5</a></li>
                                            <li class="next"><a href="#">Next → </a></li>
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
    <!--dynamic table initialization -->
    <script src="{{ asset('assets') }}/admin/js/dynamic_table_init.js"></script>
@endsection
