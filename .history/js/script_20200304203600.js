function ArcSlider(element, setting) {
  this.element = element;
  this.slider = null;
  this.default = {
    page: 36,
    sensitivity: 3,
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

  this.options = Object.assign({}, this.default, setting);
  this.src = this.options.src;
  this.image = setting.image;

  console.log(this.options);

  this.mousedown = this._mousedown.bind(this);
  this.mouseup = this._mouseup.bind(this);
  this.mousemove = this._mousemove.bind(this);

  this._init();
  this._addEvent();
  this.getImageSize(this.options.src);
}

ArcSlider.prototype._init = function () {
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
  image.style.width = `${this.sliderWidth * this.options.page}px`;
  return image;
}

ArcSlider.prototype.getImageSize = function (src) {
  const img = new Image();
  img.src = src;
  img.addEventListener('load', (e) => {
    console.log(e.path[0].width, e.path[0].height);
  });
}

ArcSlider.prototype._animation = function () {
  const page = this.options.page - 1;
  const sensitivity = this.options.sensitivity;

  if (this.index > page * sensitivity) {
    this.index = 0;
  } else if (this.index < 0) {
    this.index = page * sensitivity;
  }

  if (this.index % sensitivity === 0) {
    this.slide.style.transform = `translateX(-${this.sliderWidth * (this.index / sensitivity)}px)`;
  }
}

ArcSlider.prototype._mousedown = function (e) {
  const x = e.clientX;

  this.isMouseDown = true;
  this.mouseX = x;
}

ArcSlider.prototype._mouseup = function () {
  this.isMouseDown = false;
}

ArcSlider.prototype._mousemove = function (e) {
  const x = e.clientX;

  if (this.prevPos !== x) {
    if (this.isMouseDown) {
      if (x < this.prevPos) {
        this.index--;
      } else {
        this.index++;
      }

      this._animation();
    }
  }

  this.prevPos = x;
}

ArcSlider.prototype._addEvent = function () {
  this.slider.addEventListener('mousedown', this.mousedown);
  this.slider.addEventListener('mouseup', this.mouseup);
  this.slider.addEventListener('mousemove', this.mousemove);
}

ArcSlider.prototype._removeEvent = function () {
  this.slider.removeEventListener('mousedown', this.mousedown);
  this.slider.removeEventListener('mouseup', this.mouseup);
  this.slider.removeEventListener('mousemove', this.mousemove);
}

const arcSlider = new ArcSlider('#arc-slider', {
  src: 'img/slide.jpg',
  sensitivity: 10,
});

console.log(arcSlider);
