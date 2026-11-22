const api = "https://dummyjson.com/products";
export async function getAllProducts() {
  const data = await fetch(api);
  if (!data.ok) {
    throw new Error(`HTTP Error: ${data.status}`);
  }
  const json = await data.json();
  return json.products;
}
export async function getOneProduct(productId) {
  const product = await fetch(`${api}/${productId}`);
  if (!product.ok) {
    throw new Error(`HTTP Error: ${product.status}`);
  }
  const json = await data.json();

  return json;
}
