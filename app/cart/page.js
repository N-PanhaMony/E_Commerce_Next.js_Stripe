'use client';

import { useProducts } from "@/context/ProductContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { cart, handleChangeProduct } = useProducts();

  async function createCheckout() {
    try {
      const totalItems = Object.keys(cart).map(item => ({
        price: item,
        quantity: cart[item].quantity
      }));

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalItems })
      });

      const data = await response.json();
      if (response.ok) router.push(data.url);
    } catch (error) {
      console.error('Error creating checkout:', error.message);
    }
  }

  if (Object.keys(cart).length === 0) {
    return (
      <section className="cart-section">
        <h2>Your Cart is Empty 🛒</h2>
        <p>Add some paintings or stickers to your cart first!</p>
      </section>
    );
  }

  return (
    <section className="cart-section">
      <h2>Your Cart</h2>
      <div className="cart-container">
        {Object.keys(cart).map((item, index) => {
          const itemData = cart[item];
          const imgName = itemData.name === 'Angkor Wat'
            ? 'AngkorWat'
            : itemData.name.replaceAll(' ', '_').replaceAll('.jpeg', '');
          const imgURL = `/low_res/${imgName}.jpeg`;

          return (
            <div key={index} className="cart-item">
              <img src={imgURL} alt={`${imgName}--img`} />
              <div className="cart-item-info">
                <h3>{itemData.name}</h3>
                <p>{itemData.description?.slice(0, 100) || ''}{itemData.description?.length > 100 && '...'}</p>
                <h4>${itemData.prices[0].unit_amount / 100}</h4>
                <div className="quantity-container">
                  <p><strong>Quantity</strong></p>
                  <input
                    type="number"
                    value={itemData.quantity}
                    min={0}
                    onChange={e => handleChangeProduct(item, parseInt(e.target.value), itemData, true)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="checkout-container">
        <Link href="/"><button>Continue</button></Link>
        <button onClick={createCheckout}>Checkout</button>
      </div>
    </section>
  );
}
