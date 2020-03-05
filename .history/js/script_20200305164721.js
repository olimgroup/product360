(function(){
  function ArcSlider(element, setting) {
    this.element = element;
    this.slider = null;
    this.default = {
      page: 36,
      sensitivity: 3,
      auto: false,
      ratio: 2,
    };

    this.initial = {
      width: null,
      height: null,
      index: 0,
      slider: null,
      slide: null,
      image: null,
      isMouseDown: false,
      mouseX: null,
      prevPos: null,
    }

    for(let init in this.initial) {
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

    this.util = new Util();
    console.log(this.util.isMobile());

    this._init();
  }

  ArcSlider.prototype._init = function () {
    const slider = this._makeElementSlider();
    const slide = this._makeElementSlide();
    const image = this._makeElementImage();

    this.slide = slide;
    this.slider = slider;
    this.image = image;

    slide.append(image);
    slider.append(slide);

    this._addEvent();
  }

  ArcSlider.prototype._makeElementSlider = function () {
    const slider = document.querySelector(this.element);
    slider.classList.add(this.classes['slider']);
    slider.style.overflow = 'hidden';
    this.sliderWidth = slider.clientWidth;
    this.height = this.sliderWidth / this.options.ratio;
    return slider;
  }

  ArcSlider.prototype._makeElementSlide = function () {
    const slide = document.createElement('div');
    slide.classList.add(this.classes['slide']);
    slide.style.transform = 'translateX(0)';
    return slide;
  }

  ArcSlider.prototype._makeElementImage = function () {
    const image = document.createElement('div');
    image.classList.add(this.classes['image']);
    image.style.backgroundImage = `url(${this.src})`;
    image.style.height = `${this.height}px`;
    image.style.backgroundSize = `auto ${this.height}px`;
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
    console.log('animation');
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

  ArcSlider.prototype._transform = function () {}

  ArcSlider.prototype.__mousedown = function (e) {
    e.preventDefault();
    console.log('mousedown');
    const x = e.clientX || e.touches[0].clientX;

    this.isMouseDown = true;
    this.mouseX = x;
  }

  ArcSlider.prototype.__mouseup = function (e) {
    // e.preventDefault();
    console.log('mouseup');
    this.isMouseDown = false;
  }

  ArcSlider.prototype.__mousemove = function (e) {
    e.preventDefault();
    console.log('mousemove');
    const x = e.clientX || e.touches[0].clientX;
    console.log(e);
    console.log(this.prevPos);
    console.log(x);

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
    ArcSlider.prototype._mousedown = this.__mousedown.bind(this);
    ArcSlider.prototype._mouseup = this.__mouseup.bind(this);
    ArcSlider.prototype._mousemove = this.__mousemove.bind(this);
    this._resize();

    this.slider.addEventListener('mousedown', this._mousedown);
    this.slider.addEventListener('mouseup', this._mouseup);
    this.slider.addEventListener('mousemove', this._mousemove);

    this.slider.addEventListener('touchstart', this._mousedown);
    this.slider.addEventListener('touchcancel', this._mouseup);
    this.slider.addEventListener('touchmove', this._mousemove);
  }

  ArcSlider.prototype._removeEvent = function () {
    this.slider.removeEventListener('mousedown touchstart', this._mousedown);
    this.slider.removeEventListener('mouseup touchend', this._mouseup);
    this.slider.removeEventListener('mousemove touchmove', this._mousemove);
  }

  ArcSlider.prototype._resize = function () {
    console.log('_resize');
    window.addEventListener('resize', () => {
      console.log('resize');
      this.sliderWidth = this.slider.clientWidth;
      this.height = this.sliderWidth / this.options.ratio;

      this.slide.style.transform = 'translateX(0)';

      this.image.style.backgroundImage = `url(${this.src})`;
      this.image.style.height = `${this.height}px`;
      this.image.style.width = `${this.sliderWidth * this.options.page}px`;
    });
  }

  ArcSlider.prototype.destroy = function () {
    this._removeEvent();
  }

  ArcSlider.prototype.reset = function () {
    this._addEvent();
  }

  function Util() {}

  Util.prototype.isMobile = function () {
    var filter = "win16|win32|win64|mac";
    if (navigator.platform && filter.indexOf(navigator.platform.toLowerCase()) >= 0) {
      return 'web';
    } else {
      return 'mobile';
    }
  }

  window.ArcSlider = ArcSlider;
})(window);


