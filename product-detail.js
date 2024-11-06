// nursahtuncel-OC-29-ımplement the you might also like section start

// let nt_price = document.querySelectorAll(".nt-new-price-old-price-1");
// console.log(nt_price);

// fetch("https://fakestoreapi.com/products")
//   .then((res) => res.json())
//   .then((veri) => {
//     veri.forEach((element, index) => {
//       console.log(element.price);

//       // Her bir öğeye yeni fiyat eklemek için:
//       if (nt_price[index]) {
//         // Eğer nt_price öğesi varsa
//         nt_price[
//           index
//         ].innerHTML = `<p class="nt-new-price-old-price-1">${element.price}</p>`;
//       } else {
//         // Eğer index'te öğe yoksa, bir öğe eklemek istiyorsanız
//         // document.body veya başka bir kapsayıcıya ekleyebilirsiniz.
//         element.price.innerHTML += `<p class="nt-new-price-old-price-1">${element.price}</p>`;
//       }
//     });
//   });

//    nursahtuncel-OC-29-ımplement the you might also like section start
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((ver) => {
    ver.forEach((element, index) => {
      console.log(element.image);
    });
  });
