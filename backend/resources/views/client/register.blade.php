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
    <div class="login-register-wrapper section-padding">
        <div class="container">
            <div class="member-area-from-wrap">
                <div class="row">
                    <!-- Register Content Start -->
                    <div class="col-lg-6">
                        <div class="login-reg-form-wrap sign-up-form">
                            <h4>Đăng ký Ngay</h4>
                            <form method="POST" action="{{ route('register') }}">
                                @csrf
                                <div class="single-input-item">
                                    <input type="text" placeholder="Nhập Tên" name="username" value="{{ old('username') }}"  autofocus autocomplete="name">
                                </div>
                                @if($errors->has('username'))
                                <small class="text-danger">{{ $errors->first('username') }}</small>
                                @endif

                                <div class="single-input-item">
                                    <input type="email" placeholder="Nhập Email"  name="email" value="{{ old('email') }}"  autocomplete="username">
                                </div>
                                @if($errors->has('email'))
                                <small class="text-danger">{{ $errors->first('email') }}</small>
                                 @endif


                                 <div class="single-input-item">
                                    <input type="number" placeholder="Nhập SỐ Điện Thoại"  name="phone" value="{{ old('phone') }}"  autocomplete="phone">
                                </div>
                                @if($errors->has('phone'))
                                <small class="text-danger">{{ $errors->first('phone') }}</small>
                                 @endif

                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="single-input-item">
                                            <input id="password" class="form-control" placeholder="Nhập password" type="password" name="password"  autocomplete="new-password">
                                        </div>
                                    </div>

                                    @if($errors->has('password'))
                                    <small class="text-danger">{{ $errors->first('password') }}</small>
                                    @endif

                                    <div class="col-lg-6">
                                        <div class="single-input-item">
                                            <input id="password_confirmation" class="form-control"   placeholder="Nhập lại password" type="password" name="password_confirmation"  autocomplete="new-password">
                                        </div>
                                    </div>
                                    @if($errors->has('password_confirmation'))
                                    <small class="text-danger">{{ $errors->first('password_confirmation') }}</small>
                                    @endif
                                    
                                    
                                    
                                </div>
                                <div class="single-input-item">
                                    <div class="login-reg-form-meta">
                                        <div class="remember-meta">
                                            
                                        </div>
                                    </div>
                                </div>

                               
                                        <input type="checkbox" id="togglePassword" onclick="togglePasswordVisibility()"> Hiển thị mật khẩu
                                   
                                <div class="single-input-item">
                                    <div class="row">
                                    
                                 
                                    <button type="submit" class="btn btn-sqr">
                                        Đăng Ký
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- Register Content End -->
                </div>
            </div>
        </div>
    </div>

    <!-- login register wrapper end -->
</main>
<script>
    function togglePasswordVisibility() {
        const password = document.getElementById('password');
        const passwordConfirmation = document.getElementById('password_confirmation');
        const togglePassword = document.getElementById('togglePassword');
        
        // Check if checkbox is checked
        if (togglePassword.checked) {
            password.type = 'text';
            passwordConfirmation.type = 'text';
        } else {
            password.type = 'password';
            passwordConfirmation.type = 'password';
        }
    }
</script>
@endsection