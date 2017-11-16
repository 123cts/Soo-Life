(function($){
        // 加载头部
    $('.header').load("../html/header.html #header",function(){
        // 头部移入效果
        // 创建节点
        var $li = $('.weixin').closest('li');
        $('<div/>').addClass('erweima wx').appendTo($li);
         $('<div/>').addClass('erweima wb').appendTo($li);
         // 微信移入移除效果
        $('.weixin').on('mouseover',function(){
            $('.wx').show();
        }).on('mouseout',function(){
            $('.wx').hide();
        });
        // 微博移入移除效果
        $('.weibo').on('mouseover',function(){
            $('.wb').show();
        }).on('mouseout',function(){
            $('.wb').hide();
        });

        // 头部右边
        $('#header_right').on("mouseover",'li',function(){
            var $show = $(this).find('.box')
            $show.css( {'width':'90px'})
            $show.css("display","block");
            $(this).siblings('li').find('.box').css("display","none"); 
        }).on('mouseout','li',function(){
             var $show = $(this).find('.box')
             $show.css("display","none");
        })
    });
    $('.search').load("../html/header.html #search",function(){
        $('.search_c').find('ul').remove();
        $('.search_r').html('').css('background',"url('../img/sprite.fw.png') -300px -175px no-repeat")
    })
    $(".footer").load("../html/footer.html #footer");
    $(".psn_bar").load("../html/header.html #psn_bar",function(){
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

     });
})(jQuery)