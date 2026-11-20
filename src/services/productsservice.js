const api = "https://dummyjson.com/products";
export async function getAllProducts() {
  const data = await fetch(api);
  if (!data.ok) {
    throw new Error(`HTTP Error: ${data.status}`);
  }
  return data.json();
}
export async function getOneProduct(productId) {
  const product = await fetch(`https://dummyjson.com/products/${productId}`);
  if (!product.ok) {
    throw new Error(`HTTP Error: ${product.status}`);
  }
  return product.json();
}
