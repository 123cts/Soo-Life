<?php
    // 引入其他php文件
    include 'connect.php';

    $hotNo = isset($_GET['pageNo']) ? $_GET['pageNo'] : 1;

    $hotqty = isset($_GET['qty']) ? $_GET['qty'] : 20;//10

    // 编写sql语句
    $sql = "select * from goods where hot = hot";

    // 执行sql语句
    // query()
    // 得到一个：查询结果集
    $result = $conn->query($sql);

    // 使用查询结果集
    // 返回数组
    $row = $result->fetch_all(MYSQLI_ASSOC);

    // 根据分页截取数据
    $res = array(
        'data'=>array_slice($row, ($hotNo)*$hotqty,$hotqty),
        'total'=>count($row)
    );


    // 把数组转换成json字符串
    $res = json_encode($res,JSON_UNESCAPED_UNICODE);

    echo $res;
?>