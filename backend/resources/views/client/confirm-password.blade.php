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
                            <h4>Đăng Nhập</h4>
                            <form method="POST" action="{{ route('login') }}">
                                @csrf
                                <div class="single-input-item">
                                    <input id="email" class="form-control" placeholder="Nhập Email" type="email" name="email" value="{{ old('email') }}" autofocus autocomplete="username">
                                </div>


                                @if ($errors->has('email'))
                                <small class="text-danger">{{ $errors->first('email') }}</small>
                                @endif
                                <div class="single-input-item">
                                    <input id="password" class="form-control" placeholder="Nhập Mật Khẩu" type="password" name="password"  autocomplete="current-password">
                                </div>
                                @if ($errors->has('password'))
                                <small class="text-danger">{{ $errors->first('password') }}</small>
                               @endif
                                <div class="single-input-item">
                                    <div
                                        class="login-reg-form-meta d-flex align-items-center justify-content-between">
                                        <div class="remember-meta">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="rememberMe">
                                                <label class="custom-control-label" for="rememberMe">Nhớ Tài khoản</label>
                                            </div>
                                        </div>
                                        <a href="{{ route('password.request') }}" class="forget-pwd">Quên Mật Khẩu</a>
                                    </div>
                                </div>
                                <div  class="single-input-item">
                                    <button type="submit" class="btn btn-sqr"> {{ __('Log in') }}</button>
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