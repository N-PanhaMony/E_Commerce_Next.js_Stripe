import Stripe from "stripe";
import '../../../envConfig'

const API_KEY = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(API_KEY)

export async function GET() {
    try {
        // fetch data all the active product from stripe
        const products = await stripe.products.list({active:true})

        // fetch all the prices that are active
        const prices = await stripe.prices.list({active :true})

        //conbine the products and their prices
        const combinedData = products.data.map((product) =>{
            const productPrices = prices.data.filter((price)=>{
                return price.product === product.id
            })
            return {
                ...products ,
                prices : productPrices.map((price) =>{
                    return {
                        id : price.id,
                        unit_amount : price.unit_amount,
                        currency : price.currency,
                        recurring : price.recurring
                    }
                })
            }
        })

        //send the cobined data as json
        return Response.json(combinedData)
    } catch (err) {
        console.log('Error fetching data from stripe',err.message)
        return Response.json({error: 'failed to fetch data from stripe'})
    }
}