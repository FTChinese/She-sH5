/*********for carousel**********/
const slideWords = ["遇见知己，更看见自己。<br>加入She's Mercedes，与全球精英女性光彩相映。",
  "Words for slide1",
  "Words for slide2"
];
const wordElem = document.getElementById("wordContainer");

const swiperContainer = new Swiper ('#swiperContainer', {
  //loop:true,
  pagination:'.swiper-pagination',
  //autoplay:3000,
  autoplayDisableOnInteraction: false,
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




