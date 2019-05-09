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

