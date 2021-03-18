$(function () {
    // 密码自定义校验规则
    var form = layui.form
    form.verity({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $("[name=oldPWD]").val()) {
                return "新旧密码不能相同"
            }
        },
        rePwd: function () {
            if (value !== $("[name=newPwd]").val()) {
                return "两次密码不能一致"
            }
        }
    })
    $(".layui-form").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: "post",
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {  
                    return layui.layer.msg("更新密码失败")
                }
                layui.layer.msg("更新密码成功")
                //重置表单
                $(".layui-form")[0].reset()
            }
        });
    })
})