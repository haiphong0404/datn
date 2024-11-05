<!-- resources/views/contacts/edit.blade.php -->
@extends('admin.layout')

@section('title')
    Chỉnh sửa Liên hệ
@endsection

@section('content')
    <h1>Chỉnh sửa Liên hệ</h1>

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('admin.contacts.update', $contact) }}" method="POST" class="form-horizontal">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label for="name" class="form-label">Tên:</label>
            <input type="text" id="name" name="name" class="form-control" value="{{ old('name', $contact->name) }}" required>
        </div>

        <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" id="email" name="email" class="form-control" value="{{ old('email', $contact->email) }}" required>
        </div>

        <div class="mb-3">
            <label for="phone" class="form-label">Số điện thoại:</label>
            <input type="text" id="phone" name="phone" class="form-control" value="{{ old('phone', $contact->phone) }}" required>
        </div>

        <button type="submit" class="btn btn-primary">
            <i class="fa fa-save"></i> Cập nhật
        </button>
    </form>
@endsection
