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
    $('.search').load("../html/header.html #search")
    $('.nav').load("../html/header.html #nav",function(){
        $('.manus').css({
            display: 'none'
        });
    });

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
    // 请求商品图标数据
    var xhr_brand_icon = new XMLHttpRequest();
    xhr_brand_icon.onload = function(){
        if(xhr_brand_icon.status == 200 || xhr_brand_icon.status == 304){
            var res =JSON.parse(xhr_brand_icon.responseText) ;
            // 店铺logo
            var aa = res.icon.map(function(item){
                return `<li>
                    <img src="${item.Imgurl}" type="${item.type}">
                    <a href="#">${item.type}</a>
                </li>`
            });

            // 店铺名称
            var bb = res.shop.map(function(item){
                return `<li>
                <a href="#">${item.shop}</a>
                </li>`
            });
            var cc = res.Price.map(function(item){
                return `<li><a href="#">${item.pri}</li>`;
            });
            // 将店铺logo写入页面
            $('<ul/>').addClass('clearfix barnd').html(aa).appendTo($('#barnd'));
             // 将店铺名称写入页面
            $('<ul/>').addClass('clearfix shop').html(bb).appendTo($('#shop'));
            $('<ul/>').addClass('clearfix price').html(cc).appendTo($('#price'));
        }
    }
    xhr_brand_icon.open('get','../api/brand_icon.php',true);
    xhr_brand_icon.send();

    // 品牌图标收起/展开
    $('.close1').on('click',function(){
        if( $(this).prev('.list_top_r').css("height")== '60px'){
            $(this).html('收起').prev('.list_top_r').css( 'height','100%').find('li').css("margin-bottom","0");
        }else{
            $(this).html('展开').prev('.list_top_r').css("height",'60px').find('li').css("margin-bottom","5px");
        }
    });

    // 店铺(收起/展开)
    $('.close2').on('click',function(){
        if( $(this).prev('.list_top_r').css("height")== '35px'){
            $(this).html('收起').prev('.list_top_r').css( 'height','100%').find('li');
        }else{
            $(this).html('展开').prev('.list_top_r').css("height",'35px').css("margin-top","15px").find('li');
        }
    });


    // 请求商品数据
    var pageNo = 1;
    var qty = 20;
    var xhr_goods = new XMLHttpRequest();
    xhr_goods.onload = function(){
        if(xhr_goods.status == 200 || xhr_goods.status == 304){
            var res =JSON.parse(xhr_goods.responseText);
           
            var list = res.data.map(function(item){ 
                var img= JSON.parse(item.Imgurl);
                // var aa = item.Imgurl
                return '<li><div class="Img"><img src="'+img[0]+'"/></div><div class="smallImg"><img src="'+img[0]+'"/></div><p class="goods_name">'+item.name+'</p><p class="goods_tit">'+item.title+'</p><span class="pri">￥'+item.price+'</span><del>'+item.consult+'</del><p class="shp">'+item.shop+'</p><div class="goods_btn"><button class="addCar"><i></i>加入购物车</button><button class="care"><i></i>关注商品</button></div></li>'
            }).join('');

            var $res = $('<ul/>').html(list)
            $('.goods_content').innerHTML = '';
            $('.goods_content').html($res)

            // 生成分页
            var page_len = Math.ceil(res.total/qty);
            $('.goods_pages').html('')
            $('.goods_nav_r').html('')
            var $ul = $('<ul/>');
            $ul.append($('<li/>').html('首页'))
            for(var i=0;i<page_len;i++){
                var $li = $('<li/>').html( i+1 );
                if(i+1 === pageNo){
                    $li.addClass('active');
                }

                $ul.append($li);
            }
            $ul.append($('<li/>').html('>'))
            $ul.append($('<li/>').html('尾页'))

            var $pa = $('<div/>').addClass('pa').html(`共<span>${page_len}</span>页<input type="text" />页<button>确定</button>`)

           
            // 将分页添加到页面
            $('.goods_pages').append($ul);
            $('.goods_pages').append($pa);
            var pa2 = `<p>共<span>${res.total}</span>个商品</p>
                            <div class="total"><span>${$('.goods_pages').find('.active').html()}</span>/<span>${page_len}</span>页</div>
                            <button class="pre">上一页</button>
                            <button class="next">下一页</button>`
            $('.goods_nav_r').html(pa2);
        }
    }
    xhr_goods.open("get",`../api/goods.php?pageNo=${pageNo}&qty=${qty}`,true);
    xhr_goods.send();

    $('.goods_pages').on('click','li',function(){
        pageNo = this.innerText*1;
        xhr_goods.open("get",`../api/goods.php?pageNo=${pageNo}&qty=${qty}`,true);
        xhr_goods.send();
    });

})(jQuery);