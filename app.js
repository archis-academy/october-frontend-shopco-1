// nt-header-start...........................

function toggleMenu() {
  const navMenu = document.querySelector(".nt-hamburger-menu-2");
  navMenu.classList.toggle("active");
}
function toggleSearch() {
  const searchBox = document.querySelector(".nt-secret-search-box");
  searchBox.classList.toggle("active");
}
// nt-header-end............................

//ctt-slider-btn______________Start
const prev = document.getElementById('prev');
const next = document.getElementById('next');

const slider = document.querySelector('.slider');

const slide = document.querySelector('.slide');

next.addEventListener('click', () => {

  slider.scrollLeft += slide.scrollWidth +20
  console.log(slider.scrollLeft)
})

prev.addEventListener('click', () => {

  slider.scrollLeft -= slide.scrollWidth + 20
  console.log(slider.scrollLeft)
})



//ctt-slider-btn______________End
