<?php
    // 引入其他php文件
    include 'connect.php';


    $pageNo = isset($_GET['pageNo']) ? $_GET['pageNo'] : 1;

    $qty = isset($_GET['qty']) ? $_GET['qty'] : 20;//10

    $id = isset($_GET['id']) ? $_GET['id'] : null;
    // 编写sql语句
    $sql = "select * from goods";

    if($id){
        $sql .= " where id='$id'";
    }

    // 执行sql语句
    // query()
    // 得到一个：查询结果集
    $result = $conn->query($sql);

    // 使用查询结果集
    // 返回数组
    $row = $result->fetch_all(MYSQLI_ASSOC);

    // 根据分页截取数据
    $res = array(
        'data'=>array_slice($row, ($pageNo-1)*$qty,$qty),
        'total'=>count($row)
    );


    // 把数组转换成json字符串
    $res = json_encode($res,JSON_UNESCAPED_UNICODE);

    echo "$res";
?>