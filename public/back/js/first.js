/**
 * Created by Administrator on 2019-05-10.
 */
$(function () {
    var currentPage = 1;
    var pageSize=5;
    //1.一进入页面,发送ajax请求
    render();
    function render() {
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function (info) {
                console.log(info);
                var htmlStr = template('tpl',info);
                $('tbody').html(htmlStr);
                //分页初始化
                $('#paginator').bootstrapPaginator({
                    //指定版本
                    bootstrapMajorVersion:3,
                    //总页数
                    totalpages:Math.ceil(info.total / info.size),
                    //当前第几页
                    currentPage:info.page,
                    //注册按钮点击事件
                    onPageClicked:function (a,b,c,page) {
                        //更新当前页
                        currentPage=page;
                        render();
                    }
                });
            }
        });
    }

});