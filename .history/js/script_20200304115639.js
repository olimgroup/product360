function ArcSlider(element, setting) {
  this.slider = element;
  this.setting = setting;
}


const slider = document.getElementById('slider');
const slide = slider.querySelector('.slide');
const width = 1280;
let count = 0;

setInterval(() => {
  slide.style.transform = `translateX(${width * count}px)`
  count++;
}, 1000);