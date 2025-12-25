'use client'

import { useProducts } from "@/context/ProductContext"

export default function CartPage (){

    const {cart} = useProducts()

    return(
        <section className="cart-section">
            <h2>Your Cart</h2>
            <div className="cart-container">
                {Object.keys(cart).map((item, itemIndex) =>{

                    const itemData = cart[item]
                    const itemQuantity = itemData?.quantity
                    const imgName = itemData.name === 'Angkor Wat'?'AngkorWat': 
                    itemData.name.replaceAll(' ', '_').replaceAll('.jpeg', '')
                    const imgURL = 'low_res/' + imgName + '.jpeg'
                    return (
                        <div key={itemIndex} className="cart-item">
                            <img src={imgURL} alt={imgName+'--img'}/>
                            <div className="cart-item-info">
                                <h3>{itemData.name}</h3>
                                <p>{itemData.description?.slice(0, 100) || ''}{itemData.description?.length > 100 && '...'}</p>
                                <h4>${itemData.prices[0].unit_amount /100}</h4> 
                                <div className="quantity-container">
                                    <p><strong>Quantity</strong></p>
                                    <input value={itemQuantity} onChange={()=>{}}/>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="checkout-container">
                <button>Continue</button>
                <button>Checkout</button>
            </div>
        </section>

    )
}