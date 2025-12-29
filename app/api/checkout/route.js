import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16'
});

export async function POST(request) {
  try {
    const { totalItems } = await request.json();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: totalItems,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`
    });

    return Response.json(session);
  } catch (error) {
    console.log('Error creating Stripe checkout:', error.message);
    return Response.json({ error: 'Failed to create checkout' });
  }
}
