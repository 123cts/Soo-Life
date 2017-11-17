;(function($){
    $.fn.Zoom = function(options){
        //默认值
        var defaults = {
            // 大图显示位置
            position:'right',

            // 大图与小图的距离
            gap:15,
            //大图显示区域宽高
            width:330,
            height:330
        }

        //this:jquery对象（实例）
        this.each(function(){
            //this：节点
            var $small = $(this);

            // 扩展默认值
            var opt = $.extend({},defaults,options);

            // 添加插件特定类名
            $small.addClass('gds-zoom');

            var zoom = {

                _init:function(){
                    // 小图
                    this.$smallImg = $small.children('img');

                    // 生成大图/容器
                    this.$big = $('<div/>').addClass('gds-big');
                    this.$big.css({
                        width:opt.width,
                        height:opt.height
                    });

                    // 定位大图显示区域
                    

                    this.$bigImg = $('<img/>');

                    // 生成放大镜
                    this.$minzoom = $('<span/>').addClass('minzoom');

                    $small.on('mouseenter',function(){
                        this.show();
                    }.bind(this)).on('mouseleave',function(){
                        this.hide();
                    }.bind(this)).on('mousemove',function(e){
                        this.move(e.pageX,e.pageY);
                    }.bind(this));
                },
                show:function(){
                    // 写入图片地址
                    this.$bigImg.attr('src',this.$smallImg.attr('data-big'));
                    this.$big.append(this.$bigImg);
                    this.$big.appendTo($('.del'));
                    this.$minzoom.appendTo($small);

                  

                    // 要获取图片的高度，必须先显示到页面
                    // 并且图片加载完成才可以获取图片实际高度
                    this.$bigImg[0].onload = function(){
                        // 计算大图与小图比率
                        this.ratio = this.$bigImg.outerWidth()/this.$smallImg.outerWidth();

                        // 设置放大镜的尺寸
                        // 与大图显示区域等比例
                        this.$minzoom.css({
                            width:opt.width/this.ratio,
                            height:opt.height/this.ratio
                        });

                    }.bind(this);
                },
                hide:function(){
                    this.$big.remove();
                    this.$minzoom.remove();
                },
                move:function(x,y){
                    // 计算放大镜移动过的距离

                    var left = x - $small.offset().left -  this.$minzoom.outerWidth()/2;
                    var top = y - $small.offset().top -  this.$minzoom.outerHeight()/2;
                    // 限定left,top值
                    if(left<0){
                        left = 0;
                    }else if(left > this.$smallImg.outerWidth()-this.$minzoom.outerWidth()){
                        left = this.$smallImg.outerWidth()-this.$minzoom.outerWidth()
                    }

                    if(top<0){
                        top = 0;
                    }else if(top > this.$smallImg.outerHeight()-this.$minzoom.outerHeight()){
                        top = this.$smallImg.outerHeight()-this.$minzoom.outerHeight()
                    }
                    this.$minzoom.css({

                        left:left,
                        top:top
                    });


                    // 大图移动
                    this.$bigImg.css({
                        left:-left*this.ratio,
                        top:-top*this.ratio
                    })
                }
            }
            zoom._init();
        });
    }
})(jQuery);