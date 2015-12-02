$(document).ready(function() {
    var header = $('header'),
        navToggleBtn = $('.nav-toggle'),
        mainNav = $('.main-nav'),
        navLink = $('.main-nav li'),
        Service = $('#service'),//各个容器主体获取
        Academy = $('#academy'),
        Club = $('#club'),
        organization = $('#organization'),
        graduate = $('#graduate');

    $(window).on('scroll', {
        previousTop: 0
    },
    function(event) {
        var currentTop = $(window).scrollTop();
        //判断滚动上下
        if (currentTop < this.previousTop) {
            if(currentTop > 0 && header.hasClass('fixed')){
                header.addClass('visible');
            } else{
                header.removeClass('visible fixed');
            }
        } else{
            header.removeClass('visible');
            if (currentTop > 41 && !header.hasClass('fixed')) {
                header.addClass('fixed')
            }
        }
        this.previousTop =currentTop;
    });;


//导航栏点击改变当前位置颜色并平滑跳转
    navLink.find('a').click(function(event) {
        navLink.find('a').removeClass('selected');
        $(this).addClass('selected');
        navToggleBtn.find('.nav-toggle-btn').toggleClass('open');
        mainNav.toggle('fast');
        mainNav.toggleClass('show');
        //平滑跳转
        var href = $(this).attr("href");
        var pos = $(href).offset().top;
        $("html,body").animate({
            scrollTop: pos
        }, 400);
    });

    autoHeight(Service);
    autoHeight(Academy);
    autoHeight(Club);
    autoHeight(organization);
    autoHeight(graduate);
//tab切换函数调用
    tabbarSwitch(Service);
    tabbarSwitch(Academy);
    tabbarSwitch(Club);
//导航按钮点击
    navToggleBtn.click(function(event) {
        navToggleBtn.find('.nav-toggle-btn').toggleClass('open');
        mainNav.toggle('fast');
        mainNav.toggleClass('show');//用来禁止触屏
    });

//导航栏显示时禁止屏幕滚动
    document.addEventListener("touchmove", function(event) {
        if(mainNav.hasClass('show')){
            event.preventDefault();
            event.stopPropagation();
        }
    }, false);
//tab栏切换函数
    function tabbarSwitch (container) {
        var tabSwitchBtn = container.find('.tab-bar li'),//tab切换栏按钮
            tabbody = container.find('.link-bar'),//tab切换主体
            Pos,showHeight;

        tabSwitchBtn.click(function(event) {
            Pos = $(this).index();
            tabSwitchBtn.removeClass('on');
            $(this).addClass('on');
            tabbody.removeClass('selected').eq(Pos).addClass('selected');

//容器高度自适应
            autoHeight(container);
        });
    }

    function autoHeight (container) {
        var showHeight = container.find('.link-bar.selected .links').height();
        container.height(showHeight+90);
    }

});