import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";
import Stripe from "stripe";

// Create Stripe instance using secret key on server (SSR)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

async function getProducts() {
  const products = await stripe.products.list({ active: true });
  const prices = await stripe.prices.list({ active: true });

  return products.data.map((product) => {
    const productPrices = prices.data.filter((price) => price.product === product.id);
    return {
      ...product,
      prices: productPrices.map((price) => ({
        id: price.id,
        unit_amount: price.unit_amount,
        currency: price.currency,
        recurring: price.recurring,
      })),
    };
  });
}

export default async function Home() {
  const products = await getProducts();

  let painting = null;
  let stickers = [];

  for (const prod of products) {
    if (prod.name === "Angkor Wat") {
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
