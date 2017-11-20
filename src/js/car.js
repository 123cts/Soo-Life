require(['config'],function(){
    // 加载common.js
    require(['common','jquery','car'],function(){
            $('.header').load("../html/header.html #header")
    $('.footer').load('../html/footer.html');

    var goodslist=Cookie.get('goodslist');
    // 判断是否为空
    if(goodslist){
        goodslist= JSON.parse(goodslist);
            // console.log(goodslist)
    // 把商品信息写入页面
    var total=0; 
    var gqty = 0;

    var $li = goodslist.map(function(goods){
        var pri =0;
        console.log(goodslist)
        total += goods.price.slice(1)*1*goods.qty;
        pri = goods.price.slice(1)*1*goods.qty;
        gqty += goods.qty;
        // console.log(goods.price.slice(1),goods.qty*1)
        return `<li id="${goods.gid}">
                    <h4><label><input type="checkBox" /></label></h4>
                    <div class="Xinxi">
                        <img src="${goods.imgurl}"/>
                        <div class="a1">
                            <span class="goodsName">${goods.name}</span>
                            <span class="goodsSize">${goods.size},${goods.color}</span>
                        </div>
                        <div class="a2">
                            <span>${goods.price}</span>
                        </div>
                        <div class="a3">
                                   <button class="sub">-</button>
                                   <span class="total">${goods.qty}</span>
                                   <button class="add">+</button>
                               </div>
                        <div class="a4">
                            <span>${pri}</span>
                        </div>
                        <div class="a5">
                            <i class="del"></i>
                        </div>
                    </div>
                </li>`
    }).join('');
     
      $('.shangpin ul').html($li);
      $('.zongjia').find('span').html(total);
      $('.jianshu').html(gqty)
    }
    

    // 删除商品
    // 点击x删除商品，相应的cookie中删除该物品信息
    var btnClose=document.getElementsByClassName('del');
    
    var shangpin = document.getElementById('goods');
    shangpin.onclick =function(e){
        // console.log(btnClose)
     e=e||window.event;
     var target=e.target||e.srcElement;
     if(target.tagName.toLowerCase()=='i'){
        var currentLi=target.parentNode.parentNode.parentNode;
        console.log(currentLi)
        // 删除当前li
        var newTotal=1*0;
       currentLi.parentNode.removeChild(currentLi);  
        for(var i=0;i<goodslist.length;i++){
           if(goodslist[i].gid===currentLi.getAttribute('id')){

             newTotal=goodslist[i].price.slice(1)*goodslist[i].qty*1;     
             var Gqty = gqty - goodslist[i].qty;              
             goodslist.splice(i,1);                                   
           }
           
       } 
         total -= newTotal*1;
         // console.log(total)
         $('.zongjia span').html(total.toFixed(2));  
         $('.jianshu').html(Gqty)        
       if(goodslist){
         Cookie.set('goodslist',JSON.stringify(goodslist));                   
       }
       
     }
    }

    var sum = 0;
    var qty;

    // 加
    $('#goods').on('click','.sub',function(){
        console.log($(this))
        if($(this).siblings('.total').html()*1<2){
            $(this).siblings('.total').html(2);
        }
        qty = $(this).siblings('.total').html()*1-1;
        $(this).siblings('.total').html(qty);

        var ID = $(this).closest('li').attr('id');
        var goodslist=Cookie.get('goodslist'); 
        if(goodslist){
            goodslist= JSON.parse(goodslist);
        }
        var $this = $(this)
        goodslist.forEach(function(item){
            if(item.gid === ID){
                // 重置当前的qty
                item.qty = qty;
                console.log($this.siblings('.total').html()*1,$this.parent('.a3').siblings('.a2').find('span').html().slice(1))
                // 计算总和
                sum = $this.siblings('.total').html() * $this.parent('.a3').siblings('.a2').find('span').html().slice(1)*1;
                $this.parent('.a3').siblings('.a4').find('span').html(sum)
                $('.zongjia span').html(sum)
            }

            // 重新写入Cookies
            Cookie.set('goodslist',JSON.stringify(goodslist));
        });
        
    })
    // 减、
    $('#goods li').on('click','.add',function(){

        qty = $(this).siblings('.total').html()*1+1;
        $(this).siblings('.total').html(qty);

        var ID = $(this).closest('li').attr('id');
        var goodslist=Cookie.get('goodslist'); 
        if(goodslist){
            goodslist= JSON.parse(goodslist);
        }
        var $this = $(this)
        goodslist.forEach(function(item){
            if(item.gid === ID){
                // 重置当前的qty
                item.qty = qty;
                console.log($this.siblings('.total').html()*1,$this.parent('.a3').siblings('.a2').find('span').html().slice(1))
                // 计算总和
                sum = $this.siblings('.total').html() * $this.parent('.a3').siblings('.a2').find('span').html().slice(1)*1;
                $this.parent('.a3').siblings('.a4').find('span').html(sum)
                $('.zongjia span').html(sum)
            }

            // 重新写入Cookies
            Cookie.set('goodslist',JSON.stringify(goodslist));
        });
    })



    // 猜你喜欢
    var goodsNo=1;
    var goodsQty = 4;
    var xhr_like = new XMLHttpRequest();
    xhr_like.onload = function(){
        if(xhr_like.status == 200 || xhr_like.status == 304){
            var res = JSON.parse(xhr_like.responseText);

            // console.log(res)
            var list = res.data.map(function(item){
                var img= JSON.parse(item.Imgurl);
                // var aa = item.Imgurl
                return '<li id="'+item.id+'">'
                +'<img src="'+img[0]+'"/>'
                        +'<p class="name">'+item.name+'</p>'
                        +'<p>'+item.price+'</p><button>加入购物车</button></li>'
            })
            var $ul = $('<ul/>').html(list)
            $('.like').html($ul );
        }
    }
    xhr_like.open("get",`../api/goods_hot.php?pageNo=${goodsNo}&qty=${goodsQty}`,true);
    xhr_like.send();

    // // 猜你喜欢商品加入购物车
    $('.like').on('click','button',function(){
        var id = $(this).closest('li').attr('id');
        console.log(id);
        var addCar = new XMLHttpRequest();
        addCar.onload = function(){
            if(addCar.status == 200 || addCar.status == 304){
                var resp = JSON.parse(addCar.responseText);
                console.log(resp)

                var list = resp.data.map(function(item){
                    var img= JSON.parse(item.Imgurl);
                    var size = JSON.parse(item.size);
                    var color = JSON.parse(item.color);


                    // var Gid =`"${item.gid}"`;

                    var goodslist = Cookie.get('goodslist');
                    console.log(goodslist)
                    goodslist = JSON.parse(goodslist)
                    // 添加商品
                    var goods = {
                        gid:item.id,
                        qty:1,
                        imgurl:img[0],
                        name:item.name,
                        price:item.price,
                        color:color[0],
                        size:size[0]
                    }
                    // 把当前商品添加到数组中
                    goodslist.push(goods);
                    console.log(goodslist)
                    Cookie.set('goodslist',JSON.stringify(goodslist));

                    return '<li id="'+item.id+'" >'
                           +'<h4><label><input type="checkBox" /></label></h4>'
                            +'<div class="Xinxi">'
                        +'<img src="'+ img[0]+'"/>'
                        +'<div class="a1">'
                            +'<span class="goodsName">'+item.name+'</span>'
                            +'<span class="goodsSize">'+size[0]+'</span>'
                        +'</div>'
                        +'<div class="a2">'
                            +'<span>'+item.price+'</span>'
                        +'</div>'
                        +'<div class="a3">'
                                   +'<button class="sub">-</button><span class="total">1</span><button class="add">+</button>'
                               +'</div>'
                        +'<div class="a4">'
                            +'<span>'+item.price+'</span>'
                        +'</div>'
                        +'<div class="a5">'
                            +'<i class="del"></i>'
                        +'</div></div></li>';
                });

                $('#goods').append(list); 

            }
        }
        addCar.open("get",`../api/goods.php?id=${id}`,true);
        addCar.send();
    })

   });
});