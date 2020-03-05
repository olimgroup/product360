function ArcSlider(element, setting) {
  this.slider = element;
  this.setting = setting;
}


const slider = document.getElementById('slider');
const slide = slider.querySelector('.slide');
const width = 1280;
let count = 0;
const LIMIT = 35;
const MULTIPLE = 2;

// const ani = setInterval(slideAni, 50);

function slideAni () {
  // console.log('slideAni', count);
  if (count > LIMIT * MULTIPLE) {
    // clearInterval(ani);
    count = 0;
  } else if (count < 0) {
    count = LIMIT * MULTIPLE;
  }

  console.log(LIMIT);
  console.log(count);
  console.log(count % MULTIPLE);

  if (count % MULTIPLE === 0) {
    console.log(count, count % MULTIPLE);
    slide.style.transform = `translateX(-${width * (count / MULTIPLE)}px)`;
  }
}

let isMouseDown = true;
let mouseX;
let prevPos;

// slider.addEventListener('mousedown', (e) => {
//   // console.log('mousedown');
//   isMouseDown = true;
//   mouseX = e.clientX;
//   console.log(e.clientX);
// });

document.addEventListener('mouseup', () => {
  // console.log('mouseup');
  isMouseDown = false;
});

document.addEventListener('mousemove', (e) => {
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