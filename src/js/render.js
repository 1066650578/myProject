// µœ÷‰÷»æ

(function($,root){
   function renderInfo(data){
       var songInfo = '<div class="song-name">'+data.song+'</div>\
           <div class="singer-name">'+data.singer+'</div>\
           <div class="album-name">'+data.album+'</div>';
       $(".song-info").html(songInfo);
   }
    function renderImg(src){
        var img = new Image();
        img.src = src;
        img.onload = function(){
            root.blurImg(img,$(document.body));
            $('.img-wrapper img').attr('src',src);
        }
    }
    function renderIsLike(isLike){
        if(isLike){
            $(".like-btn").addClass("liking");
        }else{
            $(".like-btn").removeClass("liking");
        }
    }
    function render(data){
        renderInfo(data);
        renderImg(data.image);
        renderIsLike(data.isLike);
    }
    root.render = render;
})(window.Zepto,window.player ||(window.player = {}));