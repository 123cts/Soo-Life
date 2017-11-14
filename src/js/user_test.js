 jQuery(function($){

    // 加载底部页面
    $('.footer').load('../html/footer.html');
    // 获取元素
    var phone = document.getElementById('phone');
    var tell = document.querySelector('.tell');
    var error_hint = document.querySelector('.error_hint');

    // 注册验证用户号码是否被占用
    phone.onblur = function(){
        // 获取输入号码
        var _phone = phone.value;
        // 判断是否符合手机号码
        if(!/^1[34578]\d{9}$/.test(_phone)){
            tell.classList.remove('yes');
            tell.classList.add('no');
            error_hint.innerHTML = '你输入的手机号码有误';
            return false;
        }
        // 创建异步请求
        let xhr_phone = new XMLHttpRequest();
        // 处理数据
        xhr_phone.onload = function(){
            if(xhr_phone.status === 200 || xhr_phone.status === 304){
                var res = xhr_phone.responseText;
                console.log(res)
                if(res === 'yes'){
                    tell.classList.remove('no');
                    tell.classList.add('yes');
                    error_hint.innerHTML = '';
                }else if(res === 'no'){
                    tell.classList.remove('yes');
                    tell.classList.add('no');
                    error_hint.innerHTML = '你输入的手机号码已存在';
                }
            }
        }
        xhr_phone.open('get','http://localhost:3004/api/user_test.php?userphone='+ _phone,true);
        xhr_phone.send();
    }

    //随机验证码
    //生成随机验证码并写入code
    var code = document.querySelector('.rev_code');
    function yanzheng(){
        // 生成随机数
       var g = String.fromCharCode(randomNumber(25,0)+65);
       var s = String.fromCharCode(randomNumber(25,0)+65);
       var b = String.fromCharCode(randomNumber(25,0)+65);
       var q = String.fromCharCode(randomNumber(25,0)+65);

        code.innerText = b+g+q+s;
    }
    //刷新页面时更改验证码
    yanzheng();

    // 点击span时也可以更改验证码
    code.onclick = function(){
        yanzheng();
    }
    //封装随机最大值最小值
    function randomNumber(min,max){
        return parseInt(Math.random()*(max-min+1)) + min;
    }
    var gain_verify = document.querySelector('.gain_verify');

    // 获取验证码
    gain_verify.onclick = function(e){
        首先判断起前面的用户是否为空
        if(phone.value == ''){
            error_hint.innerHTML = '请输入正确的号码';
             return false;
        }
        // 然后判断前面的验证码是否正确
        if(icode.value != code.innerText || icode.value == ''){
            error_hint.innerHTML = '验证码错误，请重新输入';
            return false;
        }
       
       //验证码倒计时
       //设置时间
        var sec = 118;
        var timer = setInterval(function(){
            gain_verify.removeAttribute("disabled"); 
            gain_verify.style.background = "#ccc"
            gain_verify.innerText=sec+'s后重新获取';
            sec--;
            error_hint.innerHTML = '验证码已发送，请及时输入';
            console.log(sec)
            if(sec == 0){
                clearInterval(timer)
                gain_verify.innerText = '获取验证码';
                gain_verify.setAttribute("disabled");
                gain_verify.style.background="#FF8DAB";
            }
        }, 1000);

        return false;
    }

    // 第一次输入密码
    var password = document.getElementById('password');
    var psw = document.querySelector('.psw');
    password.onblur = function(e){
        var _password = password.value;
        // 要求6位数以上、、
        if(!/^[^\s]{6,}$/.test(_password)){
            psw.classList.remove('yes');
            psw.classList.add('no');
            error_hint.innerHTML ='你输入的密码必须6位数以上';
            return false;
        }
        error_hint.innerHTML='';
        psw.classList.remove('no');
        psw.classList.add('yas');
    }

    // 再次确认密码
    var check_pws = document.getElementById('check_pws');
    var check = document.querySelector('.check');
    check_pws.onblur = function(){
        var _check_pws = check_pws.value;
        if(_check_pws !== password.value){
            error_hint.innerHTML ='两次密码不相同！';
            check.classList.remove('yes');
            check.classList.add('no');
            return false;
        }
        check.classList.remove('no');
        check.classList.add('yas');
    }

    var zhuce = document.getElementById('zhuce');
    var icode = document.querySelector('.code');
    // 点击立即注册时判断输入的是否为空
    zhuce.onclick = function(e){
        if(phone.value == ''){
            error_hint.innerHTML = '请输入正确的号码';
             return false;
        }
        if(icode.value != code.innerText){
            error_hint.innerHTML = '验证码错误，请重新输入';
            return false;
        }
        if(password.value === ''){
            error_hint.innerHTML = '请输入密码';
            return false;
        }
        if(check_pws.value === ''){
            error_hint.innerHTML = '请输入确认密码';
            return false;
        }
    }
});