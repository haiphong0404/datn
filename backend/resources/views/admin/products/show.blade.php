@extends('admin.layout')

@section('title')
    Biến thể của sản phẩm: {{ $product->name }}
@endsection

@section('content')
    <h1>Biến thể của sản phẩm: {{ $product->name }}</h1>

    <table class="table">
        <thead>
        <tr>
            <th>Kích thước</th>
            <th>Màu sắc</th>
            <th>Giá</th>
            <th>Số lượng</th>
        </tr>
        </thead>
        <tbody>
        @foreach($product->variants as $variant)
            <tr>
                <td>{{ $variant->size->name ?? 'Không có' }}</td>
                <td>{{ $variant->color->name ?? 'Không có' }}</td>
                <td>{{ $variant->price }}</td>
                <td>{{ $variant->quantity }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection
