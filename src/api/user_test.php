<?php

    // // 获取前端传到后端的用户电话
    // // $user_phone = $_GET['userphone'];
    // // $user_phone = isset($_GET['userphone']);
    // $user_phone = isset($_GET['userphone']) ? $_GET['userphone'] : '';


    // // 文件路径
    // $file_url = "./data/user_data.json";

    // // 打开文件
    // $myfile = fopen($file_url, 'r');

    // // 读取打开的文件
    // $content = fread($myfile,filesize($file_url));

    // // 用完后关闭文件
    // fclose($myfile);

    // // 把读取到的内容转成数组
    // $arr_data = json_decode($content,true);


    // // 判断该手机号是否存在了
    // foreach ($arr_data as $idx => $item) {
    //     // $aa = array();
    //     $phone[] = $item['user'];
    // }

    // // echo json_encode($phone,JSON_UNESCAPED_UNICODE);

    // if(in_array($user_phone, $phone)){
    //     echo "no";
    // }else{
    //     echo 'yes';
    // }
    include 'connect.php';

    // 接受前端数据
    $username = isset($_GET['username']) ? $_GET['username'] : '';
    $password = isset($_GET['password']) ? $_GET['password'] : '';

    //查看用户名是否已经存在
    $sql = "select username from user where username='$username'";
    $result = $conn->query($sql);

    if($result->num_rows>0){
        // 释放查询内存(销毁)
        $result->free();

        // 用户名已经被占用
        echo "no";
    }else{
        // 释放查询内存(销毁)
        $result->free();

        if($password != '' && $username != ''){
            // 密码md5加密
            $password = md5($password);
            echo "$password";

            $sql = "insert into user(username,password) values('$username','$password')";
            $result = $conn->query($sql);


            if ($result) {
                // 写入成功
                echo "yes";
            } else {
                // 写入失败
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        }
        echo "YES";
    }

    //关闭连接
    $conn->close();
?>