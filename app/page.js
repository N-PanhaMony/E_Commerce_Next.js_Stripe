import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";

// Function to fetch products from API internally
async function getProducts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: 'no-store' // SSR fetch always fresh
  });
  const products = await response.json();
  return products;
}

export default async function Home() {
  const products = await getProducts();

  let painting = null;
  let stickers = [];

  for (let prod of products) {
    if (prod.name === 'Angkor Wat') {
      painting = prod;
      continue;
    }
    stickers.push(prod);
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