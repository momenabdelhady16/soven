export function cartView([data, metaMap]) {
  let [rows, total] = fillInRows(data, metaMap);
  return `
                <section class="py-[150px]  bg-[#F5F5F2] px-5 md:px-10 lg:px-[80px] xl:px-[150px] flex flex-col gap-8">
                   <div class="flex flex-col gap-5">
                        <h1 class="text-[48px] flex flex-col leading-[110%]">
                            <span class="font-semibold">Your everyday,</span>
                            <span class="font-500 text-gray-500">coming together.</span>
                        </h1>
                        <p class="text-gray-500 text-[14px]">${metaMap.size} ${metaMap.size > 1 ? "items" : "item"} in your cart. A little less, but a little better.</p>
                   </div>
                   <div class="flex items-start gap-6">
                        <table class="flex-1 text-left table-fixed">
                            <thead >
                                <tr class="border-b-1 border-gray-400 *:pb-3 text-gray-500" >
                                    <th class="w-50">Product</th>
                                    <th class="w-4/7"></th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rows}
                            </tbody>
                        </table>
                        <div class="bg-gray-200 w-1/4 h-full flex flex-col gap-4 p-6 rounded-2xl">
                            <h2 class="text-[20px] text-gray-900 ">The good stuff, summed up.</h2>
                            <p class="text-gray-500 text-[12px]">Your order qualifies for complimentary shipping.</p>
                            <div class="w-full h-1 bg-emerald-400 rounded-full"></div>
                            <div class="border-y-1 border-gray-300 py-4 flex justify-between">
                                <p class="text-[13px] text-gray-500">Subtotal (${metaMap.size} ${metaMap.size > 1 ? "items" : "item"})</p>
                                <span class="text-gray-800 text-[14px]">$${total.toFixed(2)}</span>
                            </div>
                            <div class="flex justify-between">
                                <div>
                                    <p>Item total</p>
                                    <span class="text-gray-500 text-[12px]">USD · Before taxes</span>
                                </div>
                                <span class="text-[24px]">$${total.toFixed(2)}</span>
                            </div>
                            <button class="bg-[#111311] text-gray-50 font-semibold p-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all ease-in-out">Checkout</button>
                        </div>
                   </div>
                </section>
    `;
}
function totalPrice(data) {
  const result = data.reduce((acc, item) => (acc += item.price), 0);
  return result;
}
function fillInRows(data, metaMap) {
  let totalPrices = 0;
  data.forEach((item) => {
    item.quantityInCart = metaMap.get(item.id);
  });
  const formatedRows = data
    .map((item) => {
      totalPrices = totalPrices + item.price * item.quantityInCart;
      return `
        <tr class="border-t-1 border-gray-300">
            <td>
                <Img class="h-40 object-cover object-center mr-6" src="${item.thumbnail}" alt="${item.title}"/>
            </td>
            <td class="h-full">
                <div class="flex flex-col mx-6">
                    <span class=" my-2 text-[12px] text-gray-500">${item.category}</span>
                    <p class="text-[20px] font-500">${item.title}</p>
                    <span class="mt-2 mb-1 text-gray-500">$${item.price} each</span>
                    <button class="w-fit text-gray-500 underline hover:cursor-pointer">Remove</button>
                </div>
            </td>
            <td>
                <form class="bg-gray-50 border-gray-300 border-1 text-[#444a44] w-30 md:w-36 lg:w-33 rounded-xl focus-within:outline-emerald-400 focus-within:outline-1 flex mr-6" >
                    <button data-id = "${item.id}" data-value=1 class="btn-remove-one cursor-pointer text-[18px] px-2">-</button>
                    <input type="number" id="quantity" class="w-full focus:outline-0 p-2" value="${item.quantityInCart}"/>
                    <button data-id = "${item.id}" data-value=1 class="btn-add-one cursor-pointer text-[18px] px-2">+</button>
                </form>
            </td>
            <td class="text-[18px] font-semibold mr-4">$${(item.price * item.quantityInCart).toFixed(2)}</td>
        </tr>
    `;
    })
    .join("");
  return [formatedRows, totalPrices];
}
