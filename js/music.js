$(function () {

    var mark = true;

    var music = $(".myMusic1").get(0);

    var mSrc = ["mp3/芒种.mp3", "mp3/沙漠骆驼.mp3","mp3/可不可以.mp3"];

    $(".start").on("click", function () {
        if (mark) {
            $(this).addClass("rotate");
            music.play(); // 开启音乐
            //mark = false;
        } else {
            $(this).removeClass("rotate");
            music.pause(); // 暂停播放
            //mark = true;
        }
        mark = !mark;
    });

    var oP = $("p");

    function geci() {
        var lrc = $(".txt").val();
        var lrcArr = lrc.split("[");
        //console.log(lrcArr);
        var html = "";
        for (var i = 0; i < lrcArr.length; i++) {
            var arr = lrcArr[i].split("]"); //分隔歌词与时间
            //console.log(arr);
            var time = arr[0].split("."); //分隔毫秒与其他时间
            var timer = time[0].split(":");// 分隔分钟与秒
            var ms = timer[0] * 60 + timer[1] * 1;//转化为秒钟
            //console.log(ms);

            var text = arr[1]; // 获取歌词部分
            if (text) {
                html += "<p id=" + ms + ">" + text + "</p>"
            }
            $(".content").html(html);
            oP = $("p");
        }
    }

    geci();

    var num = 0;
    var index = 0;

    music.addEventListener("timeupdate", function () {
        var curTime = parseInt(this.currentTime); //获取歌曲播放的时间
        //console.log(this.currentTime);

        var curStart = $("#" + curTime);

        if (curStart) {
            //console.log(123);
            // 在播放下一句歌词之前把所有歌词变暗
            oP.css({
                color: "#ccc",
                fontSize: "16px"
            });

            curStart.css({
                color: "red",
                fontSize: "20px"
            });

            if (oP[7 + num].id == curTime) {
                $(".content").css("top", -24 * num + "px");
                num++;
            }

            if (curTime == obj[index].time) {
                num = 0;
                console.log("播放完啦！");
                setTimeout(function () {
                    $(".content").css("top", 0);
                }, 20000);
            }
        }
    });

    var mc = $(".mc");

    $("#btn").on("click", function () {
        $(".content").css("top", 0);
        //停止播放按钮
        $(".start").removeClass("rotate");
        mark = true;

        $(".content").html("");
        index++;
        if (index > mc.length - 1) {
            index = 0;
        }
        $(".myMusic1").prop("src", mSrc[index]);


        $.each(obj, function (i, ele) {
            if (index == i) {
                //console.log(ele.title);
                $(".title").html(ele.title);
                $(".singer span").html(ele.singer);
            }
        });

        mc.eq(index).addClass("txt").siblings("textarea").removeClass("txt");

        geci();
        // 清除第一行的字体颜色
        //console.log(oP.eq(0));
        setTimeout(function () {
            oP.eq(0).css({
                color: "#ccc",
                fontSize: "16px"
            });
        }, 1)

    });

    var obj = [
        {id: 1, title: "芒种", singer: "腾格尔", time: "173"},
        {id: 2, title: "沙漠骆驼", singer: "展展与罗罗", time: "324"},
        {id: 3, title: "可不可以", singer: "张紫豪", time: "227"}
    ];
});