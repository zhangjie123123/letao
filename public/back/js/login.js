/**
 * Created by Administrator on 2019-05-09.
 */
$(function () {//入口函数
$('#form').bootstrapValidator({
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
                }

            }

        }
    }
});//调插件方法//一般传对象
});