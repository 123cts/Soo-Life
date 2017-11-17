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

    // 获取传递过来的参数
    // 截取url里的id值
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

    // 将的到的id查找对应的商品数据
    // 创建异步请求
    var xhr_good_id = new XMLHttpRequest();
    // 处理数据
    xhr_good_id.onload = function(){
        if(xhr_good_id.status == 200 || xhr_good_id.status == 304){
            var res =JSON.parse(xhr_good_id.responseText);
            var img= JSON.parse(res.data[0].Imgurl);
            // 商品所属店铺
            $('.daohang').html(`如此生活>${res.data[0].shop}>${res.data[0].name}`);

            // 商品大图
            $('.bigImg').find('img').attr({'src':img[0]})

            // 商品小图
            var aa = img.map(function(item){
                return `<li><img src ="${item}" /></li>`;
            });

            // 商品小图
            $('.smallImg').html(aa);

            // 商品id
            $('.prd_id').html('商品编号: '+res.data[0].id);
            // 商品名称
            $('.detail').find('h3').html(res.data[0].name);

            // 商品价格
            $('.cost').find('h4').html(`<span>￥${res.data[0].price}</span>  如此生活价`)

            // 参考价
            $('.cankao').html(`(参考价￥<del>${res.data[0].consult}</del>)`);

            // 颜色
            var color= JSON.parse(res.data[0].color);
            var Color = color.map(function(item){
                return `<li>${item}</li>`;
            });
            $('.color').html(Color);

            // 大小
            var size= JSON.parse(res.data[0].size);
            var Size = size.map(function(item){
                return `<li>${item}</li>`;
            });

            $('.size').html(Size);
            $('#size').html(size);
            // 数量
            $('.total').html(res.data[0].total)
            // 店铺信息
            $('.shopLogo').find('img').attr({'src':res.data[0].shop_icon});
            console.log(res.data[0].shop_icon)

            $('.ship_name').html(res.data[0].name);
            // 店铺名称
            $('.dianpu').html(res.data[0].shop);
            // 商品详细图片
            $('#Detail_img').find('img').attr({'src':res.data[0].details});
        }
    }
    xhr_good_id.open('get',`../api/goods.php?id=${url_date.id}`,true);
    xhr_good_id.send();

})(jQuery)