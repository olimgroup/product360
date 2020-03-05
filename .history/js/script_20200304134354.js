function ArcSlider(element, setting) {
  this.slider = element;
  this.setting = setting;
}


const slider = document.getElementById('slider');
const slide = slider.querySelector('.slide');
const width = 1280;
let count = 0;
const LIMIT = 35;

// const ani = setInterval(slideAni, 50);

function slideAni () {
  // console.log('slideAni', count);
  if (count > LIMIT * 2) {
    // clearInterval(ani);
    count = 0;
  } else if (count < 0) {
    count = LIMIT * 2;
  }

  console.log(LIMIT);
  console.log(count);

  if (LIMIT % 2 === 0) {
    console.log('LIMIT');
    slide.style.transform = `translateX(-${width * (count / 2)}px)`;
  }
  // count++;
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

slider.addEventListener('mouseup', () => {
  // console.log('mouseup');
  isMouseDown = false;
});

slider.addEventListener('mousemove', (e) => {
  if (prevPos !== e.clientX) {
    if (isMouseDown) {
      console.log('prevmousemove', prevPos);
      console.log('mousemove', e.clientX);

      if (e.clientX < prevPos) {
        // console.log('count--');
        count--;
      } else {
        // console.log('count++');
        count++;
      }
      // console.log(count);
      slideAni();
      // console.log('mouseX', mouseX);
    }
  }



  prevPos = e.clientX;
});