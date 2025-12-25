'use client'

import { useProducts } from "@/context/ProductContext"
import Link from "next/link"

export default function Cart(){
    const {cart} = useProducts()
    const numProducts = Object.keys(cart).reduce((output , curr , index) =>{
        const numProd = cart[curr]
        const sum = output + numProd
        return sum
    },0)

    console.log('Number of total products',numProducts);

    return(
        <div>
            <Link className="unstyle-button" href={'/cart'}> 
                <i className="fa-solid fa-cart-flatbed-suitcase"></i>
                <div className="cart-num">
                    <p>{numProducts}</p>
                </div>
            </Link>
        </div>
    )
}