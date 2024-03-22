!(function ($) {
    "use strict";

    let vh = window.innerHeight * 0.01;
    let vw = window.innerWidth * 0.01;
    console.log(window.innerWidth);
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });

    // Toggle .header-scrolled
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    if ($(window).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
    }


    // Smooth scroll for the navigation menu and links with .scrollto classes
    var scrolltoOffset = $('#header').outerHeight() - 1;

    $(document).on('click', '.nav-menu a, .mobile-nav-menu a, .scrollto, .link-btn', function (e) {

        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                e.preventDefault();

                var scrollto = target.offset().top - scrolltoOffset;

                if ($(this).attr("href") == '#header') {
                    scrollto = 0;
                }

                $('html, body').animate({
                    scrollTop: scrollto
                }, 1000);

                if ($(this).parents('.nav-menu, .mobile-nav-menu').length) {
                    $('.nav-menu .active, .mobile-nav-menu .active').removeClass('active');
                    $(this).closest('li').addClass('active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle').toggleClass('toggle-active');
                    $('.mobile-nav-overly').fadeOut();
                }

                return false;
            }
        }
    });

    // Activate smooth scroll on page load with hash links in the url
    $(document).ready(function () {
        if (window.location.hash) {
            var initial_nav = window.location.hash;
            if ($(initial_nav).length) {
                var scrollto = $(initial_nav).offset().top - scrolltoOffset;
                $('html, body').animate({
                    scrollTop: scrollto
                }, 1000);
            }
        }
    });

    // Mobile Navigation
    $('body').prepend('<button type="button" class="mobile-nav-toggle"><span class="toggle-icon"><span></span><span></span><span></span></span></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function (e) {
        $('body').toggleClass('mobile-nav-active');
        $('.mobile-nav-toggle').toggleClass('toggle-active');
        $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav-menu .drop-down > a', function (e) {
        e.preventDefault();
        $(this).next().slideToggle(300);
        $(this).parent().toggleClass('active');
    });

    $(document).click(function (e) {
        var container = $("#mobile-nav, .mobile-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ($('body').hasClass('mobile-nav-active')) {
                $('body').removeClass('mobile-nav-active');
                $('.mobile-nav-toggle').toggleClass('toggle-active');
                $('.mobile-nav-overly').fadeOut();
            }
        }
    });


    /* pageLoad */
    $(window).on("load", function () {
        var loadDelay = 2000;
        var delayTime = 2400;
        if (window.matchMedia("(max-width: 768px)").matches) {
            loadDelay = 800;
            delayTime = 1000;
        }
        $('#loadLayer').delay(loadDelay).queue(function (next) {
            $(this).addClass("loadComplete");
        });
        $('.mainvisual').delay(delayTime).queue(function (next) {
            $(this).addClass("active");
            onLoadTrigger();
            EachTextAnimeControl();
        });
        $('.pageindex').delay(delayTime).queue(function (next) {
            $(this).addClass("active");
            onLoadTrigger();
            EachTextAnimeControl();
        });
        $('#loadLayer').delay(200).queue(function (next) {
            $(this).css('display', 'none');
            next();
        });
    });

    // $(window).on("load", function () {
    //     $('#loadLayer').css('display','none');
    //     $('.mainvisual').queue(function(next) {
    //       $(this).addClass("active");
    //       onLoadTrigger();
    //     });
    //     $('.pageindex').queue(function(next) {
    //       $(this).addClass("active");
    //       onLoadTrigger();
    //     });
    // });

    /* Trigger */

    // var triggerElement = $(".titleTrigger, .textTrigger");

    var triggerElement = $(".textTrigger");

    triggerElement.each(function () {
        var trigerContent = $(this).html();
        var trigerBox = '<span><span><span>' + trigerContent + '</span></span></span>';
        $(this).html(trigerBox);
    });

    function onLoadTrigger() {
        var windowHeight = $(window).height(),
            topWindow = $(window).scrollTop();
        $('.trigger').each(function () {
            var targetPosition = $(this).offset().top;
            //エージェント判定
            var ua = navigator.userAgent;
            if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
                // スマートフォン用コード
                if (topWindow > targetPosition - windowHeight + 50) {
                    $(this).addClass("active");
                    $(this).removeClass("standby");
                }
            } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
                // タブレット用コード
                if (topWindow > targetPosition - windowHeight + 50) {
                    $(this).addClass("active");
                    $(this).removeClass("standby");
                }
            } else {
                // PC用コード
                if (topWindow > targetPosition - windowHeight + 200) {
                    $(this).addClass("active");
                    $(this).removeClass("standby");
                }
            }
            //エージェント判定 end
        });
    }

    var element = $(".eachTextAnime");

    element.each(function () {
        var text = $(this).text();
        var textbox = "";
        text.split("").forEach(function (t, i) {
            if (t !== " ") {
                var n = i / 20;
                if( t == '^' ) {
                    textbox += '<br class="sp">';
                } else {
                    textbox += '<span style="animation-delay:' + n + 's;">' + t + "</span>";
                }
            } else {
                textbox += t;
            }
        });
        $(this).html(textbox);
    });

    function EachTextAnimeControl() {
        $(".eachTextAnime").each(function () {
            var elemPos = $(this).offset().top - 50;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll >= elemPos - windowHeight) {
                $(this).addClass("appeartext");
            }
        });
    }

    $(window).scroll(function () {
        onLoadTrigger();
        EachTextAnimeControl();
    });

    // Pointer CSS
    var userAgentB = window.navigator.userAgent.toLowerCase();

    if (userAgentB.indexOf('msie') != -1 || userAgentB.indexOf('trident') != -1 || userAgentB.indexOf('edge') != -1 || userAgentB.indexOf('chrome') != -1 || userAgentB.indexOf('firefox') != -1) {
        //Internet Explorer / Edge / Google Chrome / FireFox
        /* customPointer */
        //エージェント判定
        var ua = navigator.userAgent;
        if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
            // スマートフォン用コード
        } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
            // タブレット用コード
        } else {
            // PC用コード
            const $stalker = document.querySelector('.stalker');
            const $cursor = document.querySelector('.cursor');

            // Listeners
            document.body.addEventListener('mousemove', onMouseMove);

            // Move the cursor
            function onMouseMove(e) {
                TweenMax.to($stalker, 0.35, {
                    x: e.clientX,
                    y: e.clientY
                })
                TweenMax.to($cursor, 0.45, {
                    x: e.clientX,
                    y: e.clientY
                })
            }

            $("a,input,select,textarea,button,.mwform-checkbox-field-text,.mwform-radio-field-text").on({
                "mouseenter": function () {
                    $(".pointer").addClass("active");
                },
                "mouseleave": function () {
                    $(".pointer").removeClass("active");
                }
            });
        }

        //エージェント判定 end
    } else if (userAgentB.indexOf('safari') != -1) {
        //Safari
    } else if (userAgentB.indexOf('opera') != -1) {
        //Opera
    } else {
        //不明
    }


    // modal

    var $modal = $(".modal");

    $(document).on('click', '[data-toggle="modal"]', function (e) {
        var target = $(this).attr("href") ? $(this).attr("href") : $(this).attr("data-target");
        if (target.length !== 0 && $(document).has(target).length !== 0) {
            e.preventDefault();
            var $selecedModal = $(target);
            $('body').toggleClass('modal-open');
            $selecedModal.show();
            setTimeout(function () {
                $selecedModal.toggleClass('show');
            }, 100);
            return false;
        }
    });

    $(document).click(function (e) {
        var container = $(".modal .modal-content");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ($('body').hasClass('modal-open')) {
                $('body').removeClass('modal-open');
                $modal.removeClass('show');
                setTimeout(function () {
                    $modal.hide();
                }, 300);
            }
        }
    });

    $(document).on('click', '.modal .close, [data-dismiss="modal"]', function (e) {
        $('body').removeClass('modal-open');
        $modal.removeClass('show');
        setTimeout(function () {
            $modal.hide();
        }, 300);
    });

    // accordion jquery
    $('.accordion-answer:first').show();
    $('.accordion-question:first').addClass('expanded');

    $(document).on('click', '.accordion-question', function (e) {
        var answer = $(this).next();
        $('.accordion-answer').not(answer).slideUp(400);
        $('.accordion-question').not(this).removeClass('expanded');
        $(this).toggleClass('expanded');
        answer.slideToggle(400);
    });

    // swiper
    var mainvisualSwiper = new Swiper(".mainvisual-swiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
    });

    var worksSwiper = new Swiper(".works-list-swiper", {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 16,
        centeredSlides: true,
        watchSlidesProgress: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                spaceBetween: 30,
            },
        },
    });

    var voiceSwiper = new Swiper(".voice-list-swiper", {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 12,
        centeredSlides: true,
        watchSlidesProgress: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                spaceBetween: 20,
                slidesPerView: 3,
                centeredSlides: false,
            },
        },
    });

    var thumbsSwiper = new Swiper(".intro-thumbs-swiper", {
        loop: true,
        slidesPerView: 4,
        centeredSlides: false,
        watchSlidesProgress: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
                centeredSlides: false,
            },
            186: {
                slidesPerView: 'auto',
                spaceBetween: 16,
                centeredSlides: true,
            },
        },
    });

})(jQuery);