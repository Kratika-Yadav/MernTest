const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

const nextSlide = () => {
  currentSlide++;
  if (currentSlide > slides.length - 1) {
    currentSlide = 0;
  }
  slides.forEach((slide, index) => {
    slide.style.opacity = index === currentSlide? 1 : 0;
  });
};

const prevSlide = () => {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  slides.forEach((slide, index) => {
    slide.style.opacity = index === currentSlide? 1 : 0;
  });
};

document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);

setInterval(nextSlide, 1000);