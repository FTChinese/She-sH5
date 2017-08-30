/*********for ccVideo**********/

    var player = [];
    var myButton = document.getElementById("coverplayBtn");
    function onPlayStart(vid) {
        console.log("play start");
        player[vid].setVolume(0);
        player[vid].seek(0);//定位至指定时间，参数time（单位：秒）	
        //document.getElementById("video" + vid).style.display = "";
        /*
        myButton.style.display = "block";
        myButton.addEventListener('click',function() {
          player[vid].resume();
          myButton.style.display = "none";
        });
        */
    }
    function onPlayPause(vid) {
      console.log("play pause");
      //const config = {};

      
      //config.bigbutton_enable = 1;//显示非自动播放时播放器中间的开始按钮
      //player[vid].setConfig(config);
      //player[vid].seek(0);
       myButton.style.display = "block";
        myButton.addEventListener('click',function() {
          console.log("here");
          player[vid].resume();
          myButton.style.display = "none";
        });
    }
    function onPlayStop(vid) {
        console.log("play stop");
        //player[vid].seek(0);
        player[vid].start();
       // document.getElementById("video" + vid).style.display = "none";
    }

    function onPlayResume(vid) {
        //document.getElementById("video" + vid).style.display = "";
        myButton.style.display = "none";
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
        console.log("play init");
        var config = {};
        config.control_enable = 1;
        config.loadingpic_enable = 1;//启用缓冲片头
        config.loading_enable = 1;//显示loading图标
        config.tip_enable = 0;//不显示播放器顶部的提示条
        config.progressbar_enable = 1;//可操作进度条
        config.bigbutton_enable = 0;//显示非自动播放时播放器中间的开始按钮
        config.rightmenu_enable = 0;//不启用右侧菜单
        
        config.on_player_start = "onPlayStart('" + vid + "')";//开始播放时回调JS函数的名称，默认为 on_spark_player_start
        config.on_player_pause = "onPlayPause('" + vid + "')";//暂停播放时回调JS函数的名称，默认为 on_spark_player_pause
        config.on_player_stop = "onPlayStop('" + vid + "')";//播放结束后回调JS函数的名称，默认为 on_spark_player_stop
        config.on_player_resume = "onPlayResume('" + vid + "')";//暂停后继续播放时回调JS函数的名称，默认为 on_spark_player_resume
        //config.on_player_buffering	= "onPlayResume('" + vid + "')";

        player[vid] = getSWF(objectID);
        player[vid].setConfig(config);
        player[vid].seek(0);
        //player[vid].start();
        //myButton.style.display = "block";
    }