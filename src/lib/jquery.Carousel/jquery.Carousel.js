
;(function($){
   $.fn.Carousel = function(options){
        var defaults = {
            width:810,
            height:320,
            // 初始化图片
            imgs:[],
            //是否自动轮播
            autoPlay:true,
            // 是否显示前后按钮
            buttons:true,
            //是否显示页码
            page:true,

            //滚动类型
            type:'horizontal',
            // 时间
            duration:5000,
            ele:'.carousel',
            index :0
        }

        //覆盖默认参数
        var opt = Object.assign({},defaults,options);
        
        var self = this;

        var Car = {
            //创建节点、
            //绑定事件
            init(opt){
                this.ele = self;

                this.opt = opt;
                this.index = opt.index;
                let ul = document.createElement('ul');

                //遍历生成图片
                ul.innerHTML = opt.imgs.map(item=>{
                    return `<li><img src="${item}" ></li>`;
                }).join('');
                self.append(ul);
                
                this.ul = ul;
                if(opt.autoPlay){
                    this.start();

                    //判断是否有按钮
                    if(opt.buttons){
                        // 创建按钮
                        let btnNext = document.createElement('span');
                        btnNext.className = 'next';
                        btnNext.innerHTML = '&gt;';
                        let btnPrev = document.createElement('span');
                        btnPrev.className = 'prev';
                        btnPrev.innerHTML = '&lt';

                        //将按钮添加到this.ele节点上
                        self.append(btnPrev);
                        self.append(btnNext);

                        this.btnNext = btnNext;
                        //下一张
                        btnNext.onclick = function(){
                            this.next();
                        }.bind(this);
                        //上一张
                        btnPrev.onclick = function(){
                            this.prev();
                        }.bind(this);
                    }

                    //鼠标移入停止播放
                    self.on('mouseenter',function(){
                        this.stop();
                    }.bind(this))

                    //鼠标移出继续播放
                    self.on('mouseleave',function(){
                        this.start();
                    }.bind(this))

                    if(opt.page){
                        //创建page节点，用于存放页数
                        var page = document.createElement('div');
                        page.className = 'page';
                        //遍历页数
                        for(var i=0;i<opt.imgs.length;i++){
                            var span = document.createElement('span');
                            span.id = i+1;
                            if(this.index == i){
                                span.className = 'active';
                            }
                            page.appendChild(span);
                        }
                        self.append(page);

                        this.page = page;
                        //点击分页时高亮当前的index
                        $(page).on('click',function(e){
                            if(e.target.tagName.toLowerCase() === 'span'){
                                this.index =e.target.id -1;
                                this.move();
                            }
                        }.bind(this));
                    }
                }
            },
            move(){

                //判断index是否超过了图片的数量
                if(this.index > this.opt.imgs.length-1){
                    this.index = 0;
                }else if (this.index < 0){
                    this.index = this.opt.imgs.length-1;
                }
                //滚动类型
                let target = {};
                this.lastindex = 0;
                //垂直播放
                if(this.opt.type === 'vertical'){
                    target.top = -this.index * this.opt.height;

                //水平播放
                }else if(this.opt.type === 'horizontal'){
                    //改变this.ele下元素ul的宽
                    self.find('ul').css({width:3248});
                    target.left = -this.index * this.opt.width;

                //ppt播放
                }else if(this.opt.type === 'ppt'){
                    self.find('li').eq(this.index).show().siblings('li').hide();
                }
                //添加动画
                this.ele.find('ul').animate(target);
                // let lastIndex =0 ;
                // if(this.opt.type === 'fade'){ 
                //     // 隐藏除index外所有图片
                //     for(var i=0;i<this.opt.imgs.length;i++){
                //         if(i!==this.index){
                //             this.opt.imgs[i].animate({opacity:0});
                //         }
                //     }

                //     this.ele.find('li img').eq(this.index).animate({opacity:1})
                //     this.ele.find('li img').eq(lastIndex).animate({opacity:0})
                //     // 更新lastIndex
                //     console.log(this.index)
                //     lastIndex = this.index;
                //     console.log(lastIndex)
                // }
                //分页
                this.pageChange();

            },
            //清空定时器
            stop(){
                clearInterval(this.timer);
                this.ele.find('li').eq(this.index).css("display","block");
            },
            //分页
            pageChange(){
                //清除所有高亮
                for(var i=0;i<this.opt.imgs.length;i++){
                    this.page.children[i].className = '';
                }
                //显示当前index的高亮
                this.page.children[this.index].className = 'active';
            },
            //播放
            start(){
                this.timer = setInterval(()=>{
                    this.index++;
                    this.move();
                },this.opt.duration);
            },
            //下一张
            next(){
                this.index++;
                this.move();
            },
            //上一张
            prev(){
                this.index--;
                this.move();
                }
            }
        Car.init(opt);
    } 
    
})(jQuery);
