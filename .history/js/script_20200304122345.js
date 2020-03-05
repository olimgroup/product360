function ArcSlider(element, setting) {
  this.slider = element;
  this.setting = setting;
}


const slider = document.getElementById('slider');
const slide = slider.querySelector('.slide');
const width = 1280;
let count = 0;

// const ani = setInterval(slideAni, 50);

function slideAni () {
  if (count > 35) {
    // clearInterval(ani);
    count = 0;
  }

  slide.style.transform = `translateX(-${width * count}px)`;
  count++;
}

let isMouseDown = false;
let mouseX = 0;

slider.addEventListener('mousedown', (e) => {
  console.log('mousedown');
  isMouseDown = true;
  mouseX = e.clientX;
  console.log(e.clientX);
});

slider.addEventListener('mouseup', () => {
  console.log('mouseup');
  isMouseDown = false;
});

slider.addEventListener('mousemove', (e) => {
  if (isMouseDown) {
    if (e.clientX < mouseX) {
      count--;
    } else {
      count++;
    }
    console.log(count);
    slideAni();
    console.log('mouseX', mouseX);
    console.log('mousemove', e.clientX);
  }
});