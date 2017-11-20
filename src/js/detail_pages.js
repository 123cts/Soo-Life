require(['config'],function(){
    // 加载common.js
    require(['common','jquery','Zoom','detail_pages'],function(){
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
            });
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
            $('.cart').on('click',function(){
                $('.buyCar').css({
                    display: 'block'
            });
        })
  

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
            $('.bigImg').find('img').attr({'src':img[0],'data-big':img[0]})

            // 商品小图
            var aa = img.map(function(item){
                return `<li><img src ="${item}" /></li>`;
            });

            // 商品小图
            $('.smallImg').html(aa);

            // 高亮第一张小图
            $('.smallImg').find('li').eq(idx).addClass('atv')
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
            ;
            var Color = color.map(function(item){
                // item[0].addClass('Atv')
                console.log(item)
                return `<li>${item}</li>`;
            });
            $('.color').html(Color);

            $('.color').find('li').eq(0).addClass('Atv')

            // 大小
            var size= JSON.parse(res.data[0].size);
            var Size = size.map(function(item){
                return `<li>${item}</li>`;
            });

            $('.size').html(Size);
            $('#size').html(size);
            $('.size').find('li').eq(0).attr({
                class: 'Atv'
            })
            // 数量
            $('.total').html(res.data[0].total)
            // 店铺信息
            $('.shopLogo').find('img').attr({'src':res.data[0].shop_icon});
            // console.log(res.data[0].shop_icon)

            $('.ship_name').html(res.data[0].name);
            // 店铺名称
            $('.dianpu').html(res.data[0].shop);
            // 商品详细图片
            $('#Detail_img').find('img').attr({'src':res.data[0].details});
          
            // 放大镜
            $('.bigImg').Zoom();
            
        }
    }
    xhr_good_id.open('get',`../api/goods.php?id=${url_date.id}`,true);
    xhr_good_id.send();

    var idx = 0;

    // 点击切换图片
    $('.smallImg').on('click','li',function(){
        idx = $(this).index();
        
        // 高亮当前li
        $('.smallImg').find('li').eq(idx).addClass('atv').siblings('li').removeClass('atv');
        // 切换图片
        $('.bigImg').find('img').attr({
            'src':$(this).find('img').attr('src')
        });
    });
    
    $('#pre').on('click',function(){
       idx--;
       if(idx<0){
         idx = $('.smallImg').find('li').length-1;
       }
        $('.smallImg').find('li').eq(idx).addClass('atv').siblings('li').removeClass('atv');
         $('.bigImg').find('img').attr({
            'src':$('.smallImg').find('li').eq(idx).find('img').attr('src')
        });
    });

    $('#next').on('click',function(){
        idx++;
       if(idx>$('.smallImg').find('li').length-1){
         idx = 0
       }
        $('.smallImg').find('li').eq(idx).addClass('atv').siblings('li').removeClass('atv');
            $('.bigImg').find('img').attr({
            'src':$('.smallImg').find('li').eq(idx).find('img').attr('src')
        });
    });

    // 关闭购物车
    $('.closeCar').on('click',function(){
        $('.buyCar').css({
            display: 'none'
        });
    });
    // 加
    $('.sub').on('click',function(){
        if($('.total').html()<2){
            $('.total').html(2);
        }
        $('.total').html( $('.total').html()*1-1);
    });
    // 减
    $('.add').on('click',function(){
        $('.total').html( $('.total').html()*1+1);
    })
    var $charList = $('.char');
    var $add_car = $('.add_car');

    // cookies
    var goodslist = Cookie.get('goodslist');
    if(!goodslist){
        goodslist = [];
    }else{
        goodslist = JSON.parse(goodslist);
    }
    $add_car.on('click',function(){
        // 找该商品的图片
        var $img = $('.bigImg').find('img');
        // 复制图片
        var $cloneImg = $img.clone();

        // 给复制图片设置样式
        $cloneImg.css({
            position:'absolute',
            top:$add_car.offset().top+30,
            left:$add_car.offset().left-20,
            width:'60px',
            height:'60px',
            'border-radius':'50%',
            border:'2px solid #F3A500'
        })
        // 把图片写入页面
        $cloneImg.appendTo('body');

        // 飞入购物车(动画)
        $cloneImg.animate({
            left:$('.cart').offset().left-300,
            top:$('.cart').offset().top-30
        }, 1000).animate({
            left:$('.cart').offset().left-30,
            top:$('.cart').offset().top+10
        }, 1000,function(){
            //删除复制的图片
            $cloneImg.remove();

             var Name = $('.detail').find('h3').html();
             var Total = $('.total').html();
             var Price = $('.cost').find('h4 span').html();
             var Img = $('.bigImg').find('img').attr('src');
             var COLOR = $('.color').find('.Atv').html()
             var SIZE = $('.size').find('.Atv').html();
             // 获取当前商品id
            var gid= url_date.id;
            var currentIdx;

             // 判断当前商品是否已存在
            var res = goodslist.some(function(goods,idx){
                currentIdx = idx;
                return goods.gid == gid;
            });

            if(res){
                // 如果商品已经存在，则数量+1
                goodslist[currentIdx].qty++;
                // console.log( $('#count'))
                $('#count').html(goodslist[currentIdx].qty);
            }else{
                // 否则添加商品
                var goods = {
                    gid:gid,
                    qty:1,
                    imgurl:Img,
                    name:Name,
                    price:Price,
                    color:COLOR,
                    size:SIZE
                }

                // 把当前商品添加到数组中
                goodslist.push(goods);

                // var goodslist=Cookie.get('goodslist');
                // // 判断是否为空
                // if(goodslist){
                //     goodslist= JSON.parse(goodslist);
                // }
                // var total=0;
                $('.car ul').html('')
                var Qty = 0;
                var ul = goodslist.map(function(goods){
                    Qty += goods.qty;
                    // total+=goods.price*goods.qty;
                    return '<li data-gid="'+goods.gid+'"><i class="close"></i>'
                            + '<img src="'+goods.imgurl+'">'
                            + '<p class="prd_name">'+goods.name+'</p>'
                            + '<p>数量为<span id="count">'+goods.qty+'</span>件</p><span class="prd_price">'+goods.price+'</span>'                   
                    + '</li>'
                }).join('');
                $('.car ul').append(ul);
                $('.car_sum').html(goods.qty)
            }
            Cookie.set('goodslist',JSON.stringify(goodslist));
        });

        $('.car').on('click','.close',function(){
            $(this).closest('li').remove();
        });
    });

    $('.car').find('li').on('click','i',function(){
        var currentLi=this.parentNode;
        // 删除当前li
        var newTotal=1*0;
        currentLi.parentNode.removeChild(currentLi);
        console.log(goodslist.length)
        for(var i=0;i<goodslist.length;i++){
           if(goodslist[i].gid === currentLi.getAttribute('data-gid')){

             newTotal=goodslist[i].price.slice(1)*goodslist[i].qty*1;     
             goodslist.splice(i,1);

           }
        } 
      
       if(goodslist){
         Cookie.set('goodslist',JSON.stringify(goodslist));                   
       }
    });
    });
});
});