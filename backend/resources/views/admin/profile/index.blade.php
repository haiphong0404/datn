@extends('admin.layout')
@section('content')
@if (session('success'))
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif
        <div class="row">
            <aside class="profile-nav col-lg-3">
                <section class="card">
                    <div class="user-heading round">
                        <a href="#">
                            <img src="{{ Storage::url($user->avatar_img) }}"
                                                         alt="{{ $user->username }}">
                        </a>
                        <h1>{{$user->username}}</h1>
                        <p>{{$user->email}}</p>
                    </div>

                    <ul class="nav nav-pills nav-stacked">
                        <li class="nav-item"><a class="nav-link" href="{{ route('admin.profile.edit') }}"> <i class="fa fa-edit"></i> Edit profile</a></li>
                    </ul>

                </section>
            </aside>
            <aside class="profile-info col-lg-9">
                
                <section class="card">
                    <div class="bio-graph-heading">
                        Chào mừng chủ nhân đã đến với trang quản trị
                    </div>
                    <div class="card-body bio-graph-info">
                        <h1>Bio Graph</h1>
                        <div class="row">
                            <div class="bio-row">
                                <p><span>First Name </span>: {{$user->username}}</p>
                            </div>
                            {{-- <div class="bio-row">
                                <p><span>Last Name </span>: {{$user->username}}</p>
                            </div> --}}
                            <div class="bio-row">
                                <p><span>Country </span>: {{$user->address}}</p>
                            </div>
                            {{-- <div class="bio-row">
                                <p><span>Birthday</span>: {{$user->username}}</p>
                            </div> --}}
                            <div class="bio-row">
                                <p><span>Occupation </span>: {{$user->role}}</p>
                            </div>
                            <div class="bio-row">
                                <p><span>Email </span>: {{$user->email}}</p>
                            </div>
                            <div class="bio-row">
                                <p><span>Phone </span>: {{$user->phone}}</p>
                            </div>
                            {{-- <div class="bio-row">
                                <p><span>Mobile </span>: 88 (02) 123456</p>
                            </div> --}}
                        </div>
                    </div>
                </section>
                
            </aside>
        </div>

@endsection