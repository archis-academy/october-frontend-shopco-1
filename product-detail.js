// nursahtuncel-OC-29-ımplement the you might also like section start

let priceList = [];

const getNewPrice = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((list) => {
      priceList = list;
      createPriceHtml();
    });
};

const createPriceHtml = () => {
  let newPriceEl = document.querySelectorAll(".nt-new-price-old-price-1");

  priceList.forEach((eleman, index) => {
    if (newPriceEl[index]) {
      newPriceEl[
        index
      ].innerHTML = `<p class="nt-new-price-old-price-1">$${eleman.price}</p>`;
    }
  });
};

getNewPrice();

// nursahtuncel-OC-29-ımplement the you might also like section end
