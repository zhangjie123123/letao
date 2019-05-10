/**
 * Created by Administrator on 2019-05-10.
 */
$(function () {
    var currentPage = 2;
    var pageSize = 5;
    var currentId;
    var isDelete;
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

//2.点击启用 禁用启动模态框，通过事件委托绑定
    $('tbody').on('click','.btn',function () {
        //显示模态框
        $('#userModal').modal("show");
        //获取用户id
        currentId= $(this).parent().data('id');
        isDelete=$(this).hasClass('btn-danger')?0:1;
    });
//3.点击确认按钮,修改对应用户状态
    $('#submitBtn').click(function () {
       //
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
                id:currentId,
                isDelete:isDelete
            },
            dataType:'json',
            success:function (info) {
               //1.关闭模态框
                if(info.success){
                    $('#userModal').modal('hide');
                }
                //2.页面要重新渲染
                render();
            }
        });
    });
});
