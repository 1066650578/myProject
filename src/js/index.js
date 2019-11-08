var $ = window.Zepto;
var root = window.player;
var index = 0;
var songList = [],
    controlManger,
    audio = new root.audioControl(),
    $scope = $(document.body);

function bindEvent(){
    $scope.on('playChange',function(event,index,flag){
        audio.getAudio(songList[index].audio);
        if(audio.status == 'play' ||flag){
            audio.play();
            root.pro.start();
        }
        root.pro.renderAllTime(songList[index].duration);
        root.render(songList[index]);
        root.pro.update(0);
    });
    $(".control").on("click",".prev-btn",function(){
        var index = controlManger.prev();
        $scope.trigger('playChange',index);
    });
    $(".control").on("click",".next-btn",function(){
        var index = controlManger.next();
        $scope.trigger('playChange',index);
    });
    $(".control").on('click','.like-btn',function(){
        var index = controlManger.getIndex(0);
        if(songList[index].isLike){
            songList[index].isLike = false;
        }else{
            songList[index].isLike = true;
        }
        root.render(songList[index]);
    });
    $('.control').on('click','.play-btn',function(){
        audio.getAudio(songList[index].audio);
        $('.play-btn').addClass("pause");
        if(audio.status =="play"){
            audio.pause();
            $('.play-btn').removeClass("pause");
            root.pro.stop();
        }else{
            root.pro.start();
            audio.play();
            $('.play-btn').addClass("pause");
        }
    })
}
//进度条拖动
function bindTouch(){
    var offset = $('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    $('.slider-pointer').on('touchstart',function(){
        root.pro.stop()
    }).on('touchmove',function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if(per <0 || per>1){
            per = 0;
        }
        root.pro.update(per);
    }).on('touchend',function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if(per <0 || per>1){
            per = 0;
        }
        var curDuration =  songList[controlManger.index].duration;
        var curTime = per * curDuration;
        curTime = Math.round(curTime);
        audio.playTo(curTime);
        $('.play-btn').addClass("pause");
        root.pro.start(per);
    })
}

function getData(url){
    $.ajax({
        type:"GET",
        url:url,
        success:function(data){
            songList = data;
            root.render(songList[index]);
            bindEvent();
            bindTouch();
            controlManger = new root.controlManger(songList.length);
            $scope.trigger('playChange',0);
        },
        error:function(){
            console.log("error");
        }
    })
}
getData("../mock/data.json");