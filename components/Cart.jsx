'use client'

import { useProducts } from "@/context/ProductContext"
import Link from "next/link"

export default function Cart(){
    const {cart} = useProducts()
    const numProducts = Object.keys(cart).reduce((output , curr , index) =>{
        const numProd = cart[curr].quantity
        const sum = output + parseInt(numProd)
        return sum
    },0)

    return(
        <div>
            <Link className="unstyle-button" href={'/cart'}> 
                <i className="fa-solid fa-cart-flatbed-suitcase"></i>
                {numProducts >0 && (<div className="cart-num">
                    <p>{numProducts}</p>
                </div>)}
            </Link>
        </div>
    )
}