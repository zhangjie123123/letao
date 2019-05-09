/**
 * Created by Administrator on 2019-05-09.
 */
$(function () {//入口函数
    $('#form').bootstrapValidator({
    //配置效验的图标
    feedbackIcons:{
        valid:'glyphicon glyphicon-ok',
        invalid:'glyphicon glyphicon-remove',
        validating:'glyphicon glyphicon-refresh'
    },
// 配置字段
    fields: {
        username: {
            //配置效验规则
            validators: {
                //配置非空效验规则
                notEmpty: {
                    message: "用户名不能为空"
                },
                stringLength: {
                    min: 2,
                    max: 6,
                    message: "用户名在2-6位"
                },
                callback:{
                    message:"用户名不存在"
                }
            }
        },

        password: {
            validators: {
                notEmpty: {
                    message: "密码不能为空"
                },
                stringLength: {
                    min: 6,
                    max: 12,
                    message: "密码长度必须是6-12位"
                },
                callback:{
                    message:"密码错误"
                }

            }

        }
    }
});//调插件方法//一般传对象
    //功能2 登录功能
    // 表单效验成功事件
    $('#form').on('success.form.bv',function (e) {
        //阻止默认的表单提交
        e.preventDefault();
        //通过ajax进行提交
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$('#form').serialize(),//获取form里面的值
            dataType:"json",
            success:function (info) {
                console.log(info);
                if(info.success){
                    location.href ="index.html";
                }
                if(info.error===1000){
                    $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback");
                }
                if(info.error===1001){
                    $('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback");
                }
            }
        })
    });
    //3.重置功能
    $('[type="reset"]').click(function () {
        $('#form').data("bootstrapValidator").resetForm(true);
    })
});