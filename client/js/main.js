/*********for carousel**********/
const slideWords = ["Words for slide0",
  "Words for slide1",
  "Words for slide2"
];
const wordElem = document.getElementById("wordContainer");

const swiperContainer = new Swiper ('#swiperContainer', {
  loop:true,
  pagination:'.swiper-pagination',
  onSlideChangeEnd:function(swiper) {
    const activeSlideIndex = swiper.realIndex;
    console.log(activeSlideIndex);
    wordElem.innerHTML = slideWords[activeSlideIndex];
  }
});

/*
function video(obj) {
   const v = document.getElementById("videoContainer");
   v.src = obj.copies[0].playurl;
   console.log(v.src);

  /*
    v.controls = true;
    v.volume = 0;
    v.muted = true;
    v.poster = obj.img;
  
}
*/

 //var player1 = getSWF( "cc_461A1C4F1296FA649C33DC5901307461" );
//on_cc_player_init("cc_video_461A1C4F1296FA649C33DC5901307461_1665838","cc_461A1C4F1296FA649C33DC5901307461");

/*********for ccVideo**********/

    var player = [];

    function onPlayStart(vid) {
        player[vid].setVolume(0);
        document.getElementById("video" + vid).style.display = "";
    }

    function onPlayStop(vid) {
        document.getElementById("video" + vid).style.display = "none";
    }

    function onPlayResume(vid) {
        document.getElementById("video" + vid).style.display = "";
    }

    function getSWF(swfID) {
        if (window.document[swfID]) {
            return window.document[swfID];
        } else if (navigator.appName.indexOf("Microsoft") == -1) {
            if (document.embeds && document.embeds[swfID]) {
                return document.embeds[swfID];
            }
        } else {
            return document.getElementById(swfID);
        }
    }

    function on_cc_player_init(vid, objectID) {
        var config = {};
        //config.control_enable = 0;
        config.loading_enable = 0;
        config.tip_enable = 0;
        //config.bigbutton_enable = 0;
        config.play_start_time = 0;
        config.on_player_start = "onPlayStart('" + vid + "')";
        config.on_player_stop = "onPlayStop('" + vid + "')";
        config.on_player_resume = "onPlayResume('" + vid + "')";

        player[vid] = getSWF(objectID);
        player[vid].setConfig(config);
    }

    function on_spark_player_start() {
        for (var vid in player) {
            player[vid].setVolume(0);
        }

    }

