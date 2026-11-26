export function homeView(products) {
  const homepage = `
        <main class="py-[150px]  bg-[#F5F5F2] px-5 md:px-10 lg:px-[80px] xl:px-[150px]">
          <div class="border-b-1 border-b-gray-200 mb-12 pb-8">
            <span class="text-[10px] text-[#777a74]">THE COMMON COLLECTION</span>
            <h2 class="text-[48px] font-bold flex flex-col leading-[105%] mb-8 mt-4">
              Good things.
              <span class="text-[#666a83]">
                For your everyday.
              </span>
            </h2>
            <p class="text-[#777a74]">
              Considered essentials for your home, your style, and everything in between.
              Less searching. More finding your thing.
            </p>
          </div>
          <div
          class="grid grid-cols-1 auto-rows-[minmax(350px,auto)] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 "
        >
          ${fillInCards(products)}
        </div>
        </main>`;
  return homepage;
}

export function fillInCards(products) {
  const filledCards = products.map((product) => {
    return `<a
          href=#/product/${product.id}
          class="bg-gray-50 rounded-lg shadow-sm  flex flex-col"
        >
          <img
            src="${product.thumbnail}"
            alt="${product.title}"
            class="rounded-lg h-[350px] w-full object-cover object-center"
          />

          <div class="px-2 py-3 flex flex-col justify-between flex-1">
            <div class="flex justify-between mb-2">
              <span class="text-[#777a74] uppercase text-[14px]">${product.category}</span
              ><span class="text-[#222] font-[500] text-[14px]">$${product.price}</span>
            </div>

            <h2 class="text-[18px] font-semibold text-[#111311]">
              ${product.title}
            </h2>

            <p class="text-[14px] font-[500] text-[#888a8a]">
              ${product.description}
            </p>
            <button

              class="btn-add-to-cart text[-40px] w-full h-12 rounded-lg hover:scale-[1.01] ease-in active:scale-[0.98] transition-all bg-[#111311] text-[#f5f5f2] font-semibold text-[20px] mt-2 cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        </a>`;
  });
  return filledCards.join("");
}
export function onePageProduct(product) {
  const productSection = `
<section class="pt-[150px] bg-[#F5F5F2] px-5 md:px-10 lg:px-[80px] xl:px-[150px] ">
      <span class="text-[12px] text-[#777a74] uppercase">${product.tags}</span>
      <div class="mt-2 pt-2 pb-6 border-y-1 border-gray-300 flex gap-15 flex-col lg:flex-row">
        <img src="${product.images[0]}" alt="${product.title}" class="w-full lg:w-1/3 border-1 border-gray-300 rounded-xl bg-[#e5e5e5]">
        <div class="flex flex-col justify-between p">
          <div class="flex flex-col gap-4">
            <span class="text-[12px] uppercase text-[#888a84]">${product.category}</span>
            <h1 class="text-[36px] font-semibold leading-[110%]">${product.title}</h1>
            <span class="py-4 text-[24px]">$${product.price}</span>
            <p class="text-[#666a63] text-[18px]">${product.description}</p>
          </div>
          <form class="flex gap-3 mt-10">
            <div class="bg-gray-50 border-gray-300 border-1 text-[#444a44] w-30 md:w-36 lg:w-33 h-14 rounded-xl focus-within:outline-emerald-400 focus-within:outline-1 flex" >
              <button id="decrease-quantity" class="cursor-pointer text-[18px] px-2">-</button>
              <input type="number" id="quantity" class="w-full h-full focus:outline-0 p-2" />
              <button id="increase-quantity" class="cursor-pointer text-[18px] px-2">+</button>
            </div>
            <button class="bg-[#111311] text-[#f5f5f5] py-4 w-full rounded-xl">Add To Cart</button>
          </form>
        </div>
      </div>
</section>
  `;
  const reviewsSection = reviews(product.reviews);
  return `${productSection}${reviewsSection}`;
}
function reviews(reviews) {
  const formatedReviews = reviews.map((review) => {
    const letters = review.reviewerName
      .split(" ")
      .map((name) => name[0])
      .join("");
    let date = new Date(review.date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour:"numeric",
      minute:"2-digit"
    });
    return `<div class=" py-4 p-4 border border-gray-300 bg-gray-50 rounded-2xl">
        <div class="flex justify-between flex-wrap">
          <div class="flex gap-3 flex-wrap">
            <span class="w-8 h-8 md:w-12 md:h-12 flex text-[10px] font-semibold md:text-[16px] justify-center items-center bg-gray-400 text-gray-900 rounded-full">${letters}</span>
            <div class="text-gray-600 leading-[110%] flex flex-col justify-center">
              <p>${review.reviewerName}</p>
              <p class="text-[14px] text-gray-400">${review.reviewerEmail}</p>
              <p class="text-[14px] text-gray-500 mt-1">${date}</p>
            </div>
          </div>
          <div class="text-gray-500 ml-auto">${review.rating}/5</div>
        </div>
        <p class="text-gray-800 pt-3 pl-3">${review.comment}</p>
      </div>

    `;
  });
  return `<section class="bg-[#F5F5F2] px-8 md:px-20 py-4 flex flex-col gap-3">
  ${formatedReviews.join("")};
  </section>`;
}
//  "rating": 3,
// "comment": "Would not recommend!",
// "date": "2025-04-30T09:41:02.053Z",
// "reviewerName": "Eleanor Collins",
// "reviewerEmail": "eleanor.collins@x.dummyjson.com"
