'use client'

import { useState } from "react"
import Portal from "./Portal"

export default function Products(){

    const [portalImage , setPortalImage] = useState(null)


    const Description = {
        docker: "A beautiful Angkor Wat temple sticker to decorate your belongings.",
        Firebase: "Sticker featuring Bayon's iconic smiling faces.",
        Ta_Prohm_Sticker: "Ta Prohm temple sticker with its famous tree-covered ruins.",
        Banteay_Srei_Sticker: "Intricate carvings of Banteay Srei in sticker form.",
        Preah_Koan_Sticker: "Classic Khmer temple architecture sticker for collectors.",
    }

    const ArrDes = Object.keys(Description)
    return(
        <>
            {portalImage && (
                <Portal handleClonePortal ={()=>{ setPortalImage(null)}} >
                    <div className="portal-content">
                        <img className="img-display" src={`high_res/${portalImage}.jpeg`} alt={`${portalImage}-high-res`}/>
                    </div>
                </Portal>
            )}

            {/* Paintings Section */}
            <div className="section-container">
                <div className="section-header">
                    <h2>Shop Our Paintings</h2>
                    <p>Khmer temple inspired artworks</p>
                </div>

                <div className="planner-content">
                    <div>
                        <button  onClick={() =>{
                            setPortalImage('AngkorWat')
                        }} className="img-button">
                            <img src="low_res/AngkorWat.jpeg" alt="Angkor Wat painting"/>
                        </button>
                    </div>
                    <div className="planner-info">
                        <p className="text-large planner-header">Angkor Wat</p>
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

            {/* Stickers Section */}
            <div className="section-container">
                <div className="section-header">
                    <h2>Collect Your Favorite Stickers</h2>
                    <p>Khmer temple themed designs</p>
                </div>
                <div className="sticker-container">
                    {ArrDes.map((s,sIndex) => {
                        return(
                            <div key={sIndex} className="s-card">
                                <button onClick={() =>{
                                    setPortalImage(s)
                                }} className="img-button">
                                    <img src={`low_res/${s}.jpeg`} alt={`${s}-low-res`}/>
                                </button>
                                <div className="s-info">
                                    <p className="text-medium">{s.replaceAll('_',' ')} <sticker className="png"></sticker> </p>
                                    <p>{Description[s]}</p>
                                    <h4><span>$</span>4.99</h4>
                                    <button>Add to Cart</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}
