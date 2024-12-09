<!DOCTYPE html>
<html lang="en">

<!-- Mirrored from thevectorlab.net/flatlab-4/index.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 26 Aug 2024 14:10:45 GMT -->

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="Mosaddek">
    <meta name="keyword" content="FlatLab, Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">
    <!-- <meta name="csrf-token" content="{{ csrf_token() }}"> -->
    <link rel="shortcut icon" href="{{ asset('assets') }}/admin/img/favicon.html">

    <title>Thor-Admin </title>

    <!-- Bootstrap core CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link href="{{ asset('assets') }}/admin/css/bootstrap.min.css" rel="stylesheet">
    <link href="{{ asset('assets') }}/admin/css/bootstrap-reset.css" rel="stylesheet">
    <!--external css-->
    <link href="{{ asset('assets') }}/admin/assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
    <link href="{{ asset('assets') }}/admin/assets/jquery-easy-pie-chart/jquery.easy-pie-chart.css" rel="stylesheet"
        type="text/css" media="screen" />
    <link rel="stylesheet" href="{{ asset('assets') }}/admin/css/owl.carousel.css" type="text/css">

    <!--right slidebar-->
    <link href="{{ asset('assets') }}/admin/css/slidebars.css" rel="stylesheet">
    <!--dynamic table-->
    <link href="{{ asset('assets') }}/admin/assets/advanced-datatable/media/css/demo_page.css" rel="stylesheet" />
    <link href="{{ asset('assets') }}/admin/assets/advanced-datatable/media/css/demo_table.css" rel="stylesheet" />
    <link rel="stylesheet" href="{{ asset('assets') }}/admin/assets/data-tables/DT_bootstrap.css" />

    <!-- Custom styles for this template -->

    <link href="{{ asset('assets') }}/admin/css/style.css" rel="stylesheet">
    <link href="{{ asset('assets') }}/admin/css/style-responsive.css" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet">

    @yield('css')
</head>

<body class="light-sidebar-nav">

    <section id="container">
        <!--header start-->
        <header class="header white-bg">
            <div class="sidebar-toggle-box">
                <i class="fa fa-bars"></i>
            </div>
            <!--logo start-->
            <a href="{{ route('admin.index') }}" class="logo">Admin<span>THOR</span></a>
            <!--logo end-->
            <div class="nav notify-row" id="top_menu">
                <!-- notification start -->
                <ul class="nav top-menu">
                    <!-- settings start -->
                    <li class="dropdown">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <i class="fa fa-tasks"></i>
                            <span class="badge badge-success">
                                @if (session('success_orders') && is_array(session('success_orders')))
                                    {{ count(session('success_orders')) }}
                                @else
                                    0
                                @endif
                            </span>
                        </a>
                        <ul class="dropdown-menu extended tasks-bar"
                            style="max-height: 200px; overflow-y: auto; width: 350px;">
                            <div class="notify-arrow notify-arrow-green"></div>
                            @if (session('success_orders') && is_array(session('success_orders')))
                                <li class="notification-header">
                                    <p style="font-size: 16px" class="green">Có {{ count(session('success_orders')) }}
                                        đơn hàng mới.</p>
                                </li>
                                @foreach (array_reverse(session('success_orders')) as $successMessage)
                                    <li class="task-item">
                                        <a href="{{ route('admin.orders.index') }}">
                                            <span style="font-size: 14px;">{{ $successMessage }}</span>
                                        </a>
                                    </li>
                                @endforeach
                            @else
                                <li>
                                    <p class="green" style="margin: 0;">Không có thông báo đơn hàng nào mới.</p>
                                </li>
                            @endif
                        </ul>
                    </li>
                    <!-- settings end -->

                    <!-- notification dropdown start-->
                    <li id="header_notification_bar" class="dropdown">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <i class="fa fa-bell-o"></i>
                            <span class="badge badge-warning">
                                @if (session('low_stock_products') && count(session('low_stock_products')) > 0)
                                    {{ count(session('low_stock_products')) }}
                                @else
                                    0
                                @endif
                            </span>
                        </a>
                        <ul class="dropdown-menu extended notification"
                            style="max-height: 200px; overflow-y: auto; width: 350px;">
                            <div class="notify-arrow notify-arrow-yellow"></div>
                            @if (session('low_stock_products') && count(session('low_stock_products')) > 0)
                                <li class="notification-header">
                                    <p style="font-size: 16px" class="yellow">Có
                                        {{ count(session('low_stock_products')) }} sản phẩm dưới 5 đôi
                                    </p>
                                </li>
                                @foreach (session('low_stock_products') as $product)
                                    <li class="product-item">
                                        <a href="{{ route('admin.products.show', $product->id) }}">
                                            <div class="d-flex align-items-center">
                                                <span class="mr-2"><img src="{{ Storage::url($product->image) }}"
                                                        style="width: 60px;" alt=""></span>
                                                <div>
                                                    <strong style="font-size: 13px">{{ $product->name }}</strong>
                                                    <br>
                                                    <span style="font-size: 11px" class="small italic">Số lượng còn:
                                                        {{ $product->total_quantity_in_stock }} đôi</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                @endforeach
                            @else
                                <li>
                                    <p class="yellow" style="margin: 0;">Không có sản phẩm nào dưới 5 đôi trong kho</p>
                                </li>
                            @endif
                        </ul>
                    </li>
                    <!-- notification dropdown end -->
                </ul>
            </div>

            <div class="top-nav ">
                <!--search & user info start-->
                <!--search & user info start-->
                <ul class="nav pull-right top-menu">
                    <li class="mr-2">
                        @yield('search')
                    </li>
                    <!-- user login dropdown start-->
                    @auth
                        <li class="dropdown mr-2">
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                <img src="{{ optional(Auth::user()->avatar_img) ? Storage::url(Auth::user()->avatar_img) : asset('default-avatar.png') }}"
                                    alt="{{ optional(Auth::user())->username }}" width="30px">
                                <b class="caret"></b>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-right">
                                <li>
                                    <a href="{{ route('admin.profile') }}" class="dropdown-item">
                                        <i class="bi bi-suitcase-lg mr-2"></i> Hồ sơ
                                    </a>
                                </li>
                                <li>
                                    <form action="{{ route('logout') }}" method="POST" style="display: inline;">
                                        @csrf
                                        <button type="submit"
                                            class="btn btn-link dropdown-item text-danger d-flex align-items-center">
                                            <i class="fa fa-sign-out-alt mr-2"></i> Đăng xuất
                                        </button>
                                    </form>
                                </li>
                            </ul>
                        </li>
                    @else
                        <li>
                            <a href="{{ route('login') }}" class="dropdown-item">Đăng nhập</a>
                        </li>
                    @endauth
                    <a href="http://localhost:3000"
                        style="display: inline-flex; justify-content: center; align-items: center; text-decoration: none; font-size: 15px; padding: 5px;"
                        target="_blank"><i class="bi bi-box-arrow-right mr-1"></i><span>Website</span></a>
                    <!-- user login dropdown end -->
                </ul>
                <!--search & user info end-->
            </div>
        </header>
        <!--header end-->
        <!--sidebar start-->
        <aside style="position: sticky; top: 0; z-index: 1000;">
            <div id="sidebar" class="nav-collapse ">
                <!-- sidebar menu start-->
                <ul class="sidebar-menu" id="nav-accordion">
                    <!-- Thống kê -->
                    @if (auth()->user()->hasRole(['admin', 'staff']))
                        <li>
                            <a href="{{ route('admin.index') }}">
                                <i class="bi bi-speedometer2"></i>
                                <span>Thống kê</span>
                            </a>
                        </li>
                    @endif
                    <!-- Bài viết -->
                    @if (auth()->user()->hasRole(['admin']))
                        <li>
                            <a href="{{ route('admin.articles.index') }}">
                                <i class="bi bi-newspaper"></i>
                                <span>Bài viết</span>
                            </a>
                        </li>
                    @endif

                    <!-- Banner -->
                    @if (auth()->user()->hasRole(['admin']))
                        <li>
                            <a href="{{ route('admin.banners.index') }}">
                                <i class="bi bi-card-image"></i>
                                <span>Banner</span>
                            </a>
                        </li>
                    @endif

                    <!-- Thương hiệu -->
                    @if (auth()->user()->hasRole(['admin']))
                        <li>
                            <a href="{{ route('admin.brands.index') }}">
                                <i class="bi bi-badge-tm-fill"></i>
                                <span>Thương hiệu</span>
                            </a>
                        </li>
                    @endif

                    <!-- Danh mục -->
                    @if (auth()->user()->hasRole(['admin']))
                        <li>
                            <a href="{{ route('admin.categories.index') }}">
                                <i class="bi bi-tags-fill"></i>
                                <span>Danh mục</span>
                            </a>
                        </li>
                    @endif

                    <!-- Liên hệ -->
                    @if (auth()->user()->hasRole(['admin']))
                        <li>
                            <a href="{{ route('admin.contacts.index') }}">
                                <i class="bi bi-person-rolodex"></i>
                                <span>Liên hệ</span>
                            </a>
                        </li>
                    @endif

                    <!-- Bình luận -->
                    @if (auth()->user()->hasRole(['admin']))
                        <li>
                            <a href="{{ route('admin.comments.index') }}">
                                <i class="bi bi-chat-square-dots-fill"></i>
                                <span>Bình luận</span>
                            </a>
                        </li>
                    @endif

                    <!-- Đơn hàng -->
                    @if (auth()->user()->hasRole(['admin', 'staff']))
                        <li>
                            <a href="{{ route('admin.orders.index') }}">
                                <i class="bi bi-receipt"></i>
                                <span>Đơn hàng</span>
                            </a>
                        </li>
                    @endif

                    <!-- Tài khoản (Chỉ Admin) -->
                    @if (auth()->user()->hasRole(['admin', 'staff']))
                        <li>
                            <a href="{{ route('admin.user.index') }}">
                                <i class="bi bi-person-lines-fill"></i>
                                <span>Tài khoản</span>
                            </a>
                        </li>
                    @endif

                    <!-- Shops -->
                    @if (auth()->user()->hasRole(['admin', 'staff']))
                        <li>
                            <a href="{{ route('admin.products.index') }}">
                                <i class="bi bi-box-seam"></i>
                                <span>Sản phẩm</span>
                            </a>
                        </li>
                    @endif

                    <!-- Voucher (Chỉ Admin) -->
                    @if (auth()->user()->hasRole(['admin']))
                        <li>
                            <a href="{{ route('admin.vouchers.index') }}">
                                <i class="bi bi-ticket-detailed"></i>
                                <span>Mã giảm giá</span>
                            </a>
                        </li>
                    @endif
                </ul>
                <!-- sidebar menu end-->
            </div>
        </aside>
        <!--sidebar end-->
        <!--main content start-->
        <section id="main-content">
            <section class="wrapper">
                @yield('content')
            </section>
        </section>
    </section>

    <!-- Section for additional JS -->
    @yield('js')
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <!-- JS của Select2 -->
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <!-- js placed at the end of the document so the pages load faster -->
    {{-- <script src="{{ asset('assets/admin/js/jquery.js') }}"></script> --}}
    <script src="{{ asset('assets') }}/admin/js/bootstrap.bundle.min.js"></script>
    <script class="include" type="text/javascript" src="{{ asset('assets') }}/admin/js/jquery.dcjqaccordion.2.7.js">
    </script>
    <!-- <script src="{{ asset('assets') }}/admin/js/jquery.scrollTo.min.js"></script> -->
    <script src="{{ asset('assets') }}/admin/js/jquery.nicescroll.js" type="text/javascript"></script>
    <script src="{{ asset('assets') }}/admin/js/jquery.sparkline.js" type="text/javascript"></script>
    <script src="{{ asset('assets') }}/admin/assets/js/jquery-easy-pie-chart/jquery.easy-pie-chart.js"></script>
    <script src="{{ asset('assets') }}/admin/js/owl.carousel.js"></script>
    <script src="{{ asset('assets') }}/admin/js/jquery.customSelect.min.js"></script>
    <script src="{{ asset('assets') }}/admin/js/respond.min.js"></script>

    <!--right slidebar-->
    <script src="{{ asset('assets') }}/admin/js/slidebars.min.js"></script>

    <!--common script for all pages-->
    <script src="{{ asset('assets') }}/admin/js/common-scripts.js"></script>

    <!--script for this page-->
    <script src="{{ asset('assets') }}/admin/js/sparkline-chart.js"></script>
    <script src="{{ asset('assets') }}/admin/js/easy-pie-chart.js"></script>

    <script>
        //owl carousel

        $(document).ready(function() {
            $("#owl-demo").owlCarousel({
                navigation: true,
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: true,
                autoPlay: true

            });
        });

        //custom select box

        $(function() {
            $('select.styled').customSelect();
        });

        $(window).on("resize", function() {
            var owl = $("#owl-demo").data("owlCarousel");
            owl.reinit();
        });
    </script>

</body>


</html>
