'use client'

import { useProducts } from "@/context/ProductContext"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CartPage() {

    const router = useRouter()
    const { cart, handleChangeProduct } = useProducts() // get global cart and update function

    async function createCheckout() {
        try {
            const baseURL = process.env.NEXT_PUBLIC_BASE_URL
            // Map cart items to Stripe line_items format
            const totalItems = Object.keys(cart).map((item) => ({
                price: item,
                quantity: cart[item].quantity
            }))

            const response = await fetch(baseURL + '/api/checkout', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ totalItems }) // send cart to backend
            })

            const data = await response.json()
            if (response.ok) {
                router.push(data.url) // redirect to Stripe checkout
            }

        } catch (error) {
            console.log('Error creating checkout', error.message)
        }
    }

    // If cart is empty, show a message
    if (Object.keys(cart).length === 0) {
        return (
            <section className="cart-section">
                <h2>Your Cart is Empty 🛒</h2>
                <p>Add some paintings or stickers to your cart first!</p>
            </section>
        )
    }

    return (
        <section className="cart-section">
            <h2>Your Cart</h2>
            <div className="cart-container">
                {Object.keys(cart).map((item, itemIndex) => {

                    const itemData = cart[item]
                    const itemQuantity = itemData?.quantity
                    const imgName = itemData.name === 'Angkor Wat' ? 'AngkorWat' :
                        itemData.name.replaceAll(' ', '_').replaceAll('.jpeg', '')
                    const imgURL = 'low_res/' + imgName + '.jpeg' // path to low-res image

                    return (
                        <div key={itemIndex} className="cart-item">
                            <img src={imgURL} alt={imgName + '--img'} />
                            <div className="cart-item-info">
                                <h3>{itemData.name}</h3>
                                <p>{itemData.description?.slice(0, 100) || ''}{itemData.description?.length > 100 && '...'}</p>
                                <h4>${itemData.prices[0].unit_amount / 100}</h4> 
                                <div className="quantity-container">
                                    <p><strong>Quantity</strong></p>
                                    <input
                                        type='number'
                                        value={itemQuantity}
                                        min={0}
                                        onChange={(e) => {
                                            const newQty = parseInt(e.target.value)
                                            handleChangeProduct(item, newQty, itemData, true) // directly set quantity
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="checkout-container">
                <Link href={'/'}>
                    <button>Continue</button> {/* back to shop */}
                </Link>
                <button onClick={createCheckout}>Checkout</button> {/* trigger Stripe */}
            </div>
        </section>
    )
}
