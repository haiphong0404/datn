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

    <title>Thor-Admin Dashboard</title>

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
            <a href="" class="logo">Admin<span>THOR</span></a>
            <!--logo end-->
            <div class="nav notify-row" id="top_menu">
                <!--  notification start -->
                <ul class="nav top-menu">
                    <!-- settings start -->
                    <li class="dropdown">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <i class="fa fa-tasks"></i>
                            <span class="badge badge-success">6</span>
                        </a>
                        <ul class="dropdown-menu extended tasks-bar">
                            <div class="notify-arrow notify-arrow-green"></div>
                            <li>
                                <p class="green">You have 6 pending tasks</p>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="task-info">
                                        <div class="desc">Dashboard v1.3</div>
                                        <div class="percent">40%</div>
                                    </div>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-striped bg-success" role="progressbar"
                                            aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
                                            <span class="sr-only">40% Complete (success)</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="task-info">
                                        <div class="desc">Database Update</div>
                                        <div class="percent">60%</div>
                                    </div>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-striped bg-warning" role="progressbar"
                                            aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%">
                                            <span class="sr-only">60% Complete (warning)</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="task-info">
                                        <div class="desc">Iphone Development</div>
                                        <div class="percent">87%</div>
                                    </div>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-striped bg-info" role="progressbar"
                                            aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 87%">
                                            <span class="sr-only">87% Complete</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="task-info">
                                        <div class="desc">Mobile App</div>
                                        <div class="percent">33%</div>
                                    </div>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-striped bg-danger" role="progressbar"
                                            aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"
                                            style="width: 33%">
                                            <span class="sr-only">33% Complete (danger)</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="task-info">
                                        <div class="desc">Dashboard v1.3</div>
                                        <div class="percent">45%</div>
                                    </div>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-striped" role="progressbar"
                                            aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"
                                            style="width: 45%">
                                            <span class="sr-only">45% Complete</span>
                                        </div>
                                    </div>

                                </a>
                            </li>
                            <li class="external">
                                <a href="#">See All Tasks</a>
                            </li>
                        </ul>
                    </li>
                    <!-- settings end -->
                    <!-- inbox dropdown start-->
                    <li id="header_inbox_bar" class="dropdown">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <i class="fa fa-envelope-o"></i>
                            <span class="badge badge-danger">5</span>
                        </a>
                        <ul class="dropdown-menu extended inbox">
                            <div class="notify-arrow notify-arrow-red"></div>
                            <li>
                                <p class="red">You have 5 new messages</p>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="photo"><img alt="avatar" src="avatar-mini.jpg"></span>
                                    <span class="subject">
                                        <span class="from">Jonathan Smith</span>
                                        <span class="time">Just now</span>
                                    </span>
                                    <span class="message">
                                        Hello, this is an example msg.
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="photo"><img alt="avatar" src="img/avatar-mini2.jpg"></span>
                                    <span class="subject">
                                        <span class="from">Jhon Doe</span>
                                        <span class="time">10 mins</span>
                                    </span>
                                    <span class="message">
                                        Hi, Jhon Doe Bhai how are you ?
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="photo"><img alt="avatar" src="img/avatar-mini3.jpg"></span>
                                    <span class="subject">
                                        <span class="from">Jason Stathum</span>
                                        <span class="time">3 hrs</span>
                                    </span>
                                    <span class="message">
                                        This is awesome dashboard.
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="photo"><img alt="avatar" src="img/avatar-mini4.jpg"></span>
                                    <span class="subject">
                                        <span class="from">Jondi Rose</span>
                                        <span class="time">Just now</span>
                                    </span>
                                    <span class="message">
                                        Hello, this is metrolab
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">See all messages</a>
                            </li>
                        </ul>
                    </li>
                    <!-- inbox dropdown end -->
                    <!-- notification dropdown start-->
                    <li id="header_notification_bar" class="dropdown">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <i class="fa fa-bell-o"></i>
                            <span class="badge badge-warning">7</span>
                        </a>
                        <ul class="dropdown-menu extended notification">
                            <div class="notify-arrow notify-arrow-yellow"></div>
                            <li>
                                <p class="yellow">You have 7 new notifications</p>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="label label-danger"><i class="fa fa-bolt"></i></span>
                                    Server #3 overloaded.
                                    <span class="small italic">34 mins</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="label label-warning"><i class="fa fa-bell"></i></span>
                                    Server #10 not respoding.
                                    <span class="small italic">1 Hours</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="label label-danger"><i class="fa fa-bolt"></i></span>
                                    Database overloaded 24%.
                                    <span class="small italic">4 hrs</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="label label-success"><i class="fa fa-plus"></i></span>
                                    New user registered.
                                    <span class="small italic">Just now</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="label label-info"><i class="fa fa-bullhorn"></i></span>
                                    Application error.
                                    <span class="small italic">10 mins</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">See all notifications</a>
                            </li>
                        </ul>
                    </li>
                    <!-- notification dropdown end -->
                </ul>
                <!--  notification end -->
            </div>
            <div class="top-nav ">
                <!--search & user info start-->
                <ul class="nav pull-right top-menu">
                    <li>
                        @yield('search')
                        {{-- <input type="text" class="form-control search" placeholder="Search"> --}}
                    </li>
                    <!-- user login dropdown start-->
                    @auth
                        <li class="dropdown">
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                <img src="{{ optional(Auth::user()->avatar_img) ? Storage::url(Auth::user()->avatar_img) : asset('default-avatar.png') }}"
                                    alt="{{ optional(Auth::user())->username }}" width="30px">
                                <span class="username">{{ optional(Auth::user())->username }}</span>
                                <b class="caret"></b>
                            </a>

                            <ul class="dropdown-menu dropdown-menu-right">
                                <li>
                                    <a href="{{ route('admin.profile') }}" class="dropdown-item">
                                        <i class="fa fa-suitcase"></i> Profile
                                    </a>
                                </li>
                                <li>
                                    <form action="{{ route('logout') }}" method="POST" style="display: inline;">
                                        @csrf
                                        <button type="submit" class="btn btn-link dropdown-item"><i
                                                class="fa fa-key"></i> Logout</button>
                                    </form>
                                </li>
                            </ul>
                        </li>
                    @else
                        <li>
                            <a href="{{ route('login') }}" class="dropdown-item">Đăng nhập</a>
                        </li>
                    @endauth
                    <li class="sb-toggle-right">
                        <a href="http://localhost:3000/" target="_blank" rel="noopener noreferrer">
                            <i class="fa fa-sign-in mr-2"></i>Website
                        </a>
                    </li>
                    
                    <!-- user login dropdown end -->
                </ul>
                <!--search & user info end-->
            </div>
        </header>
        <!--header end-->
        <!--sidebar start-->
        <aside>
            <div id="sidebar" class="nav-collapse ">
                <!-- sidebar menu start-->
                <ul class="sidebar-menu" id="nav-accordion">
                    <li>
                        <a class="active" href="">
                            <i class="fa fa-dashboard"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('admin.articles.index') }}">
                            <i class="bi bi-newspaper"></i>
                            <span>Article</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('admin.banners.index') }}">
                            <i class="bi bi-card-image"></i>
                            <span>Banner</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('admin.brands.index') }}">
                            <i class="bi bi-badge-tm-fill"></i>
                            <span>Brand</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('admin.categories.index') }}">
                            <i class="bi bi-tags-fill"></i>
                            <span>Category</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('admin.contacts.index') }}">
                            <i class="bi bi-person-rolodex"></i>
                            <span>Contact</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('admin.comments.index') }}">
                            <i class="bi bi-chat-square-dots-fill"></i>
                            <span>Comment</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('admin.orders.index') }}">
                            <i class="bi bi-receipt"></i>
                            <span>Order</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('admin.user.index') }}">
                            <i class="fa fa-user"></i>
                            <span>User</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('admin.products.index') }}">
                            <i class="bi bi-shop"></i>
                            <span>Product</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('admin.vouchers.index') }}">
                            <i class="fas fa-ticket-alt"></i>
                            <span> Voucher</span>
                        </a>
                    </li>

                </ul>
                <!-- sidebar menu end-->
            </div>
        </aside>
        <!--sidebar end-->
        <!--main content start-->
        <section id="main-content">
            <section class="wrapper">

                <div class="container">
                    @yield('content')
                </div>

            </section>
        </section>
    </section>

    <!-- Section for additional JS -->
    @yield('js')
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>

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
    <script src="{{ asset('assets') }}/admin/js/count.js"></script>

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
