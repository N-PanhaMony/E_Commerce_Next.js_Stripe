'use client'

import { createContext, useContext, useState } from "react"

const ProductContext = createContext() // create shared global storage

export default function ProductsProvider(props){

    const {children} = props

    const [ cart , setCart ] = useState({}) // store cart items

    function handleChangeProduct(price_id , num , data , noIncrement = false){
        const newCart = {
            ...cart
        }
        if (price_id in cart){
            // update existing product quantity
            newCart[price_id]= {
                ...data,
                quantity : noIncrement? num : newCart[price_id]?.quantity + num
            }
        } else {
            // add new product
             newCart[price_id]= {
                ...data,
                quantity : num
            }
        }

        if (parseFloat(newCart[price_id].quantity) <= 0){
            delete newCart[price_id] // remove if quantity <= 0
        }

        setCart(newCart) // update state
    }

    const value = {
        cart, // global cart object
        handleChangeProduct // function to modify cart
    }

    return(
        <ProductContext.Provider value={value}>
            {children} {/* make cart accessible to all children */}
        </ProductContext.Provider>
    )
}

export const useProducts = () => useContext(ProductContext) // custom hook to access context
