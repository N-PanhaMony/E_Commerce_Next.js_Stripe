import Stripe from "stripe";
import '../../../envConfig' // Load environment variables

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16'
})


export async function POST(request) {
    try {
        const {totalItems} = await request.json() // get cart items from frontend
        console.log(totalItems);

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: totalItems,
            success_url: process.env.NEXT_PUBLIC_BASE_URL + '/success', // redirect on success
            cancel_url: process.env.NEXT_PUBLIC_BASE_URL + '/' // redirect on cancel
        })

        return Response.json(session) // send session info back
    } catch (error) {
        console.log('Error creating cart checkout', error.message)
        return Response.json({ error: 'Failed to create stripe checkout' })
    }
}
