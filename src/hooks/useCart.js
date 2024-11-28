import { useState, useEffect, useMemo } from 'react'

import { db } from '../data/db'



const useCart = () => {
    const initialCart = ()  => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
      }
      const [data] = useState(db)
      const [cart, setCart] = useState(initialCart)
    
    
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
      },[cart])
    
      const addToCart = (item) => {
        
        const itemExist = cart.findIndex(guitar => guitar.id === item.id)
        if (itemExist >= 0){
          const updateCart = [...cart]
          updateCart[itemExist].quantity++
          setCart(updateCart)
        } else {
          item.quantity = 1 
          setCart([...cart, item])
        }
      }
    
      const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
      }
    
      const increaseQuantity= (id) => {
        const updateCart = cart.map(item =>{
          if(item.id === id && item.quantity < 5){
            return {
              ...item, 
              quantity: item.quantity +1
            }
          }
          return item
        })
        setCart(updateCart)
      }
    
      const decreaseQuantity = (id)=>{
        const updateCart = cart.map( item => {
          if(item.id === id && item.quantity > 1){
            return{
              ...item,
              quantity: item.quantity -1
            }
          }
          return item
        })
        setCart(updateCart)
      }
    
      const clearCart = () => {
        setCart([])
      }

      //state derivado
      const isEmpty = useMemo( ()=> cart.length === 0,[cart] ) 
      const cartTotal = useMemo(  () => cart.reduce((total, item) => total +(item.quantity * item.price), 0), [cart] ) 

    return {cart, data, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal}
}

export default useCart