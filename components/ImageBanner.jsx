'use client'

import { useEffect, useRef, useState } from "react"

export default function ImageBanner(){

    const [isLoaded , setIsLoaded] = useState(false)
    const imgRef = useRef()
    
    useEffect(()=>{
        if(imgRef.current.complete){
            setIsLoaded(true)
        }
    },[])

    return(
        <div className="banner-img">
            <img className="low-res-img" src="low_res/banner.jpeg" alt="banner-low-res" />
            <img ref={imgRef} className="high-res-img" src="high_res/banner.png" alt="banner-high-res" style={ {opacity: isLoaded ? 1 : 0}} onLoad={() =>{
                // the callback function executed when the high-res completed loaded
                setIsLoaded(true)
            }}/>
            <div className="cta-btns-container">
                <div>
                    <div>
                        <h3>Welcome to</h3>
                        <h1>the EStore</h1>
                    </div>
                    <div>
                        <button>Shop........</button>
                        <button>Shop........</button>
                    </div>
                </div>
            </div>
        </div>
    )
}