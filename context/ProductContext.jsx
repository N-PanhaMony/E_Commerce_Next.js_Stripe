'use client'

import { createContext, useContext, useState } from "react"

const ProductContext = createContext()

export default function ProductsProvider(props){

    const {children} = props

    const [ cart , setCart ] = useState({})

    function handleChangeProduct(price_id , num){
        const newCart = {
            ...cart
        }
        if (price_id in cart){
            newCart[price_id]= newCart[price_id] + num
        }else {
            newCart[price_id] = num
        }

        if (newCart[price_id] === 0){
            delete newCart[price_id]
        }

        setCart(newCart)
    }


    const value = {
        cart,
        handleChangeProduct
    }

    return(
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProducts = () => useContext(ProductContext)
