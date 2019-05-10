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
//2.点击添加分类按钮，显示模态框
    $("#addBtn").click(function () {
        $("#addModal").modal("show");
    });
    //3.使用表单效验插件，实现表单效验
    $("#form").bootstrapValidator({
        //配置效验的图标
        feedbackIcons:{
            valid:'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating:'glyphicon glyphicon-refresh'
        },
// 配置字段
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"一级分类不能为空"
                    }
                }
            }
        }
    });
    //4.注册表单效验成功事件，阻止默认的成功提交，通过ajax进行提交
    $('#form').on("success.form.bv",function (e) {
      e.preventDefault();
        //通过ajax进行提交
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$("#form").serialize(),
            dataType:"json",
            success:function (info) {
                if(info.success){
                    //添加完成成功
                    //关闭模态框
                    $("#addModal").modal("hide");
                    currentPage=1;
                    //页面重新渲染
                    render();
                    //3.重置模态框
                    $('#form').data("bootstrapValidator").resetForm(true);
                }
            }
        })
    });
});