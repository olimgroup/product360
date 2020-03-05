function ArcSlider(element, setting) {
  this.slider = element;
  this.setting = setting;
}


const slider = document.getElementById('slider');
const slide = slider.querySelector('.slide');
const width = 1280;
const count = 0;

setInterval(() => {
  slide.getElementsByClassName.transform = `translateX(${width * count}px)`
  count++;
}, 1000);