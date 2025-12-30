'use client';

import { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, handleChangeProduct } = useProducts();
  const [loading, setLoading] = useState(false);

  // Calculate total
  const total = Object.keys(cart).reduce((acc, key) => {
    const item = cart[key];
    const priceAmount = item.default_price
      ? item.prices.find(p => p.id === item.default_price)?.unit_amount || 0
      : item.prices[0].unit_amount;
    return acc + priceAmount * item.quantity;
  }, 0);

  // Checkout function
  async function createCheckout() {
    if (!Object.keys(cart).length) return alert("Cart is empty.");

    try {
      setLoading(true);

      // Build line_items for Stripe
      const lineItems = Object.keys(cart).map(key => {
        const item = cart[key];
        const priceId = item.default_price || item.prices[0].id;
        return { price: priceId, quantity: item.quantity };
      });

      console.log("[Checkout] Line items:", lineItems);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalItems: lineItems }),
      });

      const data = await res.json();
      console.log("[Checkout] Response:", data);

      if (!res.ok || !data.url) {
        console.error("[Checkout] Failed:", data);
        alert("Checkout failed. See console logs.");
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      console.error("[Checkout] Error:", err);
      alert("Checkout failed. See console logs.");
    } finally {
      setLoading(false);
    }
  }

  // Render empty cart
  if (!Object.keys(cart).length) {
    return (
      <section className="cart-section">
        <h2>Your Cart is Empty 🛒</h2>
        <p>Add paintings or stickers first!</p>
        <Link href="/"><button>&larr; Go Shopping</button></Link>
      </section>
    );
  }

  return (
    <section className="cart-section">
      <h2>Your Cart</h2>

      <div className="cart-container">
        {Object.keys(cart).map((key, idx) => {
          const item = cart[key];
          const isPainting = !!item.default_price;

          const imgName =
            item.name === "Angkor Wat"
              ? "AngkorWat"
              : item.name.replaceAll(" ", "_").replaceAll(".jpeg", "");
          const imgURL = `/low_res/${imgName}.jpeg`;

          const priceAmount = isPainting
            ? item.prices.find(p => p.id === item.default_price)?.unit_amount || 0
            : item.prices[0].unit_amount;

          return (
            <div key={idx} className="cart-item">
              <img
                src={imgURL}
                alt={imgName}
                onError={e => (e.currentTarget.src = "/low_res/default.jpeg")}
              />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>{item.description?.slice(0, 100)}{item.description?.length > 100 && "..."}</p>
                <h4>${(priceAmount / 100).toFixed(2)}</h4>
                <div className="quantity-container">
                  <p><strong>Quantity</strong></p>
                  <input
                    type="number"
                    min={0}
                    value={item.quantity}
                    onChange={e =>
                      handleChangeProduct(
                        isPainting ? item.default_price : item.prices[0].id,
                        parseInt(e.target.value),
                        item,
                        true
                      )
                    }
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="checkout-container">
        <Link href="/"><button>&larr; Continue Shopping</button></Link>
        <button onClick={createCheckout} disabled={loading}>
          {loading ? "Redirecting..." : `Checkout → ($${(total / 100).toFixed(2)})`}
        </button>
      </div>
    </section>
  );
}
