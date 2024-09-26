@extends('client.layout')
@section('content')
<main>
    <!-- breadcrumb area start -->
    <div class="breadcrumb-area breadcrumb-img bg-img" data-bg="{{ asset('assets')}}/client/assets/img/banner/shop.jpg">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="breadcrumb-wrap">
                        <nav aria-label="breadcrumb">
                            <h3 class="breadcrumb-title">LOGIN REGISTER</h3>
                            <ul class="breadcrumb justify-content-center">
                                <li class="breadcrumb-item"><a href="index.html"><i class="fa fa-home"></i></a></li>
                                <li class="breadcrumb-item active" aria-current="page">Login Register</li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- breadcrumb area end -->

    <!-- login register wrapper start -->
    <div class="login-register-wrapper section-padding ">
        <div class="container">
            <div class="member-area-from-wrap">
                <div class="row">

                    <!-- Login Content Start -->
                    <div class="col-lg-6 align-items-center">
                        <div class="login-reg-form-wrap">
                            <h4>Quên Mật Khẩu à !!</h4>
                            @if (session('status'))
                            <div class="alert alert-success mb-4" role="alert">
                                {{ session('status') }}
                            </div>
                        @endif
                        
                        <form method="POST" action="{{ route('password.email') }}">
                            @csrf
                        
                            <!-- Email Address -->
                            <div class="form-group">
                                <label for="email">{{ __('Email') }}</label>
                                <input id="email" class="form-control" type="email"  placeholder="Nhập Email vào cu!!"  class="form-control" name="email" value="{{ old('email') }}"  autofocus>
                                @error('email')
                                <div class="text-danger"> {{$message}} </div>
                                @enderror
                            </div>
                      
                        
                            <!-- Submit Button -->
                          
                             
                                <div  class="single-input-item">
                                    <button type="submit" class="btn btn-sqr">   {{ __('Email Password Reset Link') }}</button>
                                </div>
                        
                        </form>
                        </div>
                    </div>
                    <!-- Login Content End -->
                </div>
            </div>
        </div>
    </div>
    <!-- login register wrapper end -->
</main>
@endsection