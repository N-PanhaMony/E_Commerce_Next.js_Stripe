import Stripe from "stripe";
import '../../../envConfig' // Load environment variables

const API_KEY = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(API_KEY)

export async function GET() {
    try {
        // 1. Fetch all active products from Stripe
        const products = await stripe.products.list({ active: true })

        // 2. Fetch all active prices from Stripe
        const prices = await stripe.prices.list({ active: true })

        // 3. Combine each product with its corresponding prices
        const combinedData = products.data.map((product) => {
            // Filter prices for this product
            const productPrices = prices.data.filter((price) => price.product === product.id)

            // Return the product object with its prices array
            return {
                ...product,
                prices: productPrices.map((price) => ({
                    id: price.id,
                    unit_amount: price.unit_amount,
                    currency: price.currency,
                    recurring: price.recurring
                }))
            }
        })

        // 4. Return combined data as JSON
        return Response.json(combinedData)

    } catch (err) {
        console.log('Error fetching data from Stripe:', err.message)
        return Response.json({ error: 'Failed to fetch data from Stripe' })
    }
}
