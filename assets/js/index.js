$(function () {
    //使用ajax获取用户信息
    getUserInfo()
    function getUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            headers: { Authorization: localStorage.getItem('token') || '' },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg("获取用户失败")
                }
                // 调用renderAvatar渲染用户头像
                renderAvatar(res.data)
            }
        });
    }
    //渲染用户头像信息,参数用来接收服务器返回的用户数据
    function renderAvatar(user) {
        // 1,获取用户的昵称
        let name = user.nickname || user.username
        // 2.设置欢迎的文本
        $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
        // 3.按需渲染用户的头像
        if (user.user_pic !== null) {
            $(".layui-nav-img").attr("src", user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            $(".layui-nav-img").hide()
            var first = name[0].toUpperCase()  //将名字首字母转为大写字母
            $('.text-avatar').html(first).show()
        }
    }
    var layer = layui.layer
    $(".layui-nav-item #tuichu").on("click", function () {
        //提示用户是否确认退出
        layer.confirm("确认退出登录？", { icon: 3, title: "提示" }, function (index) {
                //清空本地储存中的token
                localStorage.removeItem("token")
                //重新跳转到登录页面
                location.href="/login.html"
                //关闭confirm 询问框
                layer.close(index)
        })

    })
 
})