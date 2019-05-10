/**
 * Created by Administrator on 2019-05-10.
 */
$(function () {
    var currentPage = 2;
    var pageSize = 5;
 //1.一进入页面，发送ajax请求获取用户列表数据，通过模板引擎渲染
    render();
    function render() {
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function (info) {
                // console.log(info);
                var htmlStr=template('tpl',info);
                $('tbody').html(htmlStr);

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    totalPages:Math.ceil(info.total/info.size),
                    //当前显示第几页
                    currentPage:info.page,
                //    当页码被点击时调用的回调函数
                    onPageClicked:function (a,b,c,page) {
                        // console.log(page);
                        currentPage=page;
                        render();
                    }

                });
            }
        });
    };

    //分页初始化

});
