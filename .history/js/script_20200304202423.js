/*
  {
    LIMIT: 장수,
    WIDTH: 한 장 넓이,
    UNIT(MULTIPLE): 슬라이더의 세밀함(낮을수록 세밀),
    index(count): 현재 슬라이드 인덱스,
  }

*/

function ArcSlider(element, setting) {
  this.element = element;
  this.slider = null;
  this.default = {
    RATIO: 2,
    PAGE: 36,
    UNIT: 3,
  };

  this.initial = {
    width: null,
    height: null,
    sliderWidth: null,
    index: 0,
    slider: null,
    slide: null,
    isMouseDown: false,
    mouseX: null,
    prevPos: null,
  }

  for( let init in this.initial) {
    this[init] = this.initial[init];
  }

  this.classes = {
    slider: 'arc-slider',
    slide: 'arc-slide',
    image: 'arc-image',
  }

  this.option = Object.assign({}, this.default, setting);
  this.src = this.option.src;
  this.image = setting.image;

  console.log(this.option);

  this.mousedown = this._mousedown.bind(this);
  this.mouseup = this._mouseup.bind(this);
  this.mousemove = this._mousemove.bind(this);

  this.init();
  this.addEvent();
  this.getImageSize(this.option.src);
}

ArcSlider.prototype.init = function () {
  const slider = this.makeElementSlider();
  const slide = this.makeElementSlide();
  const image = this.makeElementImage();

  this.slide = slide;
  this.slider = slider;

  slide.append(image);
  slider.append(slide);
}

ArcSlider.prototype.makeElementSlider = function () {
  const slider = document.querySelector(this.element);
  slider.classList.add(this.classes['slider']);
  slider.style.overflow = 'hidden';
  this.sliderWidth = slider.clientWidth;
  this.height = this.sliderWidth / 2;
  return slider;
}

ArcSlider.prototype.makeElementSlide = function () {
  const slide = document.createElement('div');
  slide.classList.add(this.classes['slide']);
  slide.style.transform = 'translateX(0)';
  return slide;
}

ArcSlider.prototype.makeElementImage = function () {
  const image = document.createElement('div');
  image.classList.add(this.classes['image']);
  image.style.backgroundImage = `url(${this.src})`;
  image.style.backgroundSize = 'auto 100%';
  image.style.height = `${this.height}px`;
  image.style.width = `${this.sliderWidth * this.default.PAGE}px`;
  return image;
}

ArcSlider.prototype.getImageSize = function (src) {
  const img = new Image();
  img.src = src;
  img.addEventListener('load', (e) => {
    console.log(e.path[0].width, e.path[0].height);
  });
}

ArcSlider.prototype.animation = function () {
  const { PAGE, UNIT } = this.default;

  if (this.index > PAGE * UNIT) {
    this.index = 0;
  } else if (this.index < 0) {
    this.index = PAGE * UNIT;
  }

  if (this.index % UNIT === 0) {
    this.slide.style.transform = `translateX(-${this.sliderWidth * (this.index / UNIT)}px)`;
  }
}

ArcSlider.prototype._mousedown = function (e) {
  console.log(e);
  const x = e.clientX;
  console.log(x);

  this.isMouseDown = true;
  this.mouseX = x;
}

ArcSlider.prototype._mouseup = function () {
  this.isMouseDown = false;
}

ArcSlider.prototype._mousemove = function (e) {

  console.log('move');
  const x = e.clientX;

  if (this.prevPos !== x) {
    if (this.isMouseDown) {
      if (x < this.prevPos) {
        this.count--;
      } else {
        this.count++;
      }

      this.animation();
    }
  }

  this.prevPos = x;
}

ArcSlider.prototype.addEvent = function () {
  this.slider.addEventListener('mousedown', this.mousedown);
  this.slider.addEventListener('mouseup', this.mouseup);
  this.slider.addEventListener('mousemove', this.mousemove);
}

ArcSlider.prototype.removeEvent = function () {
  this.slider.removeEventListener('mousedown', this.mousedown);
  this.slider.removeEventListener('mouseup', this.mouseup);
  this.slider.removeEventListener('mousemove', this.mousemove);
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
const MULTIPLE = 3;

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