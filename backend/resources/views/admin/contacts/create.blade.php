<!-- resources/views/contacts/create.blade.php -->
@extends('admin.layout')

@section('title')
    Tạo Liên hệ mới
@endsection

@section('content')
    <h1>Tạo Liên hệ mới</h1>

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('admin.contacts.store') }}" method="POST" class="form-horizontal">
        @csrf
        <div class="mb-3">
            <label for="name" class="form-label">Tên:</label>
            <input type="text" id="name" name="name" class="form-control" value="{{ old('name') }}" >
        </div>

        <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" id="email" name="email" class="form-control" value="{{ old('email') }}" >
        </div>

        <div class="mb-3">
            <label for="phone" class="form-label">Số điện thoại:</label>
            <input type="text" id="phone" name="phone" class="form-control" value="{{ old('phone') }}" >
        </div>

        <button type="submit" class="btn btn-primary">
            <i class="fa fa-save"></i> Tạo
        </button>
    </form>
@endsection
