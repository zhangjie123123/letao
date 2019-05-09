/**
 * Created by Administrator on 2019-05-09.
 */


$(document).ajaxStart(function () {
//1.开启进度条
    NProgress.start();
});
$(document).ajaxStop(function () {
//1.开启进度条
    setTimeout(function () {
        NProgress.done();
    },500);

});
//登录拦截
if(location.href.indexOf('login.html')=== -1){
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        dataType:"json",
        success:function(info){
            if(info.success){

            }
            if(info.error === 400){
                location.href = "login.html";
            }
        }
    });
}

//首页功能
$(function () {
    //1.分页功能的切换
    $('.nav .category').click(function () {
        //切换显示
    $('.nav .child').stop().slideToggle();
    });
    //2.左侧侧边栏切换功能
    $('.icon_menu').click(function () {
       $('.lt_aside').toggleClass('hidemenu');
        $('.lt_topbar').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');
    });
    //3.点击退出功能
    $('.icon_logout').click(function () {
        //显示模态框
        $('#logoutModal').modal('show');
    });
//   4.点击退出模态框
    $('#logoutBtn').click(function () {
        //发送ajax请求，进行退出
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:"json",
            success:function (info) {
                if(info.success){
                    location.href = "login.html";
                }
            }
        });
    });
});