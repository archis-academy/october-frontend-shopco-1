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

        for (let i = 0; i < testimonial.starRate; i++) {
          const starImage = document.createElement('img');
          starImage.src = './images/Create the Testimonial/Star.svg'
          starRate.appendChild(starImage)
        }

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

      next.addEventListener('click', () => {
        const slideWidth = document.querySelector('.slide').offsetWidth;
        if (sliderContainer.scrollLeft + sliderContainer.offsetWidth >= sliderContainer.scrollWidth) {
          sliderContainer.scrollLeft = 0;
        } else {
          sliderContainer.scrollLeft += slideWidth;
        }
        console.log(sliderContainer.scrollLeft);
      });

      prev.addEventListener('click', () => {
        const slideWidth = document.querySelector('.slide').offsetWidth;
        if (sliderContainer.scrollLeft <= 0) {
          sliderContainer.scrollLeft = sliderContainer.scrollWidth - sliderContainer.offsetWidth;
        } else {
          sliderContainer.scrollLeft -= slideWidth;
        }
        console.log(sliderContainer.scrollLeft);
      });
    })

    .catch(error => {
      console.error('Error code: OC-18', error);
    });
});

//ctt-slider______________End
