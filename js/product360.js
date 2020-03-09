(function () {
  function Product360(element, setting) {
    this.element = element;
    this.slider = null;
    this.default = {
      page: 32,
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
      isMobile: null,
      sliderHeight: null,
      sliderWidth: null,
      initFn: null,
      loadedFn: null,
    }

    for (let init in this.initial) {
      this[init] = this.initial[init];
    }

    this.classes = {
      slider: 'pd-slider',
      slide: 'pd-slide',
      image: 'pd-image',
    }

    this.options = Object.assign({}, this.default, setting);
    this.options.init && this.options.init();
    this.src = this.options.src;
    this.image = setting.image;

    this.util = new Util();
    this.isMobile = this.util.isMobile();

    this.util.imageLoad(this.src, (x, y) => {
      this.width = x / this.options.page;
      this.height = y;
      this._init();
      this.options.loaded && this.options.loaded();
    });
  }

  Product360.prototype._init = function () {
    const slider = this._makeElementSlider();
    const image = this._makeElementImage();

    this.slider = slider;
    this.image = image;

    this._initStyle();

    slider.append(image);

    this._addEvent();
  }

  Product360.prototype._makeElementSlider = function () {
    const slider = document.querySelector(this.element);
    slider.classList.add(this.classes['slider']);

    return slider;
  }

  Product360.prototype._makeElementImage = function () {
    const image = document.createElement('div');
    image.classList.add(this.classes['image']);

    return image;
  }

  Product360.prototype._initStyle = function () {
    this.slider.style.overflow = 'hidden';

    this.ratio = this.slider.clientWidth / this.width;
    this.sliderWidth = this.width * this.ratio;
    this.sliderHeight = this.height * this.ratio;

    this.image.style.backgroundImage = `url(${this.src})`;
    this.image.style.height = `${this.sliderHeight}px`;
    this.image.style.backgroundSize = `auto ${this.sliderHeight}px`;
  }

  Product360.prototype._animation = function () {
    const page = this.options.page - 1;
    const sensitivity = this.options.sensitivity;

    if (this.index > page * sensitivity) {
      this.index = 0;
    } else if (this.index < 0) {
      this.index = page * sensitivity;
    }

    if (this.index % sensitivity === 0) {
      this.image.style.backgroundPosition = `-${this.sliderWidth * (this.index / this.options.sensitivity)}px 0`;
    }
  }

  Product360.prototype.__mousedown = function (e) {
    const x = e.clientX || e.touches[0].clientX;

    this.isMouseDown = true;
    this.mouseX = x;
    e.preventDefault();
  }

  Product360.prototype.__mouseup = function (e) {
    this.isMouseDown = false;
    e.preventDefault();
  }

  Product360.prototype.__mousemove = function (e) {
    const x = this.isMobile ? e.touches[0].clientX : e.clientX;

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
    e.preventDefault();
  }

  Product360.prototype._addEvent = function () {
    Product360.prototype._mousedown = this.__mousedown.bind(this);
    Product360.prototype._mouseup = this.__mouseup.bind(this);
    Product360.prototype._mousemove = this.__mousemove.bind(this);
    this._resize();

    if (this.isMobile) {
      this.slider.addEventListener('touchstart', this._mousedown);
      this.slider.addEventListener('touchcancel', this._mouseup);
      this.slider.addEventListener('touchmove', this._mousemove);
    } else {
      this.slider.addEventListener('mousedown', this._mousedown);
      this.slider.addEventListener('mouseup', this._mouseup);
      this.slider.addEventListener('mousemove', this._mousemove);
    }
  }

  Product360.prototype._removeEvent = function () {
    if (this.isMobile) {
      this.slider.removeEventListener('touchstart', this._mousedown);
      this.slider.removeEventListener('touchcancel', this._mouseup);
      this.slider.removeEventListener('touchmove', this._mousemove);
    } else {
      this.slider.removeEventListener('mousedown', this._mousedown);
      this.slider.removeEventListener('mouseup', this._mouseup);
      this.slider.removeEventListener('mousemove', this._mousemove);
    }
  }

  Product360.prototype._resize = function () {
    window.addEventListener('resize', () => {
      this._initStyle();
      this.image.style.backgroundPosition = `0 0`;
    });
  }

  Product360.prototype.destroy = function () {
    this._removeEvent();
  }

  Product360.prototype.reset = function () {
    this._addEvent();
  }

  Product360.prototype.init = function (callback) {
    this.initFn = callback;
    console.log(callback);
  }

  Product360.prototype.loaded = function (callback) {
    this.loadedFn = callback;
    console.log(callback);
  }

  // Util
  function Util() { }

  Util.prototype.isMobile = function () {
    var UserAgent = navigator.userAgent;

    if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
      return true;
    } else {
      return false;
    }
  }

  Util.prototype.imageLoad = function (src, callback) {
    const img = new Image();
    img.src = src;
    img.addEventListener('load', (e) => {
      console.log(e);
      if (e.target) {
        callback(e.target.width, e.target.height);
      } else {
        callback(e.path[0].width, e.path[0].height);
      }
    });
  }

  window.Product360 = Product360;
})(window);
