'use client'

import { useState } from "react"
import Portal from "./Portal"
import { useProducts } from "@/context/ProductContext"

export default function Products(props) {

    const { painting, stickers } = props

    const [portalImage, setPortalImage] = useState(null) // For showing high-res image in portal


    const {handleChangeProduct,cart} = useProducts()
    console.log(cart);
    // Do not render if stickers or painting are missing
    if (!stickers.length || !painting) return null

    return (
        <>
            {/* Portal for high-res image */}
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

            {/* Paintings Section (STATIC) */}
            <div className="section-container">
                <div className="section-header">
                    <h2>Shop Our Paintings</h2>
                    <p>Khmer temple inspired artworks</p>
                </div>

                <div className="painting-content">
                    <div>
                        {/* Open portal on click */}
                        <button onClick={() => setPortalImage('AngkorWat')} className="img-button">
                            <img src="low_res/AngkorWat.jpeg" alt="Angkor Wat painting"/>
                        </button>
                    </div>
                    <div className="painting-info">
                        <p className="text-large painting-header">Angkor Wat</p>
                        <h3><span>$</span>19.99</h3>

                        {/* Detailed description */}
                        <p>
                            Experience the majestic beauty of Angkor Wat with this high-quality canvas print. 
                            Capturing the temple’s serene reflection on calm waters, this artwork combines historical grandeur 
                            with modern printing excellence, making it a perfect centerpiece for your living space, office, 
                            or study. Ideal for art enthusiasts, history lovers, or anyone seeking a touch of Khmer culture in their home.
                        </p>

                        {/* Additional info */}
                        <ul>
                            <li><strong>Size:</strong> A3 (29.7 x 42 cm)</li>
                            <li><strong>Material:</strong> Premium Canvas with fade-resistant ink</li>
                            <li><strong>Frame:</strong> Optional wooden frame available</li>
                            <li><strong>Finish:</strong> Matte coating for elegant look and glare reduction</li>
                            <li><strong>Packaging:</strong> Rolled in protective tube to ensure safe delivery</li>
                            <li><strong>Artist Notes:</strong> Inspired by traditional Khmer architecture and the timeless beauty of Angkor Wat at sunrise.</li>
                        </ul>

                        {/* Optional purchase buttons or CTA */}
                        <div className="purchase-btns">
                            <button onClick={()=>{
                                const paintingPriceId = painting.default_price
                                handleChangeProduct(paintingPriceId,1)
                            }}>Add to Cart</button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Stickers Section (DYNAMIC) */}
            <div className="section-container">
                <div className="section-header">
                    <h2>Collect Your Favorite Stickers</h2>
                    <p>Khmer temple themed designs</p>
                </div>
                <div className="sticker-container">
                    {stickers.map((sticker, index) => {
                        const stickerName = sticker.name
                        const stickerImgUrl = sticker.name.replaceAll(' ', '_').replaceAll('.jpeg', '')

                        return (
                            <div key={index} className="s-card">
                                {/* Click to open high-res */}
                                <button onClick={() => setPortalImage(stickerImgUrl)} className="img-button">
                                    <img src={`low_res/${stickerImgUrl}.jpeg`} alt={`${stickerImgUrl}-low-res`} />
                                </button>
                                <div className="s-info">
                                    <p className="text-medium">{stickerName}</p>
                                    <p>{sticker.description}</p>
                                    {/* Convert price from cents to dollars */}
                                    <h4><span>$</span>{sticker.prices[0].unit_amount / 100}</h4>
                                    <button onClick={()=>{
                                        const stickersPriceId = stickers.default_price
                                        handleChangeProduct(stickersPriceId,1)
                                    }}>Add to Cart</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
