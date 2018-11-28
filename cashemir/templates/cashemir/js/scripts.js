(function($) {
    function initCashemir() {
        // functions ------------------
        "use strict";
        var ino = jQuery('.navigation');
        var $tElems = jQuery('.inner a');
        var ct = jQuery('.inner a').length;
        var al = {
            queue: true,
            duration: 800,
            easing: "easeInOutQuad"
        };
        var bo = jQuery('.body-overlay');
        var $mem = jQuery('.member-box');
        var memlenght = jQuery('.member-box').length;
        var $project = jQuery('.box a');
        var projectlenght = jQuery('.box a').length;
        // popup gallery on single project
        jQuery('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            mainClass: 'my-mfp-zoom-in',
            tLoading: 'Loading image #%curr%...',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item.el.attr('title') + '<small>by ' + window.siteName + '</small>';
                }
            }
        });
        // show menu ------------------ 
        function showmenu() {
            jQuery(".nav-button").addClass('nav-rotade');
            ino.animate({
                "left": '0'
            }, al);
            ino.removeClass("isDown");
            bo.fadeIn();
            setTimeout(function() {
                for (var i = 0; i <= ct; i++) {
                    var cft = $tElems[i];
                    jQuery(cft).delay(150 * i).animate({
                        'opacity': '1',
                        left: '0'
                    }, al);
                }
            }, 100);
        }
        // hide menu ------------------
        function hidemenu() {
            jQuery(".nav-button").removeClass('nav-rotade');
            ino.animate({
                "left": '-200px'
            }, al);
            ino.addClass("isDown");
            bo.fadeOut();
            setTimeout(function() {
                for (var i = 0; i <= ct; i++) {
                    var cft = $tElems[i];
                    jQuery(cft).delay(150 * i).animate({
                        'opacity': '0',
                        left: '-25%'
                    }, al);
                }
            }, 100);
        }
        // team show ------------------
        function showmemberbox() {
            setTimeout(function() {
                for (var i = 0; i <= memlenght; i++) {
                    var memboxl = $mem[i];
                    jQuery(memboxl).delay(250 * i).animate({
                        'opacity': '1',
                        top: '0'
                    }, 1000);
                }
            }, 600);
        }
        // project show ------------------
        function showprojectbox() {
            setTimeout(function() {
                for (var i = 0; i <= projectlenght; i++) {
                    var projectb = $project[i];
                    jQuery(projectb).delay(250 * i).animate({
                        'opacity': '1',
                        top: '0'
                    }, 100);
                }
            }, 600);
        }
        // call menu ------------------
        jQuery(".nav-button").on('click', function() {
            if (jQuery('.navigation').hasClass("isDown")) {
                showmenu();
            } else {
                hidemenu();
            }
            return false;
        });


        if(jQuery('.sticky-holder').size() > 0){
            //alert('sticky-holder');
            var sticky_content = jQuery('.sticky-wrap').html();
            jQuery('.sticky-holder').html(sticky_content);
            jQuery('.sticky-wrap').remove();
            jQuery('.sticky-holder').addClass('sticky-wrap');
        }

        jQuery(document).on('click', '.nav-button-sticky', function() {
            console.log('.nav-button-sticky clicked');
            jQuery('.link-holder-sticky').slideToggle();
        });
        jQuery(window).resize(function() {
            jQuery(window).width();
            if (jQuery(window).width() > 959) {
                jQuery('.link-holder-sticky').show();
            } else {
                jQuery('.link-holder-sticky').hide();
            }
        });
        
        // counter ------------------
        function number(num, content, target, duration) {
            if (duration) {
                var count = 0;
                var speed = parseInt(duration / num);
                var interval = setInterval(function() {
                    if (count - 1 < num) {
                        target.html(count);
                    } else {
                        target.html(content);
                        clearInterval(interval);
                    }
                    count++;
                }, speed);
            } else {
                target.html(content);
            }
        }

        function stats(duration) {
            jQuery('.stats .num').each(function() {
                var container = jQuery(this);
                var num = container.attr('data-num');
                var content = container.attr('data-content');
                number(num, content, container, duration);
            });
        }
        // navigation links ------------------
        jQuery(".navigation-sticky").sticky({
            topSpacing: 0,
            className: 'sticky',
            wrapperClassName: 'main-menu-wrapper'
        });
        jQuery(".inner a.scroll-link").on('click', function(event) {
            event.preventDefault();
            var hash = jQuery(this).attr('href');
            // jQuery.scrollTo(hash, 950, {
            //     easing: 'swing',
            //     offset: 25,
            //     'axis': 'y'
            // });

            $("html,body").animate(
                {
                    scrollTop: $(hash).offset().top - 25
                }, 
                950,
                'swing'
            );


            setTimeout(function() {
                hidemenu();
            }, 900);
        });
        jQuery(".body-overlay").on('click', function() {
            hidemenu();
        });
        // Call plugins  ----------------------------------------
        //  superslides --------
        jQuery('.sup-slides').each(function() {
            var su_sl = jQuery(this);
            var optionsData = su_sl.data('options') ? JSON.parse(decodeURIComponent(su_sl.data('options'))) : {
                mode: 'fade',
                auto: 10000,
                pager: true
            };
            su_sl.superslides({
                animation: optionsData.mode,
                play: optionsData.auto,
                pagination: optionsData.pager,
            });
            su_sl.hammer().on('swipeleft', function() {
                jQuery(this).superslides('animate', 'next');
            });
            su_sl.hammer().on('swiperight', function() {
                jQuery(this).superslides('animate', 'prev');
            });
        });
        //  scroll nav --------
        jQuery('#nav').onePageNav({
            currentClass: 'current',
            changeHash: false,
            scrollSpeed: 750,
            scrollOffset: 30,
            scrollThreshold: 0.5,
            filter: '',
            easing: 'swing',
        });
        // owlCarousel  --------
        jQuery('.azp_owlcarousel').each(function() {
            var owl_sl = jQuery(this);
            var optionsData = owl_sl.data('options') ? JSON.parse(decodeURIComponent(owl_sl.data('options'))) : {
                transitionStyle: false,
                slideSpeed: 200,
                rewindSpeed: 1000,
                singleItem: false,
                autoPlay: false,
                pagination: true,
                paginationSpeed: 800,
                navigation: false,
                autoHeight: false,
                mouseDrag: true,
                touchDrag: true,
            };
            owl_sl.owlCarousel({
                slideSpeed: optionsData.slideSpeed,
                rewindSpeed: optionsData.rewindSpeed,
                items: optionsData.items,
                singleItem: optionsData.singleItem,
                autoPlay: optionsData.autoPlay,
                pagination: optionsData.pagination,
                paginationSpeed: optionsData.paginationSpeed,
                navigation: optionsData.navigation,
                // goToFirstSpeed : optionsData.goToFirstSpeed,
                autoHeight: optionsData.autoHeight,
                mouseDrag: optionsData.mouseDrag,
                touchDrag: optionsData.touchDrag,
                transitionStyle: optionsData.transitionStyle
            });
        });
        jQuery("#client-carusel").owlCarousel({        
            navigation : false,
            pagination:false,  
            slideSpeed : 300,
            paginationSpeed : 400,
            items : 4,            
        }); 
        jQuery('.about-slider').each(function() {
            var ab_sl = jQuery(this);
            var optionsData = ab_sl.data('options') ? JSON.parse(decodeURIComponent(ab_sl.data('options'))) : {
                transitionStyle: "goDown",
                slideSpeed: 200,
                rewindSpeed: 1000,
                singleItem: true,
                autoPlay: false,
                pagination: false,
                paginationSpeed: 1000,
                navigation: false,
                autoHeight: true,
                mouseDrag: false,
                touchDrag: false,
            };
            ab_sl.owlCarousel({
                slideSpeed: optionsData.slideSpeed,
                rewindSpeed: optionsData.rewindSpeed,
                items: optionsData.items,
                singleItem: optionsData.singleItem,
                autoPlay: optionsData.autoPlay,
                pagination: optionsData.pagination,
                paginationSpeed: optionsData.paginationSpeed,
                navigation: optionsData.navigation,
                // goToFirstSpeed : optionsData.goToFirstSpeed,
                autoHeight: optionsData.autoHeight,
                mouseDrag: optionsData.mouseDrag,
                touchDrag: optionsData.touchDrag,
                transitionStyle: optionsData.transitionStyle,
                goToFirstSpeed: 2000,
            });
            // about animation  --------
            ab_sl.find(".next-slide, .close").click(function() {
                var ww = jQuery(window).width();
                ab_sl.trigger('owl.next');
                if (ww < 959) {
                    setTimeout(function() {
                        // jQuery('html').scrollTo('#about h2', 800, {
                        //     'axis': 'y'
                        // });
                        $("html,body").animate(
                            {
                                scrollTop: $('#about h2').offset().top
                            }, 
                            800
                        );
                    }, 600);
                }
            });
            ab_sl.find('.lanch-sklills').click(function() {
                setTimeout(function() {
                    ab_sl.find('.skillbar').each(function() {
                        jQuery(this).find('.skillbar-bar').animate({
                            width: jQuery(this).attr('data-percent')
                        }, 3000);
                    });
                }, 1500);
            });
        });
        // flexslider  --------
        jQuery('.serviseslider').each(function() {
            var sl = jQuery(this),
                optionsData = sl.data('options') ? JSON.parse(decodeURIComponent(sl.data('options'))) : {
                    startAt: 1,
                    animation: 'slide',
                    direction: 'horizontal'
                };
            sl.flexslider({
                animation: optionsData.animation,
                direction: optionsData.direction,
                smoothHeight: true,
                slideshow: false,
                controlNav: false,
                directionNav: false,
                startAt: optionsData.startAt,
                start: function(slider) {
                    sl.closest('.cas_services-slider').find('a.animbox').click(function() {
                        var slideTo = jQuery(this).attr("name")
                        var slideToInt = parseInt(slideTo)
                        var ww = jQuery(window).width();
                        if (slider.currentSlide != slideToInt) {
                            slider.flexAnimate(slideToInt)
                        }
                        if (ww < 959) {
                            $("html,body").animate({
                                scrollTop: sl.offset().top - 100
                            }, {
                                queue: false,
                                duration: 800,
                                //easing: "easeInOutExpo"
                            });

                            // var ser_top = sl.scrollTop();
                            // console.log(ser_top)
                            // setTimeout(function() {
                            //     jQuery('html').scrollTo(ser_top, 800, {
                            //         'axis': 'y'
                            //     });
                            // }, 600);
                        }
                    });
                }
            });
        });
        // new in resume
        jQuery('.resume-slider').flexslider({
            animation: "slide",
            slideDirection: "horizontal",
            slideshow: false,
            slideshowSpeed: 3500,
            animationDuration: 500,
            directionNav: true,
            controlNav: false,
        });
        jQuery('.image-popup').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-img-mobile',
            image: {
                verticalFit: true
            }
        });
        // en new in resume
        jQuery('.single-media').flexslider({
            animation: "slide",
            slideDirection: "horizontal",
            slideshow: false,
            slideshowSpeed: 3500,
            animationDuration: 500,
            directionNav: true,
            controlNav: false,
        });
        jQuery('.service_box').click(function() {
            jQuery('.service_box').removeClass('actser');
            jQuery(this).addClass('actser');
        });
        jQuery('#options li').click(function() {
            jQuery('#options li').removeClass('actcat');
            jQuery(this).addClass('actcat');
        });
        jQuery('.flexslider').flexslider({
            animation: "slide",
            slideDirection: "horizontal",
            slideshow: false,
            slideshowSpeed: 3500,
            animationDuration: 500,
            directionNav: true,
            controlNav: true,
        });
        // Scroll animation   ----------------------------------------
        jQuery('.animaper').appear();
        jQuery(document.body).on('appear', '.present-block', function() {
            jQuery(this).each(function() {
                setTimeout(function() {
                    jQuery('.present-block').animate({
                        opacity: '1',
                        top: '0'
                    }, {
                        queue: true,
                        duration: 1200
                    });
                }, 600);
            });
        });
        jQuery(document.body).on('appear', '#team', function() {
            jQuery(this).each(function() {
                showmemberbox();
            });
        });
        jQuery(document.body).on('appear', '.service_box', function() {
            jQuery(this).each(function() {
                jQuery('.service_box').animate({
                    opacity: '1',
                    top: '0'
                }, {
                    queue: true,
                    duration: 1200
                });
            });
        });
        jQuery(document.body).on('appear', '#folio_container', function() {
            jQuery(this).each(function() {
                showprojectbox();
            });
        });
        // new in resume
        jQuery(document.body).on('appear', '.resume-line', function() {
            jQuery(this).each(function() {
                jQuery('.resume-line').animate({
                    height: '100%'
                }, {
                    queue: true,
                    duration: 3200
                });
            });
        });
        jQuery(document.body).on('appear', '.resume-box', function() {
            jQuery(this).each(function() {
                setTimeout(function() {
                    jQuery('.resume-box').animate({
                        opacity: '1',
                        top: '0'
                    }, {
                        queue: true,
                        duration: 1200
                    });
                }, 800);
            });
        });
        // end new in resume    
        jQuery(document.body).on('appear', '.smallicon', function() {
            jQuery(this).each(function() {
                setTimeout(function() {
                    jQuery('.smallicon').animate({
                        opacity: '0.8',
                        top: '0'
                    }, {
                        queue: true,
                        duration: 1200
                    });
                }, 200);
            });
        });
        var $i = 1;
        jQuery(document.body).on('appear', '.stats', function(e) {
            if ($i === 1) {
                stats(2600);
            }
            $i++;
            jQuery('.num').addClass('norotade');
        });
        //  Mixitup  ------
        jQuery('#folio_container').mixitup({
            targetSelector: '.box',
            effects: ['fade', 'rotateZ', 'rotateX', 'rotateY'],
            easing: 'windback',
            transitionSpeed: 1200,
        });
        // Scroll to  --------
        jQuery('.to-top, .logo').click(function() {
            // jQuery('html').scrollTo('.simple-page-head, .top-anchor ,#topSlide', 1500, {
            //     'axis': 'y'
            // });
            $("html,body").animate(
                {
                    scrollTop: $('.simple-page-head, .top-anchor ,#topSlide').offset().top
                }, 
                1500
            );
            hidemenu();
        });
        jQuery('.start').click(function(event) {
            event.preventDefault();
            // jQuery('html').scrollTo('#about', 1500, {
            //     'axis': 'y'
            // });
            $("html,body").animate(
                {
                    scrollTop: $('#about').offset().top
                }, 
                1500
            );
        });
        jQuery('.actform').click(function() {
            jQuery('.contactForm').slideToggle(1000);
            setTimeout(function() {
                // jQuery('html').scrollTo('.to-top', 1000, {
                //     'axis': 'y'
                // });
                $("html,body").animate(
                    {
                        scrollTop: $('.to-top').offset().top
                    }, 
                    1000
                );
            }, 800);
        });
        jQuery('.showmap').click(function() {
            if (jQuery(this).hasClass('mnv')) {
                jQuery('.mapbox').animate({
                    "height": '450px'
                }, {
                    queue: false,
                    duration: 700,
                    easing: "easeInOutQuad"
                });
                setTimeout(function() {
                    // jQuery('html').scrollTo('.mapbox', 1000, {
                    //     'axis': 'y'
                    // });
                    $("html,body").animate(
                        {
                            scrollTop: $('.mapbox').offset().top
                        }, 
                        1000
                    );
                }, 800);
                jQuery(this).removeClass('mnv');
            } else {
                jQuery(this).addClass('mnv');
                jQuery('.mapbox').animate({
                    "height": '0'
                }, {
                    queue: false,
                    duration: 700,
                    easing: "easeInOutQuad"
                });
            }
        });
        jQuery('.close-map').click(function() {
            jQuery('.showmap').addClass('mnv');
            jQuery('.mapbox').animate({
                "height": '0'
            }, {
                queue: false,
                duration: 700,
                easing: "easeInOutQuad"
            });
        }); 


        

    };
    // Ajax portfolio   ----------------------------------------
    function initPortfolio() {
        "use strict";
        var window_height = jQuery(window).height(),
            current,
            next,
            prev,
            target,
            hash,
            url,
            page,
            title,
            projectIndex,
            scrollPostition,
            projectLength,
            ajaxLoading = false,
            wrapperHeight,
            pageRefresh = true,
            content = false,
            loader = jQuery('div#loader'),
            portfolioGrid = jQuery('#folio_container'),
            projectContainer = jQuery('div#ajax-content-inner'),
            projectNav = jQuery('#project-navigation ul'),
            exitProject = jQuery('div#closeProject a'),
            easing = 'easeOutExpo',
            //folderName ='projects';
            folderName = window.baseUrl //'/devcashemir/index.php'
        jQuery(window).on('hashchange', function() {
            hash = jQuery(window.location).attr('hash');
            var root = '#!' + folderName + '/';
            var rootLength = root.length;
            if (hash.substr(0, rootLength) != root) {
                return;
            } else {
                var correction = 50;
                var headerH = jQuery('#portfolio h2').outerHeight() + correction;
                hash = jQuery(window.location).attr('hash');
                url = hash.replace(/[#\!]/g, '');
                portfolioGrid.find('li.box.current').children().removeClass('act');
                portfolioGrid.find('li.box.current').removeClass('cur');
                if (pageRefresh == true && hash.substr(1, rootLength) == root) {
                    // jQuery('html').scrollTo('#portfolio h2', 1500, {
                    //     'axis': 'y'
                    // }, function() {
                    //     loadProject();
                    // });
                    $("html,body").animate(
                        {
                            scrollTop: $('#portfolio h2').offset().top
                        }, 
                        1500,
                        'swing',
                        function(){
                            loadProject();
                        }
                    );
                } else if (pageRefresh == false && hash.substr(0, rootLength) == root) {
                    jQuery('html,body').stop().animate({
                        scrollTop: (projectContainer.offset().top - headerH) + 'px'
                    }, 800, 'easeOutExpo', function() {
                        if (content == false) {
                            loadProject();
                        } else {
                            projectContainer.animate({
                                opacity: 0,
                                height: wrapperHeight
                            }, function() {
                                loadProject();
                            });
                        }
                        projectNav.fadeOut('100');
                        exitProject.fadeOut('100');
                    });
                } else if (hash == '' && pageRefresh == false || hash.substr(0, rootLength) != root && pageRefresh == false || hash.substr(0, rootLength) != root && pageRefresh == true) {
                    scrollPostition = hash;
                    console.log(scrollPostition);
                    jQuery('html,body').stop().animate({
                        scrollTop: scrollPostition + 'px'
                    }, 1000, function() {
                        deleteProject();
                    });
                }
                portfolioGrid.find('li.box a[href="#!' + url + '"]').parent().addClass('cur');
                portfolioGrid.find('li.box.cur').find('a').addClass('act');
            }
        });

        function loadProject() {
            loader.fadeIn();
            if (!ajaxLoading) {
                ajaxLoading = true;
                projectContainer.load(url + ' div#ajaxpage', function(xhr, statusText, request) {
                    if (statusText == "success") {
                        ajaxLoading = false;
                        page = jQuery('div#ajaxpage');
                        jQuery('.flexslider').flexslider({
                            animation: "slide",
                            slideDirection: "horizontal",
                            slideshow: false,
                            slideshowSpeed: 3500,
                            animationDuration: 500,
                            directionNav: true,
                            controlNav: true,
                        });
                        jQuery('.popup-gallery').magnificPopup({
                            delegate: 'a',
                            type: 'image',
                            mainClass: 'my-mfp-zoom-in',
                            tLoading: 'Loading image #%curr%...',
                            gallery: {
                                enabled: true,
                                navigateByImgClick: true,
                                preload: [0, 1]
                            },
                            image: {
                                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                                titleSrc: function(item) {
                                    return item.el.attr('title') + '<small>by ' + window.siteName + '</small>';
                                }
                            }
                        });
                        hideLoader();
                        jQuery(".container").fitVids();
                        // new for azura v3

                        var CashemirAzuraGallery={initialize:function(){this.imageStyle(),this.initGallery()},imageStyle:function(){$(".img-wrapper").each(function(){var a=$("img",this).height(),e=$(".capZoomIn",this),o=$(".capZoomInDown",this),t=$(".capRollIn",this),l=$(".capRotateIn",this),s=$(".capBounceOut",this);$(".capZoomIn, .capZoomInDown, .capRollIn, .capRotateIn, .capBounceOut",this).css("height",a+"px"),$(".img-caption").addClass("animated"),e.addClass("zoomOut"),o.addClass("zoomOutDown"),t.addClass("rollOut"),l.addClass("rotateOut"),s.addClass("bounceOut"),$(this).on("mouseenter",function(){return e.addClass("zoomIn"),e.removeClass("zoomOut"),o.addClass("zoomInDown"),o.removeClass("zoomOutDown"),t.addClass("rollIn"),t.removeClass("rollOut"),l.addClass("rotateIn"),l.removeClass("rotateOut"),s.addClass("bounceIn"),s.removeClass("bounceOut"),!1}),$(this).on("mouseleave",function(){return e.addClass("zoomOut"),e.removeClass("zoomIn"),o.addClass("zoomOutDown"),o.removeClass("zoomInDown"),t.addClass("rollOut"),t.removeClass("rollIn"),l.addClass("rotateOut"),l.removeClass("rotateIn"),s.addClass("bounceOut"),s.removeClass("bounceIn"),!1})})},initGallery:function(){($(".azp_images_gallery_wrap").length||$(".azp_articles-grid-wrap").length)&&$(".azp_images_gallery_wrap, .azp_articles-grid-wrap").each(function(){var a=$(this).find(".azp_filter-items li:first-child a").attr("data-filter"),e=$(this).find(".azp_gallery-items").isotope({itemSelector:".azp_grid-item",percentPosition:!0,masonry:{columnWidth:".azp_grid-sizer"},filter:a});e.imagesLoaded(function(){e.isotope("layout")}),$(".azp_filter-items li a").on("click",function(a){a.preventDefault();var o=$(this).attr("data-filter");e.isotope({filter:o}),$(".azp_filter-items  li a").removeClass("active"),$(this).addClass("active")});var o=$(window),t=!1,l=0;o.scroll(function(){if($(".gallery-load-more").length){if(console.log("scroll"),$(".gallery-load-more").scrollTop())var a=$(".gallery-load-more").scrollTop();else var s=$(".gallery-load-more").offset(),a=s.top;if(o.scrollTop()>=a-o.height()+l&&!t){t=!0;var i=jQuery(".gallery-load-more"),r=i.attr("data-click")?i.attr("data-click"):1,n=i.attr("data-remain")?i.attr("data-remain"):"no";if("yes"==n){var d=i.closest(".azp_gallery-items-holder").children(".azp_gallery-items"),c=window.azuraUrl+"index.php?option=com_azurapagebuilder&task="+d.data("lm-task")+"&"+d.data("lm-token")+"=1",m=d.data("lm-settings")?d.data("lm-settings"):{lmore_items:3,images:"",loaded:10};i.closest(".gallery-lmore-holder").css("visibility","visible");var u={settings:m,click_num:r};console.log(c),console.log(u),$.ajax({type:"POST",data:u,url:c,success:function(a){console.log(a),i.closest(".gallery-lmore-holder").css("visibility","hidden"),"fail"==a.status?(i.attr("data-remain","no"),i.closest(".gallery-lmore-holder").remove()):"success"==a.status&&(e.isotope(),e.isotope("insert",$(a.content)),e.imagesLoaded(function(){e.isotope("layout")}),setTimeout(function(){AzuraGallery.imageStyle()},500),"no"==a.is_remaining&&(i.attr("data-remain","no"),i.closest(".gallery-lmore-holder").remove())),i.attr("data-click",++r),t=!1},error:function(a,e,o){console.log(a),console.log(e),console.log(o)},dataType:"json"})}}}})})}};CashemirAzuraGallery.initialize();


                        $('.azp_gallery-popup').each(function(){
                            $(this).magnificPopup({
                                delegate: 'a.image_popup_a', // child items selector, by clicking on it popup will open
                                type: 'image',
                                // other options
                                gallery:{
                                    enabled:true
                                },
                                
                            });
                        });


                    }
                });
            }
        }

        function hideLoader() {
            loader.fadeOut('fast', function() {
                showProject();
            });
        }

        function showProject() {
            if (content == false) {
                wrapperHeight = projectContainer.children('div#ajaxpage').outerHeight() + 'px';
                projectContainer.animate({
                    opacity: 1,
                    height: wrapperHeight
                }, function() {
                    jQuery(".container").fitVids();
                    scrollPostition = jQuery('html,body').scrollTop();
                    projectNav.fadeIn();
                    exitProject.fadeIn();
                    content = true;
                });
            } else {
                wrapperHeight = projectContainer.children('div#ajaxpage').outerHeight() + 'px';
                projectContainer.animate({
                    opacity: 1,
                    height: wrapperHeight
                }, function() {
                    jQuery(".container").fitVids();
                    scrollPostition = jQuery('html,body').scrollTop();
                    projectNav.fadeIn();
                    exitProject.fadeIn();
                });
            }
            projectIndex = portfolioGrid.find('li.box.cur').index();
            projectLength = jQuery('li.box a').length - 1;
            if (projectIndex == projectLength) {
                jQuery('ul li#nextProject a').addClass('disabled');
                jQuery('ul li#prevProject a').removeClass('disabled');
            } else if (projectIndex == 0) {
                jQuery('ul li#prevProject a').addClass('disabled');
                jQuery('ul li#nextProject a').removeClass('disabled');
            } else {
                jQuery('ul li#nextProject a,ul li#prevProject a').removeClass('disabled');
            }
        }

        function deleteProject(closeURL) {
            projectNav.fadeOut(100);
            exitProject.fadeOut(100);
            projectContainer.animate({
                opacity: 0,
                height: '0px'
            });
            if (typeof closeURL != 'undefined' && closeURL != '') {
                projectContainer.find('iframe').remove();
                location = '#_';
            }
            portfolioGrid.find('li.box.current').children().removeClass('act');
            portfolioGrid.find('li.box.current').removeClass('cur');
        }
        jQuery('#nextProject a').on('click', function() {
            current = portfolioGrid.find('li.box.cur');
            next = current.next('li.box');
            target = jQuery(next).children('a').attr('href');
            jQuery(this).attr('href', target);
            if (next.length === 0) {
                return false;
            }
            current.removeClass('cur');
            current.children().removeClass('act');
            next.addClass('cur');
            next.children().addClass('act');
        });
        jQuery('#prevProject a').on('click', function() {
            current = portfolioGrid.find('li.box.cur');
            prev = current.prev('li.box');
            target = jQuery(prev).children('a').attr('href');
            jQuery(this).attr('href', target);
            if (prev.length === 0) {
                return false;
            }
            current.removeClass('cur');
            current.children().removeClass('act');
            prev.addClass('cur');
            prev.children().addClass('act');
        });
        jQuery('#closeProject a').on('click', function() {
            // jQuery('html').scrollTo('#portfolio h2', 1500, {
            //     'axis': 'y'
            // });
            $("html,body").animate(
                {
                    scrollTop: $('#portfolio h2').offset().top
                }, 
                1500
            );
            deleteProject(jQuery(this).attr('href'));
            portfolioGrid.find('li.box.cur').children().removeClass('act');
            loader.fadeOut();
            return false;
        });
        pageRefresh = false;
    };
    jQuery(window).load(function() {
        jQuery(window).trigger('hashchange');
    });
    jQuery(document).ready(function() {
        initPortfolio();
        initCashemir();
    });
    //  definition of mobile browser------------------
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    // if not mobile ------------------     
    trueMobile = isMobile.any();
    if (trueMobile == null) {
        // parallax  --------   
        jQuery('#servises').parallax("50%", 0.4);
        jQuery('#facts').parallax("70%", 0.3);
        jQuery('#subscribe').parallax("80%", 0.2);
        jQuery('.simple-page-head').parallax("50%", 0.4);
        // hoverdir --------
        jQuery(' #folio_container > li ').each(function() {
            jQuery(this).hoverdir();
        });
        // lavaLamp --------
        jQuery("#options ul").lavaLamp({
            fx: "easeOutElastic",
            speed: 700,
        });
        // Hover animation   ---    
        jQuery('.box a').hover(function() {
            jQuery(this).find('img').addClass('img-rotade');
        }, function() {
            jQuery(this).find('img').removeClass('img-rotade');
        });
        jQuery('.planContainer .button').hover(function() {
            jQuery(this).parent('.planContainer').addClass('bc');
        }, function() {
            jQuery(this).parent('.planContainer').removeClass('bc');
        });
        jQuery('.moreinfo').hover(function() {
            var cursl = jQuery(this);
            var th = jQuery(this).find('div.member-skils');
            if (jQuery(this).hasClass("notvisible")) {
                th.stop(true, true).animate({
                    'top': '0'
                }, {
                    queue: true,
                    duration: 700,
                    easing: "easeInOutQuad"
                });
                cursl.removeClass('notvisible');
                setTimeout(function() {
                    cursl.find('div.skillbar-member').each(function() {
                        jQuery(this).find('.skillbar-bar-member').animate({
                            width: jQuery(this).attr('data-percent')
                        }, 1000);
                    });
                }, 500);
            } else {
                th.animate({
                    'top': '100%'
                });
                cursl.addClass('notvisible');
                cursl.find('div.skillbar-member').each(function() {
                    jQuery(this).find('.skillbar-bar-member').animate({
                        width: 0
                    }, 1);
                });
            }
            return false;
        });
    }
    if (trueMobile) {
        // team info for touch devices  --------
        jQuery('.moreinfo').click(function() {
            var cursl = jQuery(this);
            var th = jQuery(this).find('div.member-skils');
            if (jQuery(this).hasClass("notvisible")) {
                th.stop(true, true).animate({
                    'top': '0'
                }, {
                    queue: true,
                    duration: 700,
                    easing: "easeInOutQuad"
                });
                cursl.removeClass('notvisible');
                setTimeout(function() {
                    cursl.find('div.skillbar-member').each(function() {
                        jQuery(this).find('.skillbar-bar-member').animate({
                            width: jQuery(this).attr('data-percent')
                        }, 1200);
                    });
                }, 500);
            } else {
                th.animate({
                    'top': '100%'
                });
                cursl.addClass('notvisible');
                cursl.find('div.skillbar-member').each(function() {
                    jQuery(this).find('.skillbar-bar-member').animate({
                        width: 0
                    }, 10);
                });
            }
            return false;
        });
    }
   
})(jQuery);

