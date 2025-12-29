import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16'
});

export async function GET() {
  try {
    // Fetch all active products and prices from Stripe
    const products = await stripe.products.list({ active: true });
    const prices = await stripe.prices.list({ active: true });

    // Combine products with prices
    const combinedData = products.data.map((product) => {
      const productPrices = prices.data.filter(price => price.product === product.id);
      return {
        ...product,
        prices: productPrices.map(price => ({
          id: price.id,
          unit_amount: price.unit_amount,
          currency: price.currency,
          recurring: price.recurring
        }))
      };
    });

    return Response.json(combinedData);
  } catch (err) {
    console.error('Error fetching Stripe products:', err.message);
    return Response.json({ error: 'Failed to fetch products' });
  }
}
