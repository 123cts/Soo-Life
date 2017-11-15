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

    var xhr_goods = new XMLHttpRequest();
    xhr_goods.onload = function(){
        if(xhr_goods.status == 200 || xhr_goods.status == 304){
            var res =JSON.parse(xhr_goods.responseText);
           

            var list = res.map(function(item){ 
                var img= JSON.parse(item.Imgurl);
                console.log(JSON.parse(item.Imgurl)[0]);
                // var aa = item.Imgurl
                return '<li><div class="Img"><img src="'+img[1]+'"/></div><div class="smallImg"><img src="'+img[0]+'"/></div><p class="goods_name">'+item.name+'</p><p class="goods_tit">'+item.title+'</p><span class="pri">￥'+item.price+'</span><del>'+item.consult+'</del><p class="shp">'+item.shop+'</p><div class="goods_btn"><button class="addCar"><i></i>加入购物车</button><button class="care"><i></i>关注商品</button></div></li>'
            });
            $('<ul/>').html(list).appendTo($('.goods_content'));
        }
    }
    xhr_goods.open("get",'../api/goods.php',true);
    xhr_goods.send();
})(jQuery);