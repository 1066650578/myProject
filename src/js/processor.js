//渲染进度条
(function($,root){
    var curDuration,
        frameId,
        lastPercent = 0,
        startTime,
        $scope = $(document.body);
//    将秒转换成分
    function formatTime(time){
        time = Math.round(time);
        var min =Math.floor(time /60);
        var sec = time - min*60;
        if(min < 10){
            min = '0' + min;
        }
        if(sec < 10){
            sec = '0' + sec;
        }
        return min + ':' + sec;
    }
//    渲染当前的总时间
    function renderAllTime(duration){
        lastPercent = 0;
        curDuration = duration;
        var allTime = formatTime(duration);
        $('.all-time').html(allTime);
    }
    function update(percent){
        var curTime = percent * curDuration;
        curTime = formatTime(curTime);
        $(".cur-time").html(curTime);
    //    渲染进度条
        var percentage = (percent -1) *100 + "%";
        $('.pro-top').css({
            'transform':'translateX('+percentage+')'
        })
    }
    //时间和进度条的改变
    function start(per){
        if(typeof per === 'undefined'){
            lastPercent = lastPercent;
        }else{
            lastPercent =per;
        }
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame(){
            var curTime = new Date().getTime();
            var percent = lastPercent +(curTime - startTime)/(curDuration * 1000);
            if(percent < 1){
                frameId = requestAnimationFrame(frame);
                update(percent);
            }else{
                cancelAnimationFrame(frameId);
                $scope.find('.next-btn').trigger('click');
            }

        }
        frame();
    }
    function stop(){
        var stopTime = new Date().getTime();
        lastPercent =lastPercent + (stopTime - startTime)/(curDuration*1000);
        cancelAnimationFrame(frameId);
    }
    root.pro ={
        renderAllTime:renderAllTime,
        start:start,
        stop:stop,
        update:update
    }
})(window.Zepto,window.player ||(window.player = {}));