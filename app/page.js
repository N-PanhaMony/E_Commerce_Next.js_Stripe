import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";
import Stripe from "stripe";

// ⚠️ This runs only on the server (SSR)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

async function getProducts() {
  const productsList = await stripe.products.list({ active: true });
  const pricesList = await stripe.prices.list({ active: true });

  return productsList.data.map((product) => {
    const productPrices = pricesList.data.filter((price) => price.product === product.id);
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
  const stickers = [];

  for (const product of products) {
    if (product.name === "Angkor Wat") {
      painting = product;
    } else {
      stickers.push(product);
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
