<?php
    // 配置参数
    $servername = 'localhost';
    $username = 'root';
    $password = '';
    $database = 'soolife';


    // 连接数据库
    $conn = new mysqli($servername,$username,$password ,$database);//得到实例对象

    // 检测连接
    if($conn->connect_errno){
        die('连接失败'.$conn->connect_error);
    }

    // 设置编码
    $conn->set_charset('utf8');
?>