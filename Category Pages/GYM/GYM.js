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
  
  // esra-OC-6-implement-promo-banner-start
  
  document
    .querySelector(".ip-banner-close-icon")
    .addEventListener("click", function () {
      document.querySelector(".implement-promo-banner").style.display = "none";
    });
  
  // esra-OC-6-implement-promo-banner-end

  document.addEventListener("DOMContentLoaded", function() {
    const minRange = document.getElementById("minRange");
    const maxRange = document.getElementById("maxRange");
    const minValue = document.getElementById("minValue");
    const maxValue = document.getElementById("maxValue");

    minRange.addEventListener("input", function() {
        const minVal = parseInt(minRange.value);
        const maxVal = parseInt(maxRange.value);

        if (minVal > maxVal) {
            minRange.value = maxVal;
        } else {
            minValue.textContent = minVal;
        }
    });

    maxRange.addEventListener("input", function() {
        const minVal = parseInt(minRange.value);
        const maxVal = parseInt(maxRange.value);

        if (maxVal < minVal) {
            maxRange.value = minVal;
        } else {
            maxValue.textContent = maxVal;
        }
    });
});
