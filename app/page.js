import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";

// Server-side fetch of products via API route
async function getProducts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
  const products = await response.json();
  return products;
}

export default async function Home() {
  const products = await getProducts();

  let painting = null;
  let stickers = [];

  // Separate painting from stickers
  for (let prod of products) {
    if (prod.name === 'Angkor Wat') {
      painting = prod;
    } else {
      stickers.push(prod);
    }
  }

  return (
    <div>
      <ImageBanner /> {/* Banner at the top */}
      <section>
        <Products painting={painting} stickers={stickers} />
      </section>
    </div>
  );
}
