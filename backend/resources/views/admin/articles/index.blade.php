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
            <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Danh sách bài viết</h1>
            <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin.articles.index') }}" style="color: inherit;">articles</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Danh sách bài viết</li>
                </ol>
            </nav>
        </div>
    </div>
</div>
  <!-- END Hero -->
<div class="content">
    <div class="block block-rounded">
        <div class="block-header block-header-default">
            <div class="block-options">
                <div class="block-options-item">
                    <a href="{{ route('admin.articles.create') }}" class="btn btn-sm btn-alt-primary" data-bs-toggle="tooltip" title="Thêm Bài viết"><i class="fa fa-plus"></i></a>
                </div>
            </div>
        </div>
        <div class="block-content">
            <table class="table table-hover" id="brandsTable">
                <thead>
                    <tr>
                        <th class="text-center" style="width: 50px;">#</th>
                        <th>name</th>
                        <th class="d-none d-sm-table-cell">title</th>
                        <th class="d-none d-sm-table-cell">content</th>
                        <th class="d-none d-sm-table-cell">image</th>
                     
                        <th class="text-center" style="width: 100px;">Thao tác</th>
                    </tr>
                </thead>
                
                <tbody>
                    @foreach ($articles as $item)
                        <tr>
                           <td class="d-none d-sm-table-cell">{{ $item->id }}</td>
                            <td class="d-none d-sm-table-cell">{{ $item->name }}</td>
                              <td class="d-none d-sm-table-cell">{{ $item->title }}</td>
                                <td class="d-none d-sm-table-cell">{{ $item->content }}</td>
                                     <td>
                                @if($item->image)
                                <img src="{{ Storage::url($item->image) }}" width="100" height="100" alt="Ảnh đại diện hiện tại" class="mt-2">
                                @endif
                            </td>
                            <td class="text-center">
                                <div class="btn-group">
                                    {{-- EDIT --}}
                                    <a href="{{route('admin.articles.edit',$item)}}" type="button" class="btn btn-sm btn-alt-warning mx-2" data-bs-toggle="tooltip" title="Chỉnh sửa">
                                        <i class="fa fa-pencil-alt"></i>
                                    </a>

                                    {{-- DELETE  --}}
                                    <form action="{{route('admin.articles.destroy',$item)}}" method="POST" class="form-delete">
                                      @csrf
                                      @method('DELETE')
                                      <button type="submit"  class="btn btn-sm btn-alt-danger" data-bs-toggle="tooltip" title="Xóa" >
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
