@extends('admin.layout')

@section('css')
    <!-- CSS của Select2 -->
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
@endsection
@section('search')
    <form action="{{ route('admin.orders.index') }}" method="GET">
        <div class="input-group mt-1">
            <input type="text" name="search" class="form-control" placeholder="Tìm kiếm đơn hàng"
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
                        <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Thêm Đơn Hàng</h1>
                        <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="{{ route('admin.orders.index') }}" style="color: inherit;">Đơn Hàng</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Thêm Đơn Hàng</li>
                            </ol>
                        </nav>
                    </div>
                </header>

                <div class="card-body">
                    @if (session('success'))
                        <div class="alert alert-success">
                            {{ session('success') }}
                        </div>
                    @endif

                    @if (session('error'))
                        <div class="alert alert-danger">
                            {{ session('error') }}
                        </div>
                    @endif


                    <form action="{{ route('admin.orders.store') }}" method="POST" id="order-form">
                        @csrf
                        <div class="row">
                            <!-- Dòng 1 -->
                            <div class="col-md-6">
                                <div class="form-group mb-3">
                                    <label for="name" class="form-label">Tên Khách Hàng</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="bi bi-person"></i></span>
                                        <input type="text" class="form-control" id="name" name="name" required
                                            value="{{ old('name') }}">
                                    </div>
                                    @error('name')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group mb-3">
                                    <label for="phone" class="form-label">Số Điện Thoại</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="bi bi-telephone"></i></span>
                                        <input type="tel" class="form-control" id="phone" name="phone" required
                                            value="{{ old('phone') }}">
                                    </div>
                                    @error('phone')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <!-- Dòng 2 -->
                            <div class="col-md-6">
                                <div class="form-group mb-3">
                                    <label for="address" class="form-label">Địa Chỉ</label>
                                    <textarea style="height: 40px" class="form-control" id="address" name="address" required>{{ old('address') }}</textarea>
                                    @error('address')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group mb-3">
                                    <label for="voucher_code" class="form-label">Mã Giảm Giá</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="bi bi-tags"></i></span>
                                        <input type="text" class="form-control" id="voucher_code" name="voucher_code"
                                            value="{{ old('voucher_code') }}">
                                    </div>
                                    @error('voucher_code')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <!-- Dòng 3 -->
                            <div class="col-md-6">
                                <div class="form-group mb-3">
                                    <label for="payment_method" class="form-label">Phương Thức Thanh Toán</label>
                                    <select name="payment_method" class="form-select" id="payment_method">
                                        <option value="cash" {{ old('payment_method') == 'cash' ? 'selected' : '' }}>
                                            Thanh Toán Offline</option>
                                        <option value="online" {{ old('payment_method') == 'online' ? 'selected' : '' }}>
                                            Thanh Toán Online</option>
                                        <option value="stripe" {{ old('payment_method') == 'stripe' ? 'selected' : '' }}>
                                            Thanh Toán Stripe</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group mb-3">
                                    <label for="payment_status" class="form-label">Trạng Thái Thanh Toán</label>
                                    <select name="payment_status" class="form-select" id="payment_status">
                                        <option value="unpaid" {{ old('payment_status') == 'unpaid' ? 'selected' : '' }}>
                                            Chưa Thanh Toán</option>
                                        <option value="paid" {{ old('payment_status') == 'paid' ? 'selected' : '' }}>Đã
                                            Thanh Toán</option>
                                    </select>
                                </div>
                            </div>


                        </div>

                        <h3>Chi tiết đơn hàng</h3>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Biến thể</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                    <th>Tổng cộng</th>
                                    <th> <button type="button" class="btn btn-success" id="add-row">New</button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="order-details">
                                @if (old('products'))
                                    @foreach (old('products', []) as $index => $product)
                                        <tr class="product-row">
                                            <td>
                                                <select class="form-control product-select"
                                                    id="product_{{ $index + 1 }}"
                                                    name="products[{{ $index + 1 }}][product_id]" required>
                                                    <option value="">Chọn sản phẩm</option>
                                                    <!-- Lặp lại qua danh sách sản phẩm -->
                                                    @foreach ($products as $prod)
                                                        <option value="{{ $prod->id }}"
                                                            {{ $prod->id == $product['product_id'] ? 'selected' : '' }}>
                                                            {{ $prod->name }}</option>
                                                    @endforeach
                                                </select>
                                            </td>
                                            <td>
                                                <select class="form-control variant-select"
                                                    id="variant_{{ $index + 1 }}"
                                                    name="products[{{ $index + 1 }}][variant_id]" required>
                                                    <option value="">Chọn biến thể</option>
                                                    @if (isset($product['variant_id']))
                                                        <!-- Thêm các biến thể cho sản phẩm đã chọn -->
                                                        @foreach ($variants[$product['product_id']] ?? [] as $variant)
                                                            <option value="{{ $variant->id }}"
                                                                {{ $variant->id == $product['variant_id'] ? 'selected' : '' }}
                                                                data-price="{{ $variant->price }}">{{ $variant->name }}
                                                            </option>
                                                        @endforeach
                                                    @endif
                                                </select>
                                            </td>
                                            <td>
                                                <input type="number" id="quantity_{{ $index + 1 }}"
                                                    name="products[{{ $index + 1 }}][quantity]"
                                                    class="form-control quantity" min="1"
                                                    value="{{ $product['quantity'] ?? 1 }}" required>
                                            </td>
                                            <td>
                                                <input type="number" id="price_{{ $index + 1 }}"
                                                    name="products[{{ $index + 1 }}][price]"
                                                    class="form-control price" readonly required>
                                            </td>
                                            <td>
                                                <input type="number" id="total_{{ $index + 1 }}"
                                                    name="products[{{ $index + 1 }}][total]"
                                                    class="form-control total" readonly>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-danger remove-row">Xóa</button>
                                            </td>
                                        </tr>
                                    @endforeach
                                @else
                                    <tr class="product-row">
                                        <td>
                                            <select class="form-control product-select" id="product_1"
                                                name="products[1][product_id]" required>
                                                <option value="">Chọn sản phẩm</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select class="form-control variant-select" id="variant_1"
                                                name="products[1][variant_id]" required>
                                                <option value="">Chọn biến thể</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="number" id="quantity_1" name="products[1][quantity]"
                                                class="form-control quantity" min="1" value="1" required>
                                        </td>
                                        <td>
                                            <input type="number" id="price_1" name="products[1][price]"
                                                class="form-control price" readonly required>
                                        </td>
                                        <td>
                                            <input type="number" id="total_1" name="products[1][total]"
                                                class="form-control total" readonly>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-danger remove-row"><i
                                                class="fa fa-trash-o"></i></button>
                                        </td>
                                    </tr>
                                @endif
                            </tbody>
                        </table>

                        <div class="mb-3 d-flex">
                            <a href="{{ route('admin.orders.index') }}"
                                class="btn btn-secondary btn-lg flex-fill me-1">Quay
                                lại</a>
                            <button type="reset" class="btn btn-warning btn-lg flex-fill me-1">Reset</button>
                            <button type="submit" class="btn btn-primary btn-lg flex-fill">Thêm Mới</button>
                        </div>
                    </form>
                </div>
            @endsection

            @section('js')
                <!-- jQuery -->
                <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>

                <!-- JS của Select2 -->
                <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

                <script>
                    $(document).ready(function() {
                        let productCount = {{ old('products') ? count(old('products')) : 1 }}; // Biến đếm số sản phẩm

                        // Hàm khởi tạo cho select sản phẩm
                        function initializeSelects($row) {
                            // Khởi tạo select sản phẩm
                            $row.find('.product-select').select2({
                                placeholder: "Chọn sản phẩm",
                                ajax: {
                                    url: '{{ route('admin.products.search') }}',
                                    dataType: 'json',
                                    delay: 250,
                                    processResults: function(data) {
                                        return {
                                            results: $.map(data, function(item) {
                                                return {
                                                    id: item.id,
                                                    text: item.name
                                                };
                                            })
                                        };
                                    }
                                }
                            }).on('change', function() {
                                let productId = $(this).val();
                                let $variantSelect = $(this).closest('.product-row').find('.variant-select');
                                $variantSelect.prop('disabled', false).html('<option value="">Đang tải...</option>');

                                // Load biến thể tương ứng
                                $.ajax({
                                    url: '/admin/get-variants/' + productId,
                                    dataType: 'json',
                                    success: function(data) {
                                        $variantSelect.empty().append(
                                            '<option value="">Chọn biến thể</option>');
                                        $.each(data, function(index, variant) {
                                            $variantSelect.append('<option value="' + variant.id +
                                                '" data-price="' + variant.price +
                                                '" data-quantity="' + variant.quantity + '">' +
                                                variant.name + '</option>');
                                        });
                                    },
                                    error: function() {
                                        alert('Không thể tải biến thể. Vui lòng thử lại.');
                                    }
                                });
                            });

                            // Xử lý biến thể được chọn
                            $row.find('.variant-select').on('change', function() {
                                let price = $(this).find('option:selected').data('price');
                                let maxStock = $(this).find('option:selected').data('quantity');
                                let $priceInput = $(this).closest('.product-row').find('.price');
                                let $quantityInput = $(this).closest('.product-row').find('.quantity');
                                $priceInput.val(price);
                                $quantityInput.attr('max', maxStock);
                                calculateTotal($row);
                            });

                            // Tính toán tổng khi số lượng thay đổi
                            $row.find('.quantity').on('input', function() {
                                calculateTotal($row);
                            });
                        }

                        // Hàm tính toán tổng tiền
                        function calculateTotal($row) {
                            let quantity = parseInt($row.find('.quantity').val()) || 0;
                            let price = parseFloat($row.find('.price').val()) || 0;
                            let total = quantity * price;
                            $row.find('.total').val(total.toFixed(2));
                        }

                        // Thêm sản phẩm mới
                        $('#add-row').click(function() {
                            productCount++;
                            let newRow = `
                <tr class="product-row">
                    <td>
                        <select class="form-control product-select" id="product_${productCount}" name="products[${productCount}][product_id]" required>
                            <option value="">Chọn sản phẩm</option>
                        </select>
                    </td>
                    <td>
                        <select class="form-control variant-select" id="variant_${productCount}" name="products[${productCount}][variant_id]" required>
                            <option value="">Chọn biến thể</option>
                        </select>
                    </td>
                    <td>
                        <input type="number" id="quantity_${productCount}" name="products[${productCount}][quantity]" class="form-control quantity" min="1" value="1" required>
                    </td>
                    <td>
                        <input type="number" id="price_${productCount}" name="products[${productCount}][price]" class="form-control price" readonly required>
                    </td>
                    <td>
                        <input type="number" id="total_${productCount}" name="products[${productCount}][total]" class="form-control total" readonly>
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger remove-row">Xóa</button>
                    </td>
                </tr>
            `;
                            $('#order-details').append(newRow);
                            initializeSelects($('#order-details tr:last'));
                        });

                        // Xóa hàng
                        $('#order-details').on('click', '.remove-row', function() {
                            $(this).closest('.product-row').remove();
                        });

                        // Khởi tạo cho các select đã có
                        $('#order-details .product-row').each(function() {
                            initializeSelects($(this));
                        });

                        $('#order-form').on('submit', function(e) {
                            let isValid = true;
                            $('#order-details .product-row').each(function() {
                                let quantity = parseInt($(this).find('.quantity').val());
                                let maxStock = parseInt($(this).find('.quantity').attr('max'));
                                if (quantity > maxStock) {
                                    alert('Số lượng không được vượt quá tồn kho!');
                                    isValid = false;
                                }
                            });
                            if (!isValid) {
                                e.preventDefault(); // Ngăn chặn gửi form nếu không hợp lệ
                            }
                        });

                    });
                </script>
            @endsection
