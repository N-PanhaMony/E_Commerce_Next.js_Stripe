'use client'

import { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CartPage() {
  const router = useRouter();
  const { cart, handleChangeProduct } = useProducts();
  const [loading, setLoading] = useState(false);

  const total = Object.keys(cart).reduce((acc, key) => {
    const item = cart[key];
    const priceAmount = item.default_price
      ? item.prices.find(p => p.id === item.default_price)?.unit_amount || 0
      : item.prices[0].unit_amount;
    return acc + priceAmount * item.quantity;
  }, 0);

  async function createCheckout() {
    if (!Object.keys(cart).length) return alert("Cart is empty.");

    try {
      setLoading(true);
      const baseURL = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;

      const lineItems = Object.keys(cart).map(key => {
        const item = cart[key];
        const priceId = item.default_price || item.prices[0].id;
        return { price: priceId, quantity: item.quantity };
      });

      console.log("[Checkout] Request body:", { totalItems: lineItems });

      const res = await fetch(`${baseURL}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalItems: lineItems }),
      });

      const data = await res.json();
      console.log("[Checkout] Stripe session:", data);

      if (!res.ok || !data.url) {
        console.error("[Checkout] Failed:", data);
        alert("Checkout failed. See console for details.");
        return;
      }

      console.log("[Checkout Debug] Redirect URL:", data.url);

      // Redirect to Stripe checkout
      window.location.href = data.url;

    } catch (err) {
      console.error("[Checkout] Error:", err);
      alert("Checkout failed. See console for details.");
    } finally {
      setLoading(false);
    }
  }

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
