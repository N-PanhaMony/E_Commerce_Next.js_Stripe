import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Checkout payload received:", body); // Check payload
    const { totalItems } = body;

    if (!totalItems || !totalItems.length) {
      return new Response(
        JSON.stringify({ error: "No items to checkout" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const origin =
      process.env.NEXT_PUBLIC_BASE_URL || request.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: totalItems,
      success_url: `${origin}/success`,
      cancel_url: `${origin}/`,
    });

    console.log("Stripe session created:", session);

    return new Response(JSON.stringify(session), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating Stripe checkout:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create checkout" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
