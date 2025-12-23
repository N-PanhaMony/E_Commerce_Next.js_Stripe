'use client'

import { useState } from "react"
import Portal from "./Portal"

export default function Products(props) {

  const { painting, stickers } = props
  const [portalImage, setPortalImage] = useState(null)

  if (!stickers.length || !painting) return null

  return (
    <>
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

      {/* Paintings Section (Static Frontend) */}
      <div className="section-container">
        <div className="section-header">
          <h2>Shop Our Paintings</h2>
          <p>Khmer temple inspired artworks</p>
        </div>

        <div className="painting-content">
          <div>
            <button onClick={() => setPortalImage('AngkorWat')} className="img-button">
              <img src="low_res/AngkorWat.jpeg" alt="Angkor Wat painting"/>
            </button>
          </div>

          <div className="painting-info">
            <p className="text-large painting-header">Angkor Wat</p>
            <h3><span>$</span>29.99</h3>
            <p>Angkor Wat reflected in calm waters</p>
            <ul>
              <li>Size: A3</li>
              <li>Material: Canvas Print</li>
            </ul>
          </div>

          <div className="purchase-btns">
            <button>Add to Cart</button>
          </div>
        </div>
      </div>

      {/* Stickers Section (From Stripe) */}
      <div className="sticker-container">
            {stickers.map((sticker, sIndex) => {
                const stickerKey = sticker.name.replaceAll(' ', '_');

                return (
                <div key={sIndex} className="s-card">
                    <button
                    onClick={() => setPortalImage(stickerKey)}
                    className="img-button"
                    >
                    <img
                        src={`/low_res/${stickerKey}.jpeg`}
                        alt={`${stickerKey}-low-res`}
                    />
                    </button>

                    <div className="s-info">
                    <p className="text-medium">{sticker.name}</p>
                    <p>{sticker.description}</p>
                    <h4>
                        <span>$</span>
                        {sticker.prices?.[0]?.unit_amount
                        ? (sticker.prices[0].unit_amount / 100).toFixed(2)
                        : '—'}
                    </h4>
                    <button>Add to Cart</button>
                    </div>
                </div>
                )
            })}
            </div>
    </>
  )
}
