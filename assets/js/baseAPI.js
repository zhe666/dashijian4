var baseUrl = "http://api-breakingnews-web.itheima.net" //开发环境
// var baseUrl = "http://ajax.frontend.itheima.net"//测试环境
// var baseUrl = "http://ajax.frontend.itheima.net"//生产环境
// 拦截所有ajax请求

// 过滤器 用来统一拼接请求的根路径
// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$(function () {
    $.ajaxPrefilter(function (options) {
        //在发起正在的Ajax请求之前,统一拼接请求的根路径
        options.url = 'http://api-breakingnews-web.itheima.net' + options.url
        // 身份认证
        if (options.url.indexOf("/my/") !== -1) {
            options.headers = {
                Authorization: localStorage.getItem("token") || ""
            }
            options.complete = function (res) {
                //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
                console.log(res);
                if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                    // 强制清空token
                    localStorage.removeItem("token")
                    // 强制跳转到登录页面
                    location.href = "/login.html"
                }
            }
        }
    })
})