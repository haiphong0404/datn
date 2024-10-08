(function ($) {
	"use strict";

	// Sticky menu
	var $window = $(window);
	$window.on('scroll', function () {
		var scroll = $window.scrollTop();
		if (scroll < 300) {
			$(".sticky").removeClass("is-sticky");
		} else {
			$(".sticky").addClass("is-sticky");
		}
	});


	// tooltip active js
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	})


	// Background Image JS start
	var bgSelector = $(".bg-img");
	bgSelector.each(function (index, elem) {
		var element = $(elem),
			bgSource = element.data('bg');
		element.css('background-image', 'url(' + bgSource + ')');
	});


	// search off-canvas active
	$(document).ready(function() {
	$(".search-trigger").on('click', function(){
		$("body").addClass('fix');
		$(".offcanvas-search-inner").addClass('show')
	})

	$(".offcanvas-close").on('click', function(){
		$("body").removeClass('fix');
		$(".offcanvas-search-inner").removeClass('show')
	})
})

	// Off Canvas Open close
	$(document).ready(function() {
	$(".mobile-menu-btn").on('click', function () {
		$("body").addClass('fix');
		$(".off-canvas-wrapper").addClass('open');
	});

	$(".btn-close-off-canvas,.off-canvas-overlay").on('click', function () {
		$("body").removeClass('fix');
		$(".off-canvas-wrapper").removeClass('open');
	});
})

	// offcanvas mobile menu
    var $offCanvasNav = $('.mobile-menu'),
        $offCanvasNavSubMenu = $offCanvasNav.find('.dropdown');
    
    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i></i></span>');
    
    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();
    
    /*Category Sub Menu Toggle*/
    $offCanvasNav.on('click', 'li a, li .menu-expand', function(e) {
        var $this = $(this);
        if ( ($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand')) ) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length){
                $this.parent('li').removeClass('active');
                $this.siblings('ul').slideUp();
            } else {
                $this.parent('li').addClass('active');
                $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                $this.closest('li').siblings('li').find('ul:visible').slideUp();
                $this.siblings('ul').slideDown();
            }
        }
	});
	

	// hero slider active js
	$(document).ready(function() {
		$('.hero-slider-active').slick({
		  fade: true,
		  speed: 1000,
		  autoplay: false,
		  prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		  nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
		  responsive: [{
			breakpoint: 992,
			settings: {
			  arrows: false,	
			  dots: true
			}
		  }]
		});
	  });

	/* =================================
	product carousel active js
	=================================*/
	$(document).ready(function() {
		$('.product-carousel--4').slick({
		  speed: 1000,
		  slidesToShow: 4,
		  adaptiveHeight: true,
		  prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		  nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
		  responsive: [{
			  breakpoint: 992,
			  settings: {
				slidesToShow: 3
			  }
			},
			{
			  breakpoint: 768,
			  settings: {
				slidesToShow: 2,
				arrows: false
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				arrows: false
			  }
			}]
		});
	  });
	  

	/* =================================
	product carousel row-2 active js
	=================================*/
	$(document).ready(function() {
		$('.product-carousel-4_2').slick({
			speed: 1000,
			slidesToShow: 4,
			rows: 2,
			adaptiveHeight: true,
			prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
			nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
			responsive: [{
				breakpoint: 992,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					arrows: false,
					rows: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					arrows: false,
					rows: 1
				}
			}]
		});
	  });
	

	// hero slider active js
	$(document).ready(function() {
	$('.testimonial-carousel').slick({
		speed: 1000,
		arrows: false,
		autoplay: true
	});
});

	// brand logo carousel active js
	$(document).ready(function() {
	$('.brand-logo-carousel').slick({
		speed: 1000,
		slidesToShow: 5,
		adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
		responsive: [{
			breakpoint: 1200,
			settings: {
				slidesToShow: 4
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 3,
				arrows: false
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
				arrows: false
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				arrows: false
			}
		}]
	});
});

	/* =================================
	blog carousel active js
	=================================*/
	$(document).ready(function() {
	$('.blog-carousel-active').slick({
		speed: 1000,
		slidesToShow: 2,
		rows: 2,
		adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				arrows: false,
				rows: 1
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				arrows: false,
				rows: 1
			}
		}]
	});
	});
	// blog carousel active start
	$(document).ready(function() {
	$('.blog-carousel-2').slick({
		speed: 1000,
		dots: true,
		arrows: false
	});
});

	// product details slider active
    $(document).ready(function() {
		$('.deals-content-carousel').slick({
		  fade: true,
		  arrows: false,
		  asNavFor: '.deals-nav-carousel'
		});
	  });
	  


    // product details slider nav active
	$(document).ready(function() {
		$('.deals-nav-carousel').slick({
		  slidesToShow: 4,
		  vertical: true,
		  asNavFor: '.deals-content-carousel',
		  focusOnSelect: true,
		  arrows: false,
		  responsive: [{
			  breakpoint: 992,
			  settings: {
				vertical: false,
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				vertical: false,
				slidesToShow: 3,
			  }
			}]
		});
	  });
	  

	// Category carousel active js
    $(document).ready(function() {
		$('.catagory-carousel-active').slick({
		  speed: 1000,
		  arrows: false,
		  slidesToShow: 3,
		  responsive: [
			{
			  breakpoint: 992,
			  settings: {
				slidesToShow: 2,
			  },
			},
			{
			  breakpoint: 576,
			  settings: {
				slidesToShow: 1,
			  },
			},
		  ],
		});
	  });
	  

	/* =================================
	group carousel active js
	=================================*/
	$('.group-carousel--3').slick({
		speed: 1000,
		rows: 3,
		arrows: false,
		adaptiveHeight: true
	});

	/* =================================
	special product active js
	=================================*/
    $('.special-product-carousel').slick({
		speed: 1000,
		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
		slidesToShow: 2,
		adaptiveHeight: true,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1
			}
		}]
	});

	/* =================================
	product carousel active js
	=================================*/
	$(document).ready(function() {
		$('.product-gallery-3').slick({
		  speed: 1000,
		  slidesToShow: 3,
		  adaptiveHeight: true,
		  prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		  nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
		  responsive: [
			{
			  breakpoint: 992,
			  settings: {
				slidesToShow: 2,
				arrows: false,
			  },
			},
			{
			  breakpoint: 768,
			  settings: {
				slidesToShow: 1,
				arrows: false,
			  },
			},
			{
			  breakpoint: 576,
			  settings: {
				slidesToShow: 2,
				arrows: false,
			  },
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				arrows: false,
			  },
			},
		  ],
		});
	  });
	  


	// product details slider active
    $('.product-large-slider').slick({
        fade: true,
        arrows: false,
        asNavFor: '.pro-nav'
    });


    // product details slider nav active
    $('.pro-nav').slick({
        slidesToShow: 4,
        asNavFor: '.product-large-slider',
		centerMode: true,
		arrows: false,
        centerPadding: 0,
		focusOnSelect: true,
		responsive: [{
			breakpoint: 576,
			settings: {
				slidesToShow: 3,
			}
		}]
	});

	//nice select active start
	$('select').niceSelect();


	// Image zoom effect
	$('.img-zoom').zoom();


	// offcanvas mini-cart button js
	$(".minicart-btn").on('click', function(){
		$("body").addClass('fix');
		$(".minicart-inner").addClass('show')
	})

	$(".offcanvas-close, .minicart-close,.offcanvas-overlay").on('click', function(){
		$("body").removeClass('fix');
		$(".minicart-inner").removeClass('show')
	})


	// Data countdown active js
	$('[data-countdown]').each(function () {
		var $this = $(this),
			finalDate = $(this).data('countdown');
		$this.countdown(finalDate, function (event) {
			$this.html(event.strftime('<div class="single-countdown"><span class="single-countdown__time">%D</span><span class="single-countdown__text">Days</span></div><div class="single-countdown"><span class="single-countdown__time">%H</span><span class="single-countdown__text">Hours</span></div><div class="single-countdown"><span class="single-countdown__time">%M</span><span class="single-countdown__text">Mins</span></div><div class="single-countdown"><span class="single-countdown__time">%S</span><span class="single-countdown__text">Secs</span></div>'));
		});
	});

	// quantity change js
    $('.pro-qty').prepend('<span class="dec qtybtn">-</span>');
    $('.pro-qty').append('<span class="inc qtybtn">+</span>');
    $('.qtybtn').on('click', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);
	});


	// product view mode change js
	$(document).ready(function() {
    $('.product-view-mode a').on('click', function (e) {
        e.preventDefault();
        var shopProductWrap = $('.shop-product-wrap');
        var viewMode = $(this).data('target');
        $('.product-view-mode a').removeClass('active');
        $(this).addClass('active');
        shopProductWrap.removeClass('grid-view list-view').addClass(viewMode);
	})
});
	
	
	// pricing filter
	var rangeSlider = $(".price-range"),
		amount = $("#amount"),
		minPrice = rangeSlider.data('min'),
		maxPrice = rangeSlider.data('max');
	rangeSlider.slider({
		range: true,
		min: minPrice,
		max: maxPrice,
		values: [minPrice, maxPrice],
		slide: function (event, ui) {
			amount.val("$" + ui.values[0] + " - $" + ui.values[1]);
		}
	});
	amount.val(" $" + rangeSlider.slider("values", 0) +
		" - $" + rangeSlider.slider("values", 1)
	);


	// Checkout Page accordion
    $("#create_pwd").on("change", function () {
        $(".account-create").slideToggle("100");
    });

    $("#ship_to_different").on("change", function () {
        $(".ship-to-different").slideToggle("100");
	});
	

    // Payment Method Accordion
    $('input[name="paymentmethod"]').on('click', function () {
        var $value = $(this).attr('value');
        $('.payment-method-details').slideUp();
        $('[data-method="' + $value + '"]').slideDown();
	});


	// Scroll to top active js
	$(document).ready(function() {
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 600) {
			$('.scroll-top').removeClass('not-visible');
		} else {
			$('.scroll-top').addClass('not-visible');
		}
	});
	$('.scroll-top').on('click', function (event) {
		$('html,body').animate({
			scrollTop: 0
		}, 1000);
	});
});
	

	// Search trigger js
	$(document).ready(function() {
	$(".search-trigger").on('click', function(){
		$(".header-search-box").toggleClass('search-box-open');
	})
});


	// Mail-chimp for dynamic newsletter
    $('#mc-form').ajaxChimp({
        language: 'en',
        callback: mailChimpResponse,
        // ADD YOUR MAILCHIMP URL BELOW HERE!
        url: 'https://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef'

    });

    // mail-chimp active js
    function mailChimpResponse(resp) {
        if (resp.result === 'success') {
            $('.mailchimp-success').html('' + resp.msg).fadeIn(900);
            $('.mailchimp-error').fadeOut(400);

        } else if (resp.result === 'error') {
            $('.mailchimp-error').html('' + resp.msg).fadeIn(900);
        }
	}


	$('.banner-statistics-area').imagesLoaded( function() {
		$('.banner-grid').masonry({
			// options
			itemSelector: '.col-md-4',
			columnWidth: 1
		});
	});

	/*------- Category Menu start -------*/
	// Variables
	var categoryToggleWrap = $('.category-toggle-wrap');
	var categoryToggle = $('.category-toggle');
	var categoryMenu = $('.category-menu');

	// Category Menu Toggles
	function categorySubMenuToggle() {
		var screenSize = $window.width();
		if (screenSize <= 991) {
			$('.category-menu .menu-item-has-children > a').prepend('<span class="expand menu-expand">+</span>');
			$('.category-menu .menu-item-has-children ul').slideUp();
		} else {
			$('.category-menu .menu-item-has-children > a .menu-expand').remove();
			$('.category-menu .menu-item-has-children ul').slideDown();
		}
	}

	$(window).on({
		load: function () {
			categorySubMenuToggle();
		},
		resize: function () {
			categorySubMenuToggle();
		}
	});

	categoryToggle.on('click', function () {
		categoryMenu.slideToggle();
	});

	// Category Sub Menu
	$('.category-menu').on('click', 'li a, li a .menu-expand', function (e) {
		var $a = $(this).hasClass('menu-expand') ? $(this).parent() : $(this);
		if ($a.parent().hasClass('menu-item-has-children')) {
			if ($a.attr('href') === '#' || $(this).hasClass('menu-expand')) {
				if ($a.siblings('ul:visible').length > 0) $a.siblings('ul').slideUp();
				else {
					$(this).parents('li').siblings('li').find('ul:visible').slideUp();
					$a.siblings('ul').slideDown();
				}
			}
		}
		if ($(this).hasClass('menu-expand') || $a.attr('href') === '#') {
			e.preventDefault();
			return false;
		}
	});
	/*------- Category Menu end -------*/
	
})(jQuery);

