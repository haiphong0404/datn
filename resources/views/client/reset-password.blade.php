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
                            <h4>Đổi Lại Mật Khẩu</h4> <br>
                            <form method="POST" action="{{ route('password.store') }}">
                                @csrf
                            
                                <!-- Password Reset Token -->
                                <input type="hidden" name="token" value="{{ $request->route('token') }}">
                            
                                <!-- Email Address -->
                                <div class="form-group">
                                   
                                    <input id="email" type="email" class="form-control" name="email" value="{{ old('email', $request->email) }}"  autofocus autocomplete="username">
                                    @if ($errors->has('email'))
                                        <div class="text-danger mt-2">
                                            {{ $errors->first('email') }}
                                        </div>
                                    @endif
                                </div>
                            
                                <!-- Password -->
                                <div class="form-group mt-4">
                                    <label for="password">{{ __('Mật Khẩu Mới') }}</label>
                                    <input id="password" type="password" class="form-control" name="password"  autocomplete="new-password">
                                    @if ($errors->has('password'))
                                        <div class="text-danger mt-2">
                                            {{ $errors->first('password') }}
                                        </div>
                                    @endif
                                </div>
                            
                                <!-- Confirm Password -->
                                <div class="form-group mt-4">
                                    <label for="password_confirmation">{{ __('Viết Lại Mật Khẩu') }}</label>
                                    <input id="password_confirmation" type="password" class="form-control" name="password_confirmation"  autocomplete="new-password">
                                    @if ($errors->has('password_confirmation'))
                                        <div class="text-danger mt-2">
                                            {{ $errors->first('password_confirmation') }}
                                        </div>
                                    @endif
                                </div>
                            
                                <!-- Submit Button -->
                                <div class="form-group mt-4">
                                    <button type="submit" class="btn btn-sqr">
                                        {{ __('Đổi Mật Khẩu') }}
                                    </button>
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