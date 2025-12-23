import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";

export async function getProducts() {
  const response = await fetch('http://localhost:3000/api/products');
  const products = await response.json();
  return products;
}

export default async function Home() {
  const products = await getProducts();

  let painting = null;
  let stickers = [];

  for (let product of products) {
    // check if this is Stripe's list object
    if (product.data) {
      // flatten the data array
      stickers.push(...product.data);
      continue;
    }

    // static painting
    if (product.name === 'Angkor Wat') {
      painting = product;
      continue;
    }
  }

  return (
    <div>
      <ImageBanner />
      <section>
        <Products painting={painting} stickers={stickers} />
      </section>
    </div>
  );
}
