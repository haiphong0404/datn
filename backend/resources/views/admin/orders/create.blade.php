@extends('admin.layout')

@section('css')
<!-- CSS của Select2 -->
<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
@endsection

@section('content')

<div class="container">
    <!-- Hero -->
    <div class="bg-body-light py-3">
        <div class="content content-full">
            <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">Thêm mới đơn hàng</h1>
                <nav class="flex-shrink-0 my-2 my-sm-0 ms-sm-3" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="{{ route('admin.orders.index') }}" class="text-decoration-none text-dark">Orders</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Thêm mới đơn hàng</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
    <!-- END Hero -->

    @if (session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    @if (session('error'))
    <div class="alert alert-danger">{{ session('error') }}</div>
    @endif

    <form action="{{ route('admin.orders.store') }}" method="POST" id="order-form">
        @csrf
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="name">Tên khách hàng</label>
                    <input type="text" id="name" name="name" class="form-control" autocomplete="name" required value="{{ old('name') }}">
                    @error('name')
                    <div class="alert alert-danger">{{ $message }}</div>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="phone">Số điện thoại</label>
                    <input type="tel" id="phone" name="phone" class="form-control" autocomplete="tel" required value="{{ old('phone') }}">
                    @error('phone')
                    <div class="alert alert-danger">{{ $message }}</div>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="address">Địa chỉ</label>
                    <input type="text" id="address" name="address" class="form-control" autocomplete="street-address" required value="{{ old('address') }}">
                    @error('address')
                    <div class="alert alert-danger">{{ $message }}</div>
                    @enderror
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
                    <th></th>
                </tr>
            </thead>
            <tbody id="order-details">
                @if(old('products'))
                @foreach(old('products') as $index => $product)
                <tr class="product-row">
                    <td>
                        <select class="form-control product-select" id="product_{{ $index+1 }}" name="products[{{ $index+1 }}][product_id]" required>
                            <option value="">Chọn sản phẩm</option>
                            <!-- Lặp lại qua danh sách sản phẩm -->
                            @foreach($products as $prod)
                            <option value="{{ $prod->id }}" {{ $prod->id == $product['product_id'] ? 'selected' : '' }}>{{ $prod->name }}</option>
                            @endforeach
                        </select>
                    </td>
                    <td>
                        <select class="form-control variant-select" id="variant_{{ $index+1 }}" name="products[{{ $index+1 }}][variant_id]" required>
                            <option value="">Chọn biến thể</option>
                            @if(isset($product['variant_id']))
                            <!-- Thêm các biến thể cho sản phẩm đã chọn -->
                            @foreach($variants[$product['product_id']] ?? [] as $variant)
                            <option value="{{ $variant->id }}" {{ $variant->id == $product['variant_id'] ? 'selected' : '' }} data-price="{{ $variant->price }}">{{ $variant->name }}</option>
                            @endforeach
                            @endif
                        </select>
                    </td>
                    <td>
                        <input type="number" id="quantity_{{ $index+1 }}" name="products[{{ $index+1 }}][quantity]" class="form-control quantity" min="1" value="{{ $product['quantity'] ?? 1 }}" required>
                    </td>
                    <td>
                        <input type="number" id="price_{{ $index+1 }}" name="products[{{ $index+1 }}][price]" class="form-control price" readonly required>
                    </td>
                    <td>
                        <input type="number" id="total_{{ $index+1 }}" name="products[{{ $index+1 }}][total]" class="form-control total" readonly>
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger remove-row">Xóa</button>
                    </td>
                </tr>
                @endforeach
                @else
                <tr class="product-row">
                    <td>
                        <select class="form-control product-select" id="product_1" name="products[1][product_id]" required>
                            <option value="">Chọn sản phẩm</option>
                        </select>
                    </td>
                    <td>
                        <select class="form-control variant-select" id="variant_1" name="products[1][variant_id]" required>
                            <option value="">Chọn biến thể</option>
                        </select>
                    </td>
                    <td>
                        <input type="number" id="quantity_1" name="products[1][quantity]" class="form-control quantity" min="1" value="1" required>
                    </td>
                    <td>
                        <input type="number" id="price_1" name="products[1][price]" class="form-control price" readonly required>
                    </td>
                    <td>
                        <input type="number" id="total_1" name="products[1][total]" class="form-control total" readonly>
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger remove-row">Xóa</button>
                    </td>
                </tr>
                @endif
            </tbody>
        </table>

        <button type="button" class="btn btn-primary mt-4" id="add-row">Thêm sản phẩm</button>
        <div class="row mt-4">
            <div class="col-md-6">
                <!-- Nút quay lại -->
                <a href="{{ route('admin.orders.index') }}" class="btn btn-secondary">
                    Quay lại
                </a>
            </div>
            <div class="col-md-6 text-end">
                <!-- Nút tạo đơn hàng -->
                <button type="submit" class="btn btn-success">
                    Tạo đơn hàng
                </button>
            </div>
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
        let productCount = {{  old('products') ? count(old('products')) : 1  }}; // Biến đếm số sản phẩm

        // Hàm khởi tạo cho select sản phẩm
        function initializeSelects($row) {
            // Khởi tạo select sản phẩm
            $row.find('.product-select').select2({
                placeholder: "Chọn sản phẩm",
                ajax: {
                    url: '{{ route("admin.products.search") }}',
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
                        $variantSelect.empty().append('<option value="">Chọn biến thể</option>');
                        $.each(data, function(index, variant) {
                            $variantSelect.append('<option value="' + variant.id + '" data-price="' + variant.price + '" data-quantity="' + variant.quantity + '">' + variant.name + '</option>');
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