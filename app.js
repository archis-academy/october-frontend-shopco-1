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

//ctt-slider______________Start
//
document.addEventListener("DOMContentLoaded", function () {
  fetch('./constants/yorumlar.json')
    .then(response => response.json())
    .then(testimonials => {
      const sliderContainer = document.querySelector('.slider');

      testimonials.forEach(testimonial => {
        const slide = document.createElement('div');
        slide.classList.add('slide');

        const starRate = document.createElement('div');
        starRate.classList.add('star-rate');

        const user = document.createElement('div');
        user.classList.add('user');
        const userName = document.createElement('h4');
        userName.innerText = testimonial.user;
        const userImage = document.createElement('img');
        userImage.src = './images/Create the Testimonial/approved user.svg';
        user.appendChild(userName);
        user.appendChild(userImage);

        const review = document.createElement('div');
        review.classList.add('review');
        review.innerHTML = `<p>${testimonial.review}</p>`;

        slide.appendChild(starRate);
        slide.appendChild(user);
        slide.appendChild(review);

        sliderContainer.appendChild(slide);
      });


      //Button of slider
      const prev = document.getElementById('prev');
      const next = document.getElementById('next');

      const slider = document.querySelector('.slider');

      const slide = document.querySelector('.slide');

      next.addEventListener('click', () => {

        slider.scrollLeft += slide.scrollWidth + 20
        console.log(slider.scrollLeft)
      })

      prev.addEventListener('click', () => {

        slider.scrollLeft -= slide.scrollWidth + 20
        console.log(slider.scrollLeft)
      })

        .catch(error => {
          console.error('Error code: OC-18', error);
        });
    })

});

//ctt-slider______________End
