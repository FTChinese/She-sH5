
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


