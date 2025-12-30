import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("[Checkout] Request body:", body);

    const { totalItems } = body;
    if (!totalItems || !totalItems.length) {
      return new Response(
        JSON.stringify({ error: "Cart is empty" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: totalItems,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    console.log("[Checkout] Session created:", session.url);

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("[Checkout] Error:", err.message);
    return new Response(
      JSON.stringify({ error: err.message || "Checkout failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
