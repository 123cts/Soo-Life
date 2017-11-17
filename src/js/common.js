/**
 * [获取一个范围内的随机整数]
 * @param  {Number} min [最小值]
 * @param  {Number} max [最大值]
 * @return {Number}     [返回一个随机整数]
 */
function randomNumber(min,max){
	return parseInt(Math.random()*(max-min+1)) + min;
}

//randomNumber(100,200);

/**
 * [随机颜色]
 * @return {String} [返回rgb格式颜色]
 */
function randomColor(){
	// 得到rgb随机颜色
	var r = parseInt(Math.random()*256);
	var g = parseInt(Math.random()*256);
	var b = parseInt(Math.random()*256);

	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

/**
 * [获取元素样式]
 * @param  {Element} ele  [需要获取样式的元素]
 * @param  {String} attr [css样式]
 * @return {String}      [返回css属性值]
 */
function getStyle(ele,attr){
	var res = '';

	// 标准浏览器
	if(window.getComputedStyle){
		res = getComputedStyle(ele)[attr];
	}

	// ie8-
	else if(ele.currentStyle){
		res =  ele.currentStyle[attr];
	}

	// 直接返回内联样式
	else{
		res = ele.style[attr];
	}


	return res;
}

// getStyle(box,'font-size');


/**
 * [绑定事件函数，兼容IE8-]
 * 解决addEventListener和 attachEvent 兼容
 * @param  {Node} ele     [绑定事件的节点]
 * @param  {String} type    [事件类型]
 * @param  {Function} handler [事件处理函数]
 * @param  {Boolean} capture [是否捕获]
 */
function bind(ele,type,handler,capture){
	// 标准浏览器
	if(ele.addEventListener){
		ele.addEventListener(type,handler,capture);
	}

	// IE8-
	else if(ele.attachEvent){
		ele.attachEvent('on' + type,handler);
	}

	// 其他浏览器
	else{
		ele['on' + 'click'] = handler;
	}
}

// bind(btn,'click',function(){},true);


//cookie操作
//增，删，查，改
var Cookie = {
	/**
	 * [添加/修改cookie]
	 * @param {String} name    [cookie名]
	 * @param {String} val     [cookie值]
	 * @param {[Date]} expires [cookie有效期]
	 * @param {[String]} path    [cookie保存路径]
	 */
	set:function(name,val,expires,path){
		var str = name + '=' + val;

		// 有效期
		if(expires){
			str += ';expires=' + expires.toUTCString();
		}

		// 保存路径
		if(path){
			str += ';path=' + path;
		}

		// 写入cookie
		document.cookie = str;
	},

	/**
	 * [删除cookie]
	 * @param  {String} name [要删除的cookie名]
	 * @param  {[String]} path [指定路径]
	 */
	remove:function(name,path){
		var now = new Date();
		now.setDate(now.getDate()-7);

		// document.cookie = name + '=null;expires=' + now.toUTCString();
		// 利用添加方法达到删除效果
		this.set(name,'null',now,path);
	},

	/**
	 * [获取cookie]
	 * @param  {String} name [cookie]
	 * @return {String}      [description]
	 */
	get:function(name){
		var res = '';

		// 获取能访问的所有cookie
		var cookies = document.cookie;

		// 判断是否存在cookie
		if(!cookies.length){
			return res;
		}

		// cookie字符串拆成数组
		cookies = cookies.split('; ');

		// 遍历数组，找出name对应cookie值
		for(var i=0;i<cookies.length;i++){
			// 拆分cookie名和cookie值
			var arr = cookies[i].split('=');
			if(arr[0] === name){
				res = arr[1];
				break;
			}
		}

		return res;
	}
}

// Cookie.set('username','laoxie',now,'/');
// Cookie.remove('username','/');
// Cookie.get('username');//laoxie
// document.getElementById()


/*
	同时改变多个属性的动画函数
 */
/*function animate(ele,attr,target){
	// 把定时器作为DOM节点的属性
	clearInterval(ele.timer);
	ele.timer = setInterval(function(){
		// 获取当前值：10px,0.5,30deg,inherit,auto
		var current = getComputedStyle(ele)[attr];

		// 提取单位
		var unit = current.match(/\d([a-z]*)$/);
		unit = unit ? unit[1] : '';

		// 提取数字
		current = parseFloat(current);


		// 计算缓冲速度
		var speed = (target - current)/10;

		if(attr === 'opacity'){
			speed = speed>0 ? 0.05 : -0.05;
		}else{
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
		}

		// 到达目标值/清除定时器
		if(current === target){
			clearInterval(ele.timer);
			current = target - speed;
		}

		ele.style[attr] = current + speed + unit;
	},30)
}
*/

// animate(ele,'top',-320);
// animate(ele,'opacity',0.5);


/*
	* 支持多属性同时运动
	* 支持回调函数
 */
function animate(ele,opt,callback){
	var timerQty = 0;
	for(var attr in opt){
		// 记录动画数量
		timerQty++;

		//createTimer(attr);
		(function(attr){
			// 以属性名创建定时器名字
			var timerName = attr + 'timer';

			// 清除之前的定时器,放置多个定时器作用于同一个元素
			clearInterval(ele[timerName]);

			// 目标值
			var target = opt[attr];

			// 创建定时器
			ele[timerName] = setInterval(function(){
				// 获取当前值
				var current = getComputedStyle(ele)[attr];

				// 提取单位
				var unit = current.match(/\d([a-z]*)$/);
				unit = unit ? unit[1] : '';

				// 提取数字
				current = parseFloat(current);

				// 计算缓冲速度
				var speed = (target - current)/10;

				//判断属性是否为opacity
				if(attr === 'opacity'){
					speed = speed>0 ? 0.05 : -0.05;
				}else{
					speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
				}

				// 到达目标值/清除定时器
				if(current === target){
					clearInterval(ele[timerName]);
					current = target - speed;

					// 数量减1
					timerQty--;

					// 执行回调函数
					// 最后一个动画执行完成后才执行回调函数
					if(typeof callback === 'function' && timerQty===0){
						callback();
					}
				}

				ele.style[attr] = current + speed + unit;

			},30);
		})(attr)
	}

	
	
}
// animate(ele,{width:100,top:200});



//工具包
var Tool = {
	/**
	 * [判断数据类型]
	 * @param  {anytype} data [数据]
	 * @return {String}      [返回数据类型对应的字符串]
	 */
	typeof:function(data){
		// 强大的方法：Object.prototype.toString
		return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();//相当于data.toString()
	}
}

// Tool.typeof([10]);//array
// Tool.typeof(10);//number
// Tool.typeof('10');//string
// Tool.typeof(function(){});//function
// Tool.typeof(/abc/);//regexp