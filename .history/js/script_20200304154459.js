function ArcSlider(element, setting) {

  console.log(this.setting);

  this.element = element;
  this.slider = null;
  this.default = {
    ratio: 2,
  };

  this.options = Object.assign({}, this.default, this.setting);
  this.image = setting.image;

  console.log(this.options);

  this.init();
}

ArcSlider.prototype.init = function () {
  const slider = null;
  const slide = null;
  const image = null;
  // this.slider =
}

ArcSlider.prototype.getImageSize = function () {
  const img = new Image();
  img.src = src;
  img.addEventListener('load', (e) => {
    console.log(e);
  });
}

const arcSlider = new ArcSlider('#arc-slider', {
  src: '../img/slide.jpg',
});

console.log(arcSlider);

const slider = document.getElementById('slider');
const slide = slider.querySelector('.slide');
const width = 1280;
let count = 0;
const LIMIT = 35;
const MULTIPLE = 2;

// const ani = setInterval(slideAni, 50);

function slideAni() {
  if (count > LIMIT * MULTIPLE) {
    count = 0;
  } else if (count < 0) {
    count = LIMIT * MULTIPLE;
  }

  if (count % MULTIPLE === 0) {
    slide.style.transform = `translateX(-${width * (count / MULTIPLE)}px)`;
  }
}

let isMouseDown = false;
let mouseX;
let prevPos;

slider.addEventListener('mousedown', (e) => {
  // console.log('mousedown');
  isMouseDown = true;
  mouseX = e.clientX;
  console.log(e.clientX);
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
});

document.addEventListener('mousemove', (e) => {
  if (prevPos !== e.clientX) {
    if (isMouseDown) {
      if (e.clientX < prevPos) {
        count--;
      } else {
        count++;
      }

      slideAni();
    }
  }

  prevPos = e.clientX;
});