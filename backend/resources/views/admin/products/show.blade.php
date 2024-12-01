@extends('admin.layout')

@section('title', "Biến thể của sản phẩm: $product->name")
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
    <div class="row">
        <div class="col-sm-12">
            <div class="card shadow-sm">
                <header class="card-header">
                    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Biến thể của sản phẩm
                        </h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.products.index') }}" style="color: inherit;">Sản phẩm</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Biến thể</li>
                            </ol>
                        </nav>
                    </div>
                </header>

                <!-- Ảnh sản phẩm và nút thêm biến thể -->
                <div class="card-body">
                    <div class="row mb-4">
                        <div class=" text-center d-flex">
                            <img src="{{ asset('storage/' . $product->image) }}" alt="{{ $product->name }}"
                                class="img-thumbnail" style="max-width: 200px;">
                            <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Biến thể của sản phẩm:
                                {{ $product->name }}</h1>
                        </div>

                    </div>
                    <div class="d-flex justify-content-end align-items-center mb-2">
                        <a href="{{ route('admin.products.variants.create', $product->id) }}" class="btn btn-success">
                            Tạo mới
                        </a>
                    </div>

                    <!-- Danh sách biến thể -->
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered">
                            <thead class="thead-light">
                                <tr class="text-center">
                                    <th class="text-center">ID</th>
                                    <th>Kích thước</th>
                                    <th>Màu sắc</th>
                                    <th>Giá</th>
                                    <th>Ảnh</th>
                                    <th>Số lượng</th>
                                    <th class="text-center">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($product->variants as $variant)
                                    <tr>
                                        <td class="text-center">{{ $variant->id }}</td>
                                        <td class="text-end">{{ $variant->size->name ?? 'Không có' }}</td>
                                        <td>{{ $variant->color->name ?? 'Không có' }}</td>
                                        <td class="text-end">{{ number_format($variant->price, 0, ',', '.') }} VNĐ</td>
                                        <td class="text-center">
                                            @if ($variant->images->isNotEmpty())
                                                <img src="{{ asset('storage/' . $variant->images->random()->image) }}"
                                                    alt="{{ $product->name }} - Biến thể {{ $variant->id }}"
                                                    class="img-thumbnail" style="width: 100px; height: auto;">
                                            @else
                                                <p>Không có ảnh</p>
                                            @endif
                                        </td>
                                        <td class="text-end">{{ $variant->quantity }}</td>
                                        <td>
                                            <div class="d-flex justify-content-center">
                                                <a href="{{ route('admin.products.variants.edit', [$product->id, $variant->id]) }}"
                                                    class="btn btn-warning mr-2" title="Chỉnh sửa">
                                                    <i class="fa fa-edit"></i>
                                                </a>
                                                <form
                                                    action="{{ route('admin.products.variants.destroy', [$product->id, $variant->id]) }}"
                                                    method="POST" style="display: inline-block;">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="btn btn-danger " title="Xóa"
                                                        onclick="return confirm('Bạn có chắc chắn muốn xóa không?');">
                                                        <i class="fa fa-trash"></i>
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="7" class="text-center">Chưa có biến thể nào.</td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>

                    <!-- Nút quay lại -->
                    <div class="d-flex mt-4">
                        <a href="{{ route('admin.products.index') }}" class="btn btn-secondary flex-fill">Quay lại</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
