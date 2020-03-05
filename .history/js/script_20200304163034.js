/*
  {
    LIMIT: 장수,
    WIDTH: 한 장 넓이,
    UNIT(MULTIPLE): 슬라이더의 세밀함(낮을수록 세밀),
    index(count): 현재 슬라이드 인덱스,
  }

*/

function ArcSlider(element, setting) {

  console.log(setting);

  this.element = element;
  this.slider = null;
  this.default = {
    RATIO: 2,
    width: null,
    height: null,
  };

  this.classes = {
    slider: 'arc-slider',
    slide: 'arc-slide',
    image: 'arc-image',
  }

  this.option = Object.assign({}, this.default, setting);
  this.image = setting.image;

  console.log(this.option);

  this.init();
  this.getImageSize(this.option.src);
}

ArcSlider.prototype.init = function () {
  // const { slider, slide, image } = this.classes;
  const slider = document.querySelector(this.element);
  const slide = document.createElement('div');
  const image = document.createElement('div');

  slider.classList.add(this.classes['slider']);
  slide.classList.add(this.classes['slide']);
  image.classList.add(this.classes['image']);
  // this.slider =
  this.width = slider.clientWidth;
  this.height = this.width / 2;

  slider.style.overflow = 'hidden';
  slide.style.transform = 'translateX(0)';
  console.dir(slider);

  console.log(this.option.src);
  image.style.backgroundImage = `url(${this.option.src})`;
  image.style.backgroundSize = 'auto 100%';
  console.log(this.height);
  image.style.height = this.height;

  slide.append(image);
  slider.append(slide);
}

ArcSlider.prototype.getImageSize = function (src) {
  const img = new Image();
  img.src = src;
  img.addEventListener('load', (e) => {
    console.log(e.path[0].width, e.path[0].height);
  });
}

const arcSlider = new ArcSlider('#arc-slider', {
  src: 'img/slide.jpg',
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