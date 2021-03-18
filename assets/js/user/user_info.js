$(function () {
    var form = layui.form  //校验表单，获取form模块
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度必须在1-6个字符之间"
            }
        }
    })
    initUserInfo()
    //初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function (res) {
               console.log(res);
                if (res.status != 0) {
                    return layer.msg("获取用户信息失败")
             
                }
    
                // 成功后渲染用户界面
             
                form.val('formUserInfo', res.data)
              
            }
        });
    }

    // 重置表单的数据
    $("#btnReset").on("click", function (e) {
        // 重置表单按钮,阻止默认重置行为
        e.preventDefault()
        // 调用initUserInfo函数,重新获取用户信息
        initUserInfo()
  
    })
    // 监听表单的提交数据
    $('.layui-form').on("submit", function (e) {
        // 阻止表单的默认行为
        e.preventDefault()
        $.ajax({
            method: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status  !== 0) {
                    return layer.msg("更新用户信息失败") //弹出layer提示框
                }
                layer.msg(res.message)
                console.log(window.parent)
                // console.log(window.parent.getUserInfo());
                // console.log(window.parent.renderAvatar());
                // 调用父页面的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }

        });
    })
})