<?php

    
    // 文件地址
    $file_url = './data/list_brand.json';
    // 打开文件
    // 如果打开文件失败，则中止代码的执行
    $myfile = fopen($file_url, 'r') or die("Unable to open file!");

    // 读取文件
    $content = fread($myfile, filesize($file_url));

    // 关闭文件
    fclose($myfile);


    // 把读取到的内容转成数组
    // 第二个参数设定是否转换成关联数组
    $arr_data = json_decode($content,true);
    echo json_encode($arr_data,JSON_UNESCAPED_UNICODE);
?>