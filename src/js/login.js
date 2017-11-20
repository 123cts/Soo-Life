require(['config'],function(){
    // 加载common.js
    require(['jquery','login'],function($){
          
    var username = document.querySelector('#username');
    var password = document.querySelector('#Password');
    $('#denglu').on('click',function(){
        var uname = username.value;
        var pas = password.value; 
        console.log(uname,pas)
        if(uname == '' || pas==''){
            $('.l_alert').html('请输入正确的用户名与密码！');
        }
        var xhr_login = new XMLHttpRequest();
        xhr_login.onload = function(){
            if(xhr_login.status == 200 || xhr_login.status == 304){
                var res = xhr_login.responseText;
                console.log(res);
                if(res == 'ok'){
                    location.href='../index.html?name='+ uname;
                }
            }
        }
        xhr_login.open('get',`../api/login.php?username=${uname}&password=${pas}`,true);
        xhr_login.send();
        return false;
    });
    console.log(666)
    
    });
});