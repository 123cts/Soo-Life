
require(['config'],function(){
    // 加载common.js
    require(['jquery','Carousel','index'],function(){
            //加载头部
    $('.header').load('html/header.html #header',function(){

        // 顶部(我的生活,帮助中心,导航更多)点击显示事件
        $('#header_right').on('click','li',function(e){
            var $show = $(this).find('.box')
            if($show.css("display")=="none"){ 
                $show.css({"display":"block","border-radius":"5px"});
                $(this).siblings('li').find('.box').css("display","none"); 
            }else{ 
                $show.css("display","none"); 
            } 
    });

    var url = location.search;
    var url_date = {};
    if(url){
    url = url.slice(1);
    // 拆分成数组
    url = url.split('&');
    // 遍历
    url.forEach(function(item){
        var url_arr = item.split('=');
            url_date[url_arr[0]] = decodeURI(url_arr[1])
        });
    }else{
        url = '';
    }
    $('.welcome span').html(url_date.name)
    });
    // 加载尾部
    $('.footer').load('html/footer.html');
    $('.search').load('html/header.html #search');
    // 加载菜单栏
    $('.nav').load('html/header.html #nav',function(){

        // 一级菜单点击隐藏
        $('.nav_left').find('h3').on('click',function(){
            $manus = $('.manus');
            if($manus.css('display')== "none"){
                $manus.css('display','block');
                $(this).find('i').addClass('icon-angle-up').removeClass('icon-arrow-down');
            }else{
                $manus.css('display','none');
                $(this).find('i').addClass('icon-arrow-down').removeClass('icon-angle-up');
            }
        });

        // 二级菜单hover
        $('.manus_show').on('mouseenter','li',function(){
            $(this).find('.manus_pannel').css("display",'block').animate({width:960});
        }).on('mouseleave','li',function(){
            $(this).find('.manus_pannel').css("display",'none').animate({width:0});
        });
    });
    $('.psn_bar').load('html/header.html #psn_bar',function(){

        // 右导航栏实现的动画
        $('.favicon').on('mouseover',function(){
            $(this).find('.fa_login').show();
        }).on('mouseout',function(){
            $(this).find('.fa_login').hide();
        });
        $('.icon').on('mouseenter','a',function(){
            $(this).next('span').stop().animate({right:35,opacity:1})
        }).on('mouseleave','a',function(){
             $(this).next('span').stop().animate({right:80,opacity:0});
        });
        // 获取滚动高度
        var to_top = document.querySelector('.to_top');
        window.onscroll = function(){
            var scrollTop = window.scrollY;

            if(scrollY > 500){
                to_top.style.display = 'block';
            }else{
                to_top.style.display = 'none';
            }

        }

        // 点击楼梯去到相对应的商品位置
        $('#stairs ul li').click(function(e) {
             $(document).scrollTop($('.louti .brand').eq($(this).index()).offset().top);  
             return false;
        });
        //返回顶部效果
        var timer;
        to_top.onclick = function(){
            clearInterval(timer);
            
            var btn_to_top = window.scrollY;

            timer = setInterval(function(){

                var speed = btn_to_top/10;

                btn_to_top -= speed;

                if(btn_to_top<=0 || speed<5){
                    clearInterval(timer);
                    btn_to_top = 0;
                }
                scrollTo(0,btn_to_top);
            }, 20);
        }

        // var car = document.querySelector('.cart');

        $('.cart a').on('click',function(){
            location.href="../html/car.html"
        })
    });
    // 实现轮播图效果
    $('#banner').Carousel({
        width:'100%',
        height:480,
        type:'ppt',
        buttons:false,
        imgs:["../img/banner1.jpg","../img/banner2.jpg","../img/banner3.jpg","../img/banner4.jpg","../img/banner5.jpg","../img/banner6.jpg","../img/banner7.jpg"]
    });
    });
});