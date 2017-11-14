<?php

    // 获取前端传到后端的用户电话
    // $user_phone = $_GET['userphone'];
    // $user_phone = isset($_GET['userphone']);
    $user_phone = isset($_GET['userphone']) ? $_GET['userphone'] : '';


    // 文件路径
    $file_url = "./data/user_data.json";

    // 打开文件
    $myfile = fopen($file_url, 'r');

    // 读取打开的文件
    $content = fread($myfile,filesize($file_url));

    // 用完后关闭文件
    fclose($myfile);

    // 把读取到的内容转成数组
    $arr_data = json_decode($content,true);


    // 判断该手机号是否存在了
    foreach ($arr_data as $idx => $item) {
        // $aa = array();
        $phone[] = $item['user'];
    }

    // echo json_encode($phone,JSON_UNESCAPED_UNICODE);

    if(in_array($user_phone, $phone)){
        echo "no";
    }else{
        echo 'yes';
    }
?>