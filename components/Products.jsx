'use client'

import { useState } from "react";
import Portal from "./Portal";
import { useProducts } from "@/context/ProductContext";

export default function Products({ painting, stickers }) {
  const [portalImage, setPortalImage] = useState(null);
  const { handleChangeProduct } = useProducts();

  if (!painting || !stickers?.length) return null;

  return (
    <>
      {/* High-res image portal */}
      {portalImage && (
        <Portal handleClonePortal={() => setPortalImage(null)}>
          <div className="portal-content">
            <img
              className="img-display"
              src={`high_res/${portalImage}.jpeg`}
              alt={`${portalImage}-high-res`}
            />
          </div>
        </Portal>
      )}

      {/* Painting section */}
      <div id="painting-section" className="section-container">
        <div className="section-header">
          <h2>Shop Our Paintings</h2>
          <p>Khmer temple inspired artworks</p>
        </div>
        <div className="painting-content">
          <div>
            <button
              onClick={() => setPortalImage("AngkorWat")}
              className="img-button"
            >
              <img src="low_res/AngkorWat.jpeg" alt="Angkor Wat painting" />
            </button>
          </div>
          <div className="painting-info">
            <p className="text-large painting-header">Angkor Wat</p>
            <h3>$19.99</h3>
            <p>
              Experience the majestic beauty of Angkor Wat with this high-quality canvas print...
            </p>
            <ul>
              <li><strong>Size:</strong> A3 (29.7 x 42 cm)</li>
              <li><strong>Material:</strong> Premium Canvas</li>
              <li><strong>Frame:</strong> Optional wooden frame</li>
            </ul>
            <div className="purchase-btns">
              <button
                onClick={() => handleChangeProduct(painting.default_price, 1, painting)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stickers section */}
      <div id="sticker-section" className="section-container">
        <div className="section-header">
          <h2>Collect Your Favorite Stickers</h2>
          <p>Khmer temple themed designs</p>
        </div>
        <div className="sticker-container">
          {stickers.map((sticker, index) => {
            const stickerImg = sticker.name.replaceAll(" ", "_").replaceAll(".jpeg", "");
            return (
              <div key={index} className="s-card">
                <button onClick={() => setPortalImage(stickerImg)} className="img-button">
                  <img src={`low_res/${stickerImg}.jpeg`} alt={`${stickerImg}-low-res`} />
                </button>
                <div className="s-info">
                  <p className="text-medium">{sticker.name}</p>
                  <p>{sticker.description}</p>
                  <h4>${sticker.prices[0].unit_amount / 100}</h4>
                  <button
                    onClick={() => handleChangeProduct(sticker.prices[0].id, 1, sticker)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
