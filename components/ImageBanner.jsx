'use client'

import { useEffect, useRef, useState } from "react"

export default function ImageBanner() {

    const [isLoaded, setIsLoaded] = useState(false)
    const imgRef = useRef()

    useEffect(() => {
        if (imgRef.current?.complete) {
            setIsLoaded(true)
        }
    }, [])

    // Scroll to section helper
    const scrollToSection = (id) => {
        const section = document.getElementById(id)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <div className="banner-img">
            {/* Low-res / High-res banner images */}
            <img className="low-res-img" src="low_res/KhmerEmpire.jpeg" alt="banner-low-res" />
            <img
                ref={imgRef}
                className="high-res-img"
                src="high_res/KhmerEmpire.png"
                alt="banner-high-res"
                style={{ opacity: isLoaded ? 1 : 0 }}
                onLoad={() => setIsLoaded(true)}
            />

            {/* CTA buttons */}
            <div className="cta-btns-container">
                <div>
                    <div>
                        <h3>Discover</h3>
                        <h1>Khmer Temple Art</h1>
                    </div>
                    <div className="cta-buttons">
                        <button onClick={() => scrollToSection('painting-section')}>Shop Paintings</button>
                        <button onClick={() => scrollToSection('sticker-section')}>Shop Stickers</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
