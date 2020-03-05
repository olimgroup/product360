function ArcSlider(element, setting) {
  this.slider = element;
  this.setting = setting;
}


const slider = document.getElementById('slider');
const slide = slider.querySelector('.slide');
const width = 1280;
let count = 0;

const ani = setInterval(() => {
  if (count > 35) {
    clearInterval(ani);
    count = 0;
  }

  slide.style.transform = `translateX(-${width * count}px)`
  count++;

}, 10);